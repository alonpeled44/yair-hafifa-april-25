import styles from "@/styles/components/pokemonCard.module.css";

export default function PokemonCard({ name, img, type, weight, height }) {
  return (
    <div className={styles["pokemon-card"]}>
      <p>{name}</p>
      <img>{img}</img>
      <p>{type}</p>
      <p>{weight}</p>
      <p>{height}</p>
    </div>
  );
}
