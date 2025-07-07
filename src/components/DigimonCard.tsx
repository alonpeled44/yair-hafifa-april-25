import { useWindowWidth } from "../contexts/WindowWidthProvider";
import { Theme } from "../lib/enums";
import backgroundImage from "../assets/images/digimonCardBackground.jpg";
import darkBackgroundImage from "../assets/images/digimonCardBackgroundDark.png";
import styles from "../styles/components/digimon-card.module.css";

interface Props {
  id: number;
  name: string;
  img: string;
  types: string[];
  onClick: () => void;
  theme: Theme;
}

export default function digimonCard({
  id,
  name,
  img,
  types,
  onClick,
  theme,
}: Props) {
  const windowWidth = useWindowWidth();

  return (
    <div
      className={styles["digimon-card"]}
      onClick={onClick}
      style={{
        backgroundImage: `url(${
          theme === "dark" ? darkBackgroundImage.src : backgroundImage.src
        })`,
      }}
    >
      <div className={styles["card-content"]}>
        <h1>{`${name} #${id}`}</h1>
        <img alt="digimon image" src={img} />

        {windowWidth > 480 && (
          <div className={styles.attributes}>
            <p>type: {types.join(", ")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
