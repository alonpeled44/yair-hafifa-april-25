import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import pokemonLogo from "@/assets/images/pokemon-logo.png";
import styles from "@/styles/components/header.module.css";

export default function Header() {
  const [username, setUsername] = useState("");
  const pathname = usePathname();

  var visibility = false;

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
    visibility = true;
  }, [pathname]);

  useEffect(() => {});

  return (
    <header className={styles.header}>
      <div className={styles["pokemon-info"]}>
        <img src={pokemonLogo.src} alt={"pokemon-logo"} />
        <p>Pok`emon</p>
        {username && (
          <div className={styles["header-items"]}>
            <p>{username}</p>
            <button>Log out</button>
          </div>
        )}
      </div>

      <p>{new Date().toLocaleDateString("he-IL")}</p>
    </header>
  );
}
