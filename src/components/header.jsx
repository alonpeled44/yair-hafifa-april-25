import styles from "@/styles/components/header.module.css";
import pokemonLogo from "@/assets/images/pokemon-logo.png";

export default function Header() {
  const date = new Date().toLocaleDateString("he-IL");

  return (
    <header className={styles.header}>
      <div className={styles["pokemon-info"]}>
        <img src={pokemonLogo.src} alt={"pokemon-logo"} />
        <p>Pok`emon</p>
      </div>
      <p>{date}</p>
    </header>
  );
}
