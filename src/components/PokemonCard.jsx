import styles from "@/styles/components/pokemonCard.module.css";

export default function PokemonCard({
  name,
  img,
  type,
  weight,
  height,
  onClick,
}) {
  return (
    <div className={styles["pokemon-card"]} onClick={onClick}>
      <div className={styles["card-header"]}>
        <h1>name: {name}</h1>
      </div>
      <div className={styles["card-main"]}>
        <img alt="pokemon image" src={img} />

        <div className={styles.attributes}>
          <p>type: {type}</p>
          <p>weight: {weight}</p>
          <p>height: {height}</p>
        </div>
      </div>
    </div>
  );
}
