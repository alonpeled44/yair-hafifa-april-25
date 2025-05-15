import { useState } from "react";
import styles from "@/styles/components/pokemonInfo.module.css";

export default function PokemonInfo({
  id,
  name,
  frontViewImageUrl,
  backViewImageUrl,
  frontShinyViewImageUrl,
  backShinyViewImageUrl,
  type,
  weight,
  height,
}) {
  const [isShiny, setIsShiny] = useState(false);

  return (
    <div className={styles["pokemon-info"]}>
      <div className={styles["dialog-header"]}>
        <p id={styles["pokemon-name"]}>{name}</p>
        <label>
          <input
            type="checkbox"
            onClick={() => setIsShiny((prev) => !prev)}
          ></input>
          shiny
        </label>
        <p>#{id}</p>
      </div>

      <div className={styles["pokemon-info-main"]}>
        <div className={styles["images"]}>
          <img
            src={!isShiny ? frontViewImageUrl : frontShinyViewImageUrl}
            alt="pokemon image"
          />
          <img
            src={!isShiny ? backViewImageUrl : backShinyViewImageUrl}
            alt="pokemon's back image"
          />
        </div>

        <div className={styles["pokemon-data"]}>
          <p>type: {type}</p>
          <p>weight: {weight}</p>
          <p>height: {height}</p>
        </div>
      </div>
    </div>
  );
}
