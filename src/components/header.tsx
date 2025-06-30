import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useWindowWidth } from "../contexts/WindowWidthProvider";
import { Themes, FontSize } from "../lib/enums";
import VerticalDivider from "./VerticalDivider";
import Modal from "./Modal";
import Setting from "./Setting";
import Link from "next/link";
import pokemonLogo from "@/assets/images/pokemon-logo.png";
import settingsIcon from "@/assets/images/settings.png";
import settingsIconDark from "@/assets/images/settingsDark.png";
import styles from "@/styles/components/header.module.css";

interface HeaderProps {
  newUsersDefaultPage: string;
  theme: Themes;
  setTheme: (theme: Themes) => void;
  font: FontSize;
  setFont: (font: FontSize) => void;
}

const lightmodes: Record<Themes, string> = {
  light: "☀️",
  dark: "🌙",
};

const fonts: Record<FontSize, string> = {
  small: "🗛",
  medium: "🗛",
  large: "🗛",
};

const fontSizes: FontSize[] = Object.values(FontSize);

export default function Header({
  newUsersDefaultPage,
  theme,
  setTheme,
  font,
  setFont,
}: HeaderProps) {
  const [username, setUsername] = useState<string | null>("");
  const [isFontExtensionOpen, setIsFontExtensionOpen] = useState(false);

  const windowWidth = useWindowWidth();
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  function handleFontSizeSelection(newFontSize: FontSize) {
    setFont(newFontSize);
    setIsFontExtensionOpen(false);
  }

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
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
                  setTheme(theme === Themes.LIGHT ? Themes.DARK : Themes.LIGHT)
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
                  {fontSizes.map((curFontSize) =>
                    curFontSize !== font ? (
                      <button
                        key={curFontSize}
                        onClick={() => handleFontSizeSelection(curFontSize)}
                        data-font-size={curFontSize}
                      >
                        <span>{fonts[curFontSize]}</span>
                      </button>
                    ) : null
                  )}
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
              groupName="themes"
              options={lightmodes}
              selected={theme}
              onClick={(selectedTheme) => setTheme(selectedTheme as Themes)}
            />
            <Setting
              title="Fonts"
              groupName="font-sizes"
              options={fonts}
              selected={font}
              onClick={(selectedFont) => setFont(selectedFont as FontSize)}
            />
          </div>
        </Modal>
      )}
    </>
  );
}
