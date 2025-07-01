import styles from "../styles/components/radio-option.module.css";

export default function RadioOption({
  text,
  value,
  groupName,
  onClick,
  isSelected,
}) {
  return (
    <label className={styles.label}>
      <input
        type="radio"
        value={value}
        name={groupName}
        onChange={onClick}
        checked={isSelected}
      />
      <span>{text}</span>
    </label>
  );
}
