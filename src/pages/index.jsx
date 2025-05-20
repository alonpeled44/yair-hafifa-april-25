import { useState, useRef, useEffect } from "react";
import { pokemons } from "@/lib/pokemons";
import PokemonCard from "@/components/PokemonCard";
import Modal from "@/components/Modal";
import styles from "@/styles/pages/index.module.css";

export default function Home() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isShiny, setIsShiny] = useState(false);
  const [attributeSort, setAttributeSort] = useState("id");
  const [typefilter, setTypeFilter] = useState("All");

  const handleModalClose = () => {
    setModalIsOpen(false);
    setSelectedPokemon(null);
  };

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
            <select
              value={typefilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
              }}
            >
              <option value="All">All</option>
              <option value="Normal">Normal</option>
              <option value="Fire">Fire</option>
              <option value="Water">Water</option>
              <option value="Grass">Grass</option>
              <option value="Flying">Flying</option>
              <option value="Fighting">Fighting</option>
              <option value="Poison">Poison</option>
              <option value="Electric">Electric</option>
              <option value="Ground">Ground</option>
              <option value="Rock">Rock</option>
              <option value="Psychic">Psychic</option>
              <option value="Ice">Ice</option>
              <option value="Bug">Bug</option>
              <option value="Ghost">Ghost</option>
              <option value="Steel">Steel</option>
              <option value="Dragon">Dragon</option>
              <option value="Dark">Dark</option>
              <option value="Fairy">Fairy</option>
            </select>

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
                (typefilter === "All" || pokemon.types.includes(typefilter))
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
