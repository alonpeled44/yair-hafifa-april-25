import { useState } from "react";
import { pokemons } from "@/lib/pokemons";
import PokemonCard from "@/components/PokemonCard";
import PokemonInfo from "@/components/PokemonInfo";
import styles from "@/styles/pages/index.module.css";

export default function Home() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  return (
    <div className={styles["pokemon-container-wrapper"]}>
      <div className={styles["pokemon-cards-container"]}>
        <section className={styles["pokemon-cards-header"]}>
          <input
            type="text"
            placeholder="Search card"
            className={styles["search-bar"]}
          ></input>
          <div className={styles["cards-preview-settings"]}>
            <button>filter by</button>
            <button>sort by</button>
          </div>
        </section>
        <section className={styles["pokemon-cards"]}>
          {pokemons.map((pokemon, i) => (
            <div
              onClick={() => setSelectedPokemon(pokemon)}
              style={{ cursor: "pointer" }}
            >
              <PokemonCard
                name={pokemon.name}
                frontViewImageUrl={pokemon.frontViewImageUrl}
                type={pokemon.type}
                weight={pokemon.weight}
                height={pokemon.height}
              />
            </div>
          ))}
        </section>
      </div>

      {selectedPokemon && (
        <dialog className={styles["pokemon-info-dialog"]} open>
          <button onClick={() => setSelectedPokemon(null)}>
            <p>X</p>
          </button>

          <PokemonInfo
            id={selectedPokemon.id}
            name={selectedPokemon.name}
            frontViewImageUrl={selectedPokemon.frontViewImageUrl}
            backViewImageUrl={selectedPokemon.frontViewImageUrl}
            type={selectedPokemon.type}
            weight={selectedPokemon.weight}
            height={selectedPokemon.height}
            frontShinyViewImageUrl={selectedPokemon.frontShinyViewImageUrl}
            backShinyViewImageUrl={selectedPokemon.backShinyViewImageUrl}
          />
        </dialog>
      )}
    </div>
  );
}
