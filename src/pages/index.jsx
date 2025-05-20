import { useState, useRef, useEffect } from "react";
import { pokemons } from "@/lib/pokemons";
import PokemonCard from "@/components/PokemonCard";
import Modal from "@/components/Modal";
import styles from "@/styles/pages/index.module.css";

export default function Home() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isShiny, setIsShiny] = useState(false);

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

        <section className={styles["cards"]}>
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
