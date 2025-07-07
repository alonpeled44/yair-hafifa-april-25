import { useState, useEffect } from "react";
import { Theme } from "../lib/enums";
import usedigimon from "../hooks/useDigimon";
import Modal from "../components/Modal";
import Select from "../components/Select";
import DigimonCard from "../components/DigimonCard";
import { digimon } from "../lib/types";
import backgroundImage from "../assets/images/charmander.jpg";
import darkBackgroundImage from "../assets/images/charmanderDark.jpg";
import infoCard from "../assets/images/infoCard.png";
import infoCardDark from "../assets/images/infoCardDark.png";
import styles from "../styles/pages/index.module.css";
const attributes = ["id", "name"] as string[];

interface Props {
  theme: Theme;
}

type digimonKey = keyof digimon;

export default function Home({ theme }: Props) {
  const { getdigimons, getTypes } = usedigimon();

  const [digimons, setdigimons] = useState<digimon[]>([]);
  const [selecteddigimon, setSelecteddigimon] = useState<digimon | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShiny, setIsShiny] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [attributeSort, setAttributeSort] = useState<digimonKey>("id");

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);

  useEffect(() => {
    async function init() {
      const digimons = await getdigimons();
      const types = await getTypes();

      setdigimons(digimons || []);
      setTypes(types || []);
    }
    init();
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelecteddigimon(null);
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
        <div className={styles.loading}>Loading Digimons...</div>
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
            .sort((a: digimon, b: digimon) => {
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
                  setSelecteddigimon(digimon);
                  setIsModalOpen(true);
                }}
              />
            ))}
        </section>
      </div>

      {isModalOpen && selecteddigimon && (
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
              <p id={styles["digimon-name"]}>{selecteddigimon.name}</p>

              <label htmlFor="shiny">
                <input
                  id="shiny"
                  type="checkbox"
                  onClick={() => setIsShiny((prev) => !prev)}
                />
                variant
              </label>

              <p>#{selecteddigimon.id}</p>
            </div>

            <div className={styles["modal-main"]}>
              <section className={styles.images}>
                <img
                  src={
                    isShiny
                      ? selecteddigimon.frontShinyViewImageUrl
                      : selecteddigimon.frontViewImageUrl
                  }
                  alt={`${selecteddigimon.name} front`}
                />
                <img
                  src={
                    isShiny
                      ? selecteddigimon.backShinyViewImageUrl
                      : selecteddigimon.backViewImageUrl
                  }
                  alt={`${selecteddigimon.name} back`}
                />
              </section>

              <section className={styles["digimon-data"]}>
                <p>type: {selecteddigimon.types.join(", ")}</p>
              </section>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
