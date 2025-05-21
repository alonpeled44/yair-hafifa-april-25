import { useState, useRef, useEffect } from "react";
import { pokemons } from "@/lib/pokemons";
import PokemonCard from "@/components/PokemonCard";
import Modal from "@/components/Modal";
import MultiSelect from "@/components/MultiSelect";
import styles from "@/styles/pages/index.module.css";

export default function Home() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isShiny, setIsShiny] = useState(false);
  const [attributeSort, setAttributeSort] = useState("id");
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleModalClose = () => {
    setModalIsOpen(false);
    setSelectedPokemon(null);
  };

  const types = [
    "Normal",
    "Fire",
    "Water",
    "Grass",
    "Electric",
    "Ice",
    "Fighting",
    "Poison",
    "Ground",
    "Flying",
    "Psychic",
    "Bug",
    "Rock",
    "Ghost",
    "Dark",
    "Dragon",
    "Steel",
    "Fairy",
  ];

  return (
    <div className={styles["pokedex-wrapper"]}>
      <div className={styles["pokemon-cards-container"]}>
        <section className={styles["pokemon-card-organizer"]}>
          <input
            type="text"
            placeholder="Search card"
            className={styles["search-bar"]}
            name="searchText"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <div className={styles["cards-preview-settings"]}>
            <MultiSelect
              options={types}
              checkedOptions={selectedTypes}
              setCheckedOptions={setSelectedTypes}
            />

            <select
              value={attributeSort}
              onChange={(e) => {
                setAttributeSort(e.target.value);
              }}
            >
              <option value="id">id</option>
              <option value="name">name</option>
              <option value="weight">weight</option>
              <option value="height">height</option>
            </select>
          </div>
        </section>

        <section className={styles.cards}>
          {pokemons
            .filter(
              (pokemon) =>
                pokemon.name
                  .toLowerCase()
                  .includes(searchText.trim().toLowerCase()) &&
                (selectedTypes.length < 1 ||
                  pokemon.types.some((e) => selectedTypes.includes(e)))
            )
            .sort((a, b) => {
              if (attributeSort === "name") {
                return a.name.localeCompare(b.name);
              } else {
                return a[attributeSort] - b[attributeSort];
              }
            })
            .map((pokemon, index) => (
              <PokemonCard
                key={index}
                name={pokemon.name}
                img={pokemon.frontViewImageUrl}
                type={pokemon.type}
                weight={pokemon.weight}
                height={pokemon.height}
                onClick={() => {
                  setSelectedPokemon(pokemon);
                  setModalIsOpen(true);
                }}
              />
            ))}
        </section>
      </div>

      {modalIsOpen && (
        <Modal isOpen={modalIsOpen} handleClose={handleModalClose}>
          <div className={styles["modal-content-wrapper"]}>
            <div className={styles["modal-header"]}>
              <p id={styles["pokemon-name"]}>{selectedPokemon.name}</p>

              <label htmlFor="shiny">
                <input
                  id="shiny"
                  type="checkbox"
                  onClick={() => setIsShiny((prev) => !prev)}
                ></input>
                shiny
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
                  alt="pokemon image"
                />
                <img
                  src={
                    isShiny
                      ? selectedPokemon.backShinyViewImageUrl
                      : selectedPokemon.backViewImageUrl
                  }
                  alt="pokemon's back image"
                />
              </section>

              <section className={styles["pokemon-data"]}>
                <p>type: {selectedPokemon.type}</p>
                <p>weight: {selectedPokemon.weight}</p>
                <p>height: {selectedPokemon.height}</p>
              </section>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
