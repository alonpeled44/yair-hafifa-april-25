import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import Link from "next/link";
import { useWindowWidth } from "../contexts/WindowWidthProvider";
import useUser from "../hooks/useUser";
import { Theme, FontSize } from "../lib/enums";
import VerticalDivider from "./VerticalDivider";
import Modal from "./Modal";
import Setting from "./Setting";
import digimonLogo from "../assets/images/digimon-logo.png";
import settingsIcon from "../assets/images/settings.png";
import settingsIconDark from "../assets/images/settingsDark.png";
import styles from "../styles/components/header.module.css";

interface Props {
  newUsersDefaultPage: string;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  font: FontSize;
  setFont: (font: FontSize) => void;
}

const themes: Record<Theme, string> = {
  light: "☀️",
  dark: "🌙",
};

const fonts: Record<FontSize, string> = {
  small: "Aa",
  medium: "Aa",
  large: "Aa",
};

const fontSizes: FontSize[] = Object.values(FontSize);

export default function Header({
  newUsersDefaultPage,
  theme,
  setTheme,
  font,
  setFont,
}: Props) {
  const [username, setUsername] = useState<string | null>("");
  const [isFontExtensionOpen, setIsFontExtensionOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setUser } = useUser();

  const windowWidth = useWindowWidth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, [pathname]);

  function handleFontSizeSelection(newFontSize: FontSize) {
    setFont(newFontSize);
    setUser({ fontSize: newFontSize });
    setIsFontExtensionOpen(false);
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          <img src={digimonLogo.src} alt={"digimon-logo"} />
          <p>Pok`emon</p>
          {username && (
            <>
              <VerticalDivider />
              <div className={styles["left-items"]}>
                <p>{username}</p>
                <button
                  onClick={() => {
                    localStorage.removeItem("username");
                    localStorage.removeItem("password");
                    localStorage.removeItem("theme");
                    localStorage.removeItem("font");
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
                onClick={() => {
                  const newTheme =
                    theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
                  setTheme(newTheme);
                  setUser({ theme: newTheme });
                }}
              >
                {themes[theme]}
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
        <Modal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)}>
          <div className={styles["modal-content-wrapper"]}>
            <Setting
              title="Theme"
              groupName="themes"
              options={Object.entries(themes).map(([value, icon]) => ({
                value,
                icon,
              }))}
              selected={theme}
              onClick={(value: string) => {
                const newTheme = value as Theme;
                setTheme(newTheme);
                setUser({ theme: newTheme });
              }}
            />
            <Setting
              title="Fonts"
              groupName="font-sizes"
              options={Object.entries(fonts).map(([value, icon]) => ({
                value,
                icon,
              }))}
              selected={font}
              onClick={(value: string) => {
                const newFont = value as FontSize;
                setFont(newFont);
                setUser({ fontSize: newFont });
              }}
            />
          </div>
        </Modal>
      )}
    </>
  );
}
