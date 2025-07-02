import { useState, useEffect } from "react";
import { Themes } from "../lib/enums";
import usePokemon from "../hooks/usePokemon";
import Modal from "../components/Modal";
import Select from "../components/Select";
import PokemonCard from "../components/PokemonCard";
import backgroundImage from "../assets/images/charmander.jpg";
import darkBackgroundImage from "../assets/images/charmanderDark.jpg";
import infoCard from "../assets/images/infoCard.png";
import infoCardDark from "../assets/images/infoCardDark.png";
import styles from "../styles/pages/index.module.css";
import { Pokemon } from "../lib/types";

// Updated attributes without weight and height
const attributes = ["id", "name"];

interface HomeProps {
  theme: Themes;
}

export default function Home({ theme }: HomeProps) {
  const { getPokemons, getTypes } = usePokemon();

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isShiny, setIsShiny] = useState<boolean>(false);

  const [searchText, setSearchText] = useState<string>("");

  const [attributeSort, setAttributeSort] = useState<string>("id");

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);

  useEffect(() => {
    async function init() {
      console.log("Starting to fetch data...");

      const pokemons = await getPokemons();
      const types = await getTypes();

      console.log("Raw pokemons data:", pokemons);
      console.log("Raw types data:", types);
      console.log("Pokemons type:", typeof pokemons);
      console.log("Is pokemons array?", Array.isArray(pokemons));

      setPokemons(pokemons || []);
      setTypes(types || []);
    }

    init();
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
    setIsShiny(false);
  };

  if (!pokemons || pokemons.length === 0) {
    return (
      <div
        className={styles["pokedex-wrapper"]}
        style={{
          backgroundImage: `url(${
            theme === "dark" ? darkBackgroundImage.src : backgroundImage.src
          })`,
        }}
      >
        <div style={{ padding: "20px", color: "white", textAlign: "center" }}>
          Loading Digimons...
        </div>
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
      <div className={styles["pokemon-cards-container"]}>
        <section className={styles["pokemon-card-organizer"]}>
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
          {pokemons
            .filter(
              (pokemon) =>
                ((searchText.includes("#") &&
                  pokemon.id.toString() ===
                    searchText.trim().replace("#", "")) ||
                  pokemon.name
                    .toLowerCase()
                    .includes(searchText.trim().toLowerCase())) &&
                (selectedTypes.length < 1 ||
                  pokemon.types.some((e) => selectedTypes.includes(e)))
            )
            .sort((a, b) => {
              if (attributeSort === "name") {
                return a.name.localeCompare(b.name);
              } else {
                return (
                  (a[attributeSort as keyof Pokemon] as number) -
                  (b[attributeSort as keyof Pokemon] as number)
                );
              }
            })
            .map((pokemon, index) => (
              <PokemonCard
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                img={pokemon.frontViewImageUrl}
                types={pokemon.types}
                theme={theme}
                onClick={() => {
                  setSelectedPokemon(pokemon);
                  setIsModalOpen(true);
                }}
              />
            ))}
        </section>
      </div>

      {isModalOpen && selectedPokemon && (
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
              <p id={styles["pokemon-name"]}>{selectedPokemon.name}</p>

              <label htmlFor="shiny">
                <input
                  id="shiny"
                  type="checkbox"
                  onChange={() => setIsShiny((prev) => !prev)}
                />
                variant
              </label>

              <p>#{selectedPokemon.id}</p>
            </div>

            <div className={styles["modal-main"]}>
              <section className={styles.images}>
                <img
                  src={
                    isShiny
                      ? selectedPokemon.frontShinyViewImageUrl
                      : selectedPokemon.frontViewImageUrl
                  }
                  alt={`${selectedPokemon.name} front`}
                />
                <img
                  src={
                    isShiny
                      ? selectedPokemon.backShinyViewImageUrl
                      : selectedPokemon.backViewImageUrl
                  }
                  alt={`${selectedPokemon.name} back`}
                />
              </section>

              <section className={styles["pokemon-data"]}>
                <p>type: {selectedPokemon.types.join(", ")}</p>
              </section>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
