import { useState, useEffect } from "react";
import usePokemon from "@/hooks/usePokemon";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import PokemonCard from "@/components/PokemonCard";
import styles from "@/styles/pages/index.module.css";

export default function Home() {
  const { getPokemons, getTypes } = usePokemon();
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isShiny, setIsShiny] = useState(false);

  const [searchText, setSearchText] = useState("");

  const [attributeSort, setAttributeSort] = useState("id");
  const attributes = ["id", "name", "weight", "height"];

  const [selectedTypes, setSelectedTypes] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    async function init() {
      const pokemons = await getPokemons();
      const types = await getTypes();

      setPokemons(pokemons);
      setTypes(types);
    }

    init();
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
                id={pokemon.id}
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
