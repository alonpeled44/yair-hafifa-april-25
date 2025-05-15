import { useState, useRef, useEffect } from "react";
import { pokemons } from "@/lib/pokemons";
import PokemonCard from "@/components/PokemonCard";
import PokemonInfo from "@/components/PokemonInfo";
import Modal from "@/components/Modal";
import styles from "@/styles/pages/index.module.css";

export default function Home() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [modalIsOpen, modalSetIsOpen] = useState(false);
  const [isShiny, setIsShiny] = useState(false);

  const dialogRef = useRef(null);
  const contentWrapperRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (selectedPokemon && dialog) {
      dialog.showModal();
    } else if (dialog && dialog.open) {
      dialog.close();
    }
  }, [selectedPokemon]);

  useEffect(() => {
    modalSetIsOpen(selectedPokemon !== null);
    console.log(selectedPokemon);
  }, [selectedPokemon]);

  return (
    <div className={styles["pokedex-wrapper"]}>
      <div className={styles["pokemon-cards-container"]}>
        <section className={styles["filter-and-sort-cards"]}>
          <input
            type="text"
            placeholder="Search card"
            className={styles["search-bar"]}
          />

          <div className={styles["cards-preview-settings"]}>
            <select>
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>

            <select>
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
          </div>
        </section>

        <section className={styles["pokemon-cards"]}>
          {pokemons.map((pokemon, index) => (
            <PokemonCard
              key={index}
              name={pokemon.name}
              img={pokemon.frontViewImageUrl}
              type={pokemon.type}
              weight={pokemon.weight}
              height={pokemon.height}
              onClick={() => {
                setSelectedPokemon(pokemon);
              }}
            />
          ))}
        </section>
      </div>

      {modalIsOpen && (
        <Modal isOpen={modalIsOpen} setIsOpen={modalSetIsOpen}>
          <div className={styles["modal-content-wrapper"]}>
            <div className={styles["modal-header"]}>
              <p id={styles["pokemon-name"]}>{selectedPokemon.name}</p>
              <label>
                <input
                  type="checkbox"
                  onClick={() => setIsShiny((prev) => !prev)}
                ></input>
                shiny
              </label>
              <p>#{selectedPokemon.id}</p>
            </div>

            <div className={styles["modal-main"]}>
              <div className={styles["images"]}>
                <img
                  src={
                    !isShiny
                      ? selectedPokemon.frontViewImageUrl
                      : selectedPokemon.frontShinyViewImageUrl
                  }
                  alt="pokemon image"
                />
                <img
                  src={
                    !isShiny
                      ? selectedPokemon.frontViewImageUrl
                      : selectedPokemon.backShinyViewImageUrl
                  }
                  alt="pokemon's back image"
                />
              </div>

              <div className={styles["pokemon-data"]}>
                <p>type: {selectedPokemon.type}</p>
                <p>weight: {selectedPokemon.weight}</p>
                <p>height: {selectedPokemon.height}</p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
