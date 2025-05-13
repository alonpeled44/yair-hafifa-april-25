import { useState, useRef, useEffect } from "react";
import PokemonCard from "@/components/PokemonCard";
import PokemonInfo from "@/components/PokemonInfo";
import { pokemons } from "@/lib/pokemons";
import styles from "@/styles/pages/index.module.css";

export default function Home() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

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
    let clickHandler = null;
    if (selectedPokemon) {
      clickHandler = (event) => {
        const dialog = dialogRef.current;
        const contentWrapper = contentWrapperRef.current;
        /*I finally found the issue without the AI the problem is the I tried to check if the dialog is open "dialog.open" instead of
        weather the click is inside the dialog which makes more sense */
        if (
          event.target === dialog &&
          contentWrapper &&
          !contentWrapper.contains(event.target)
        ) {
          setSelectedPokemon(null);
        }
      };

      document.addEventListener("click", clickHandler);
    }
    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, [selectedPokemon]);

  return (
    <div className={styles["pokemon-container-wrapper"]}>
      <div className={styles["pokemon-cards-container"]}>
        <section className={styles["pokemon-cards-header"]}>
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

      {selectedPokemon && (
        <dialog
          ref={dialogRef}
          className={styles["pokemon-info-dialog"]}
          onClick={(e) => {
            if (e.target === dialogRef.current) {
              setSelectedPokemon(null);
            }
          }}
        >
          <div
            ref={contentWrapperRef}
            className={styles["dialog-content-wrapper"]}
          >
            <button
              onClick={() => {
                setSelectedPokemon(null);
              }}
            >
              <p>&times;</p>
            </button>

            <PokemonInfo
              id={selectedPokemon.id}
              name={selectedPokemon.name}
              frontViewImageUrl={selectedPokemon.frontViewImageUrl}
              backViewImageUrl={selectedPokemon.frontViewImageUrl}
              frontShinyViewImageUrl={selectedPokemon.frontShinyViewImageUrl}
              backShinyViewImageUrl={selectedPokemon.backShinyViewImageUrl}
              type={selectedPokemon.type}
              weight={selectedPokemon.weight}
              height={selectedPokemon.height}
            />
          </div>
        </dialog>
      )}
    </div>
  );
}
