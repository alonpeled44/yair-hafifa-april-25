import { useState } from "react";
import styles from "@/styles/components/pokemonInfo.module.css";

export default function PokemonInfo({
  id,
  name,
  frontViewImageUrl,
  backViewImageUrl,
  type,
  weight,
  height,
  frontShinyViewImageUrl,
  backShinyViewImageUrl,
}) {
  const [isShiny, setIsShiny] = useState(false);

  return (
    <dialog className={styles["pokemon-info-dialog"]} open>
      <div className={styles["dialog-header"]}>
        <p>{name}</p>
        <div>
          <label>
            <input type="checkbox" onClick={() => setIsShiny(!isShiny)}></input>
            shiny
          </label>
          <p>#{id}</p>
        </div>
      </div>
      <div className={styles["pokemon-info-main"]}>
        <div className={styles["pokemon-img-container"]}>
          <img
            src={!isShiny ? frontViewImageUrl : frontShinyViewImageUrl}
          ></img>
          <img src={!isShiny ? backViewImageUrl : backShinyViewImageUrl}></img>
        </div>
        <div className="pokemon-data">
          <p>type: {type}</p>
          <p>weight: {weight}</p>
          <p>height: {height}</p>
        </div>
      </div>
    </dialog>
  );
}
