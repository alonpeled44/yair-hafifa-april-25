import styles from "@/styles/components/pokemonCard.module.css";
import { useWindowWidth } from "@/contexts/WindowWidthProvider";

export default function PokemonCard({
  id,
  name,
  img,
  types,
  weight,
  height,
  onClick,
}) {
  const windowWidth = useWindowWidth();

  return (
    <div className={styles["pokemon-card"]} onClick={onClick}>
      <div className={styles["card-content"]}>
        <h1>
          {name} #{id}
        </h1>
        <img alt="pokemon image" src={img} />

        {windowWidth >= 480 && (
          <div className={styles.attributes}>
            <p>type: {types.join(", ")}</p>
            <p>weight: {weight}</p>
            <p>height: {height}</p>
          </div>
        )}
      </div>
    </div>
  );
}
