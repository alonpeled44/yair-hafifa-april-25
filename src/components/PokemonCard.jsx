import styles from "@/styles/components/pokemonCard.module.css";

export default function PokemonCard({
  name,
  frontViewImageUrl,
  type,
  weight,
  height,
}) {
  return (
    <div className={styles["pokemon-card"]}>
      <p>name: {name}</p>
      <img src={frontViewImageUrl}></img>
      <p>type: {type}</p>
      <p>weight: {weight}</p>
      <p>height: {height}</p>
    </div>
  );
}
