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
        <p>{name}</p>
        <div>
          <label>
            <input
              type="checkbox"
              onClick={() => setIsShiny((prev) => !prev)}
            ></input>
            shiny
          </label>
          <p>#{id}</p>
        </div>
      </div>

      <div className={styles["pokemon-info-main"]}>
        <div className={styles["pokemon-img-container"]}>
          <img
            src={!isShiny ? frontViewImageUrl : frontShinyViewImageUrl}
            alt="pokemon image"
          ></img>
          <img
            src={!isShiny ? backViewImageUrl : backShinyViewImageUrl}
            alt="pokemon's back image"
          ></img>
        </div>

        <div className="pokemon-data">
          <p>type: {type}</p>
          <p>weight: {weight}</p>
          <p>height: {height}</p>
        </div>
      </div>
    </div>
  );
}
