import { useWindowWidth } from "@/contexts/WindowWidthProvider";
import backgroundImage from "@/assets/images/PokemonCardBackground.jpg";
import darkBackgroundImage from "@/assets/images/PokemonCardBackgroundDark.png";
import styles from "@/styles/components/pokemon-card.module.css";

export default function PokemonCard({
  id,
  name,
  img,
  types,
  weight,
  height,
  onClick,
  theme,
}) {
  const windowWidth = useWindowWidth();

  return (
    <div
      className={styles["pokemon-card"]}
      onClick={onClick}
      style={{
        backgroundImage: `url(${
          theme === "dark" ? darkBackgroundImage.src : backgroundImage.src
        })`,
      }}
    >
      <div className={styles["card-content"]}>
        <h1>{`${name} #${id}`}</h1>
        <img alt="pokemon image" src={img} />

        {windowWidth > 480 && (
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
