import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import VerticalDivider from "./VerticalDivider";
import Modal from "./Modal";
import Link from "next/link";
import pokemonLogo from "@/assets/images/pokemon-logo.png";
import settingsIcon from "@/assets/images/settings.png";
import styles from "@/styles/components/header.module.css";

export default function Header({ newUsersDefaultPage }) {
  const [username, setUsername] = useState("");
  const pathname = usePathname();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, [pathname]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.right}>
          <img src={pokemonLogo.src} alt={"pokemon-logo"} />
          <p>Pok`emon</p>
          {username && (
            <>
              <VerticalDivider />
              <div className={styles["right-items"]}>
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

              <VerticalDivider />

              <Link href="/">PokeDex</Link>
            </>
          )}
        </div>

        <div className={styles.left}>
          <p>{new Date().toLocaleDateString("he-IL")}</p>
          <button onClick={() => setIsModalOpen(true)}>
            <img src={settingsIcon.src} alt="settings Icon" />
          </button>
        </div>
      </header>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          handleClose={() => {
            setIsModalOpen(false);
          }}
        >
          <div className={styles["modal-content-wrapper"]}>
            <div className={styles.theme}>
              <p>Theme</p>

              <div className={styles.options}>
                <label>
                  <input type="radio" name="theme" value="light" />
                  <span>🌞</span>
                </label>

                <label>
                  <input type="radio" name="theme" value="dark" />
                  <span>🌙</span>
                </label>
              </div>
            </div>

            <div className={styles["font-size"]}>
              <p>Font</p>

              <div className={styles.options}>
                <label>
                  <input type="radio" name="theme" value="small" />
                  <span>🗛</span>
                </label>

                <label>
                  <input type="radio" name="theme" value="medium" />
                  <span>🗛</span>
                </label>

                <label>
                  <input type="radio" name="theme" value="large" />
                  <span>🗛</span>
                </label>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
