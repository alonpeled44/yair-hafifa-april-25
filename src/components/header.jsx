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
import settingsIconDark from "@/assets/images/settingsDark.png";
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

export default function Header({
  newUsersDefaultPage,
  theme,
  setTheme,
  font,
  setFont,
}) {
  const [username, setUsername] = useState("");
  const [isFontExtensionOpen, setIsFontExtensionOpen] = useState(false);

  const windowWidth = useWindowWidth();

  const pathname = usePathname();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  function handleFontSizeSelection(newFontSize) {
    setFont(newFontSize);
    setIsFontExtensionOpen(false);
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

        <div className={styles.right}>
          <p>{new Date().toLocaleDateString("he-IL")}</p>
          <button onClick={() => setIsModalOpen((prev) => !prev)}>
            <img
              src={theme === "dark" ? settingsIconDark.src : settingsIcon.src}
              alt="settings Icon"
            />
          </button>

          {isModalOpen && windowWidth <= 480 && (
            <div className={styles["settings-dropdown"]}>
              <button
                onClick={() =>
                  setTheme((prev) => (prev === "light" ? "dark" : "light"))
                }
              >
                {lightmodes[theme]}
              </button>
              <button
                onClick={() => {
                  setIsFontExtensionOpen((prev) => !prev);
                }}
                data-font-size={font}
              >
                <span>{fonts[font]}</span>
              </button>

              {isFontExtensionOpen && (
                <div className={styles["font-sizes"]}>
                  {fontSizes.reduce((acc, curFontSize) => {
                    if (curFontSize !== font) {
                      acc.push(
                        <button
                          key={curFontSize}
                          onClick={() => handleFontSizeSelection(curFontSize)}
                          data-font-size={curFontSize}
                        >
                          <span>{fonts[curFontSize]}</span>
                        </button>
                      );
                    }
                    return acc;
                  }, [])}
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
              selected={theme}
              onClick={(theme) => setTheme(theme)}
            />
            <Setting
              title="Fonts"
              groupName={"font-sizes"}
              options={fonts}
              selected={font}
              onClick={(font) => setFont(font)}
            />
          </div>
        </Modal>
      )}
    </>
  );
}
