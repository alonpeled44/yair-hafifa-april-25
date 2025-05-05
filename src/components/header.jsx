import { useUserName } from "@/contexts/UserNameProvider";
import ContentSplit from "@/components/contentSplit";
import pokemonLogo from "@/assets/images/pokemon-logo.png";
import styles from "@/styles/components/header.module.css";

export default function Header() {
  const username = useUserName();

  return (
    <header className={styles.header}>
      <div className={styles["pokemon-info"]}>
        <img src={pokemonLogo.src} alt={"pokemon-logo"} />
        <p>Pok`emon</p>
        {username && (
          <>
            <ContentSplit />
            <div className={styles["header-items"]}>
              <p>{username}</p>
              <button>Log out</button>
            </div>
          </>
        )}
      </div>

      <p>{new Date().toLocaleDateString("he-IL")}</p>
    </header>
  );
}
