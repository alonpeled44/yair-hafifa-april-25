import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useWindowWidth } from "@/contexts/WindowWidthProvider";
import VerticalDivider from "./VerticalDivider";
import Modal from "./Modal";
import Setting from "./Setting";
import Link from "next/link";
import pokemonLogo from "@/assets/images/pokemon-logo.png";
import settingsIcon from "@/assets/images/settings.png";
import styles from "@/styles/components/header.module.css";

const themes = ["light", "dark"];
const fontSizes = ["small", "medium", "large"];

const lightmodes = {
  light: "☀️",
  dark: "🌙",
};

const fonts = {
  small: "🗛",
  medium: "🗛",
  large: "🗛",
};

export default function Header({ newUsersDefaultPage }) {
  const [username, setUsername] = useState("");
  const [themeMode, setThemeMode] = useState(themes[0]);
  const [fontSize, setFontSize] = useState(fontSizes[0]);
  const [isFontsOpen, setIsFontsOpen] = useState(false);

  const windowWidth = useWindowWidth();

  const pathname = usePathname();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  function chooseFontSize(newFontSize) {
    setFontSize(newFontSize);
    setIsFontsOpen(false);
  }

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, [pathname]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          <img src={pokemonLogo.src} alt={"pokemon-logo"} />
          <p>Pok`emon</p>
          {username && (
            <>
              <VerticalDivider />
              <div className={styles["left-items"]}>
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

              {windowWidth > 480 && (
                <>
                  <VerticalDivider />
                  <Link href="/">PokeDex</Link>
                </>
              )}
            </>
          )}
        </div>

        <div className={styles.right} style={{ position: "relative" }}>
          <p>{new Date().toLocaleDateString("he-IL")}</p>
          <button onClick={() => setIsModalOpen((prev) => !prev)}>
            <img src={settingsIcon.src} alt="settings Icon" />
          </button>

          {isModalOpen && windowWidth <= 480 && (
            <div className={styles["settings-dropdown"]}>
              <button
                onClick={() =>
                  setThemeMode((prev) => (prev === "light" ? "dark" : "light"))
                }
              >
                {lightmodes[themeMode]}
              </button>
              <button
                onClick={() => {
                  setIsFontsOpen((prev) => !prev);
                }}
                data-font-size={fontSize}
              >
                <span>{fonts[fontSize]}</span>
              </button>

              {isFontsOpen && (
                <div className={styles["font-sizes"]}>
                  {fontSizes
                    .filter((curFontSize) => curFontSize !== fontSize)
                    .map((curFontSize) => {
                      return (
                        <button
                          key={curFontSize}
                          onClick={() => chooseFontSize(curFontSize)}
                          data-font-size={curFontSize}
                        >
                          <span>{fonts[curFontSize]}</span>
                        </button>
                      );
                    })}
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {isModalOpen && windowWidth > 480 && (
        <Modal
          isOpen={isModalOpen}
          handleClose={() => {
            setIsModalOpen(false);
          }}
        >
          <div className={styles["modal-content-wrapper"]}>
            <Setting
              title="Theme"
              groupName={"themes"}
              options={lightmodes}
              selected={themeMode}
              setSelected={setThemeMode}
            />
            <Setting
              title="Fonts"
              groupName={"font-sizes"}
              options={fonts}
              selected={fontSize}
              setSelected={setFontSize}
            />
          </div>
        </Modal>
      )}
    </>
  );
}
