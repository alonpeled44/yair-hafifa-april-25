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
      <p>name: {name}</p>
      <img src={img} />
      <div className="attributes">
        <p>type: {type}</p>
        <p>weight: {weight}</p>
        <p>height: {height}</p>
      </div>
    </div>
  );
}
