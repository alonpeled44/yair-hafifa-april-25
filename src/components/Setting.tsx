import RadioOption from "./RadioOption";
import styles from "../styles/components/setting.module.css";

interface Props {
  title: string;
  options: string[];
  groupName: string;
  selected: string;
  onClick: (value: string) => void;
}

export default function Setting({
  title,
  options,
  groupName,
  selected,
  onClick,
}: Props) {
  return (
    <div className={styles["setting-wrapper"]}>
      <h1>{title}:</h1>

      <div className={styles["radio-options"]}>
        {Object.entries(options).map(([key, value], index) => (
          <RadioOption
            key={index}
            text={value}
            value={key}
            groupName={groupName}
            isSelected={selected === key}
            onClick={() => onClick(key)}
          />
        ))}
      </div>
    </div>
  );
}
