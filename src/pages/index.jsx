import { useState, useEffect, useMemo } from "react";
import fetchPokemons, { fetchTypes } from "@/pages/api/pokemonApi";
import Modal from "@/components/Modal";
import MultiSelect from "@/components/MultiSelect";
import PokemonCard from "@/components/PokemonCard";
import styles from "@/styles/pages/index.module.css";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isShiny, setIsShiny] = useState(false);
  const [attributeSort, setAttributeSort] = useState("id");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const getTypes = async () => {
      try {
        const fetchedTypes = await fetchTypes();
        setTypes(fetchedTypes);
      } catch (error) {
        console.error("Error getting pokemon types:", error);
      }
    };

    getTypes();
  }, []);

  useEffect(() => {
    const loadPokemons = async () => {
      try {
        const fetchedPokemons = await fetchPokemons(150);
        setPokemons(fetchedPokemons);
      } catch (error) {
        console.error("Error loading Pokemon:", error);
      }
    };

    loadPokemons();
  }, []);

  const handleModalClose = () => {
    setModalIsOpen(false);
    setSelectedPokemon(null);
    setIsShiny(false);
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
                ((searchText.includes("#") &&
                  pokemon.id.toString() ===
                    searchText.trim().replace("#", "")) ||
                  pokemon.name
                    .toLowerCase()
                    .includes(searchText.trim().toLowerCase()) ||
                  pokemon.weight.toString().includes(searchText) ||
                  pokemon.height.toString().includes(searchText)) &&
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
                types={pokemon.types}
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
                <p>type: {selectedPokemon.types.join(", ")}</p>
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
