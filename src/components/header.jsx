import pokemonLogo from "@/assets/images/pokemon-logo.png";
import styles from "@/styles/components/header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles["pokemon-info"]}>
        <img src={pokemonLogo.src} alt={"pokemon-logo"} />
        <p>Pok`emon</p>
      </div>

      <p>{new Date().toLocaleDateString("he-IL")}</p>
    </header>
  );
}
