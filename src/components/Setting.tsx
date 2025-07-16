import RadioOption from "./RadioOption";
import styles from "../styles/components/setting.module.css";

interface Props {
  title: string;
  options: { value: string; icon: string }[];
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
        {options.map(({ value, icon }) => (
          <RadioOption
            key={value}
            text={icon}
            value={value}
            groupName={groupName}
            isSelected={selected === value}
            onClick={() => onClick(value)}
          />
        ))}
      </div>
    </div>
  );
}
