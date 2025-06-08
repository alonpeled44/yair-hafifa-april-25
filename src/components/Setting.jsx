import RadioOption from "./RadioOption";
import styles from "@/styles/components/setting.module.css";

export default function Setting({
  title,
  options,
  groupName,
  selected,
  setSelected,
}) {
  return (
    <div className={styles["selector-wrapper"]}>
      <h1>{title}:</h1>

      <div className={styles["radio-options"]}>
        {Object.entries(options).map(([key, value], index) => (
          <RadioOption
            key={index}
            text={value}
            value={key}
            groupName={groupName}
            isSelected={selected === key}
            onClick={() => {
              setSelected(key);
            }}
          />
        ))}
      </div>
    </div>
  );
}
