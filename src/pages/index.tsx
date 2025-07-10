import { useState, useEffect } from "react";
import { Theme } from "../lib/enums";
import { Digimon } from "../lib/types";
import useDigimon from "../hooks/useDigimon";
import Modal from "../components/Modal";
import Select from "../components/Select";
import DigimonCard from "../components/DigimonCard";
import backgroundImage from "../assets/images/charmander.jpg";
import darkBackgroundImage from "../assets/images/charmanderDark.jpg";
import infoCard from "../assets/images/infoCard.png";
import infoCardDark from "../assets/images/infoCardDark.png";
import styles from "../styles/pages/index.module.css";

const attributes = ["id", "name"];

interface Props {
  theme: Theme;
}

type DigimonKey = keyof Digimon;

export default function Home({ theme }: Props) {
  const { getDigimons, getTypes } = useDigimon();

  const [digimons, setDigimons] = useState<Digimon[]>([]);
  const [selectedDigimon, setSelectedDigimon] = useState<Digimon | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShiny, setIsShiny] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [attributeSort, setAttributeSort] = useState<DigimonKey>("id");

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);

  useEffect(() => {
    async function init() {
      const digimons = await getDigimons();
      const types = await getTypes();

      setDigimons(digimons || []);
      setTypes(types || []);
    }
    init();
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDigimon(null);
    setIsShiny(false);
  };

  if (!digimons || digimons.length === 0) {
    return (
      <div
        className={styles["pokedex-wrapper"]}
        style={{
          backgroundImage: `url(${
            theme === "dark" ? darkBackgroundImage.src : backgroundImage.src
          })`,
        }}
      >
        <p className={styles.loading}>Loading Digimons...</p>
      </div>
    );
  }

  return (
    <div
      className={styles["pokedex-wrapper"]}
      style={{
        backgroundImage: `url(${
          theme === "dark" ? darkBackgroundImage.src : backgroundImage.src
        })`,
      }}
    >
      <div className={styles["digimon-cards-container"]}>
        <section className={styles["digimon-card-organizer"]}>
          <input
            type="text"
            placeholder="Search digimon"
            className={styles["search-bar"]}
            name="searchText"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <div className={styles["cards-preview-settings"]}>
            <Select
              multiple={true}
              options={types}
              checkedOptions={selectedTypes}
              setCheckedOptions={setSelectedTypes}
            />

            <Select
              multiple={false}
              options={attributes}
              checkedOptions={attributeSort}
              setCheckedOptions={setAttributeSort}
            />
          </div>
        </section>

        <section className={styles.cards}>
          {digimons
            .filter((digimon) => {
              const matchesSearch =
                (searchText.includes("#") &&
                  digimon.id.toString() ===
                    searchText.trim().replace("#", "")) ||
                digimon.name
                  .toLowerCase()
                  .includes(searchText.trim().toLowerCase());

              const matchesTypes =
                selectedTypes.length === 0 ||
                digimon.types.some((t) => selectedTypes.includes(t));

              return matchesSearch && matchesTypes;
            })
            .sort((a: Digimon, b: Digimon) => {
              if (attributeSort === "name") {
                return a.name.localeCompare(b.name);
              } else {
                return (
                  (a[attributeSort] as number) - (b[attributeSort] as number)
                );
              }
            })
            .map((digimon) => (
              <DigimonCard
                key={digimon.id}
                id={digimon.id}
                name={digimon.name}
                img={digimon.frontViewImageUrl}
                types={digimon.types}
                theme={theme}
                onClick={() => {
                  setSelectedDigimon(digimon);
                  setIsModalOpen(true);
                }}
              />
            ))}
        </section>
      </div>

      {isModalOpen && selectedDigimon && (
        <Modal isOpen={isModalOpen} handleClose={handleModalClose}>
          <div
            className={styles["modal-content-wrapper"]}
            style={{
              backgroundImage: `url(${
                theme === "dark" ? infoCardDark.src : infoCard.src
              })`,
            }}
          >
            <div className={styles["modal-header"]}>
              <p id={styles["digimon-name"]}>{selectedDigimon.name}</p>

              <label htmlFor="shiny">
                <input
                  id="shiny"
                  type="checkbox"
                  onClick={() => setIsShiny((prev) => !prev)}
                />
                variant
              </label>

              <p>#{selectedDigimon.id}</p>
            </div>

            <div className={styles["modal-main"]}>
              <section className={styles.images}>
                <img
                  src={
                    isShiny
                      ? selectedDigimon.frontShinyViewImageUrl
                      : selectedDigimon.frontViewImageUrl
                  }
                  alt={`${selectedDigimon.name} front`}
                />
                <img
                  src={
                    isShiny
                      ? selectedDigimon.backShinyViewImageUrl
                      : selectedDigimon.backViewImageUrl
                  }
                  alt={`${selectedDigimon.name} back`}
                />
              </section>

              <section className={styles["digimon-data"]}>
                <p>type: {selectedDigimon.types.join(", ")}</p>
              </section>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
