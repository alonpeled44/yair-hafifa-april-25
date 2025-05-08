import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import VerticalDivider from "@/components/VerticalDivider";
import pokemonLogo from "@/assets/images/pokemon-logo.png";
import styles from "@/styles/components/header.module.css";

export default function Header({ newUsersDefaultPage }) {
  const [username, setUsername] = useState("");
  const pathname = usePathname();

  const router = useRouter();

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, [pathname]);

  return (
    <header className={styles.header}>
      <div className={styles["pokemon-info"]}>
        <img src={pokemonLogo.src} alt={"pokemon-logo"} />
        <p>Pok`emon</p>
        {username && (
          <>
            <VerticalDivider />
            <div className={styles["header-items"]}>
              <p>{username}</p>
              <button
                onClick={() => {
                  localStorage.removeItem("username");
                  router.push(newUsersDefaultPage);
                }}
              >
                Log out
              </button>
            </div>
          </>
        )}

        <VerticalDivider />
        <a href="/">PokeDex</a>
      </div>

      <p>{new Date().toLocaleDateString("he-IL")}</p>
    </header>
  );
}
