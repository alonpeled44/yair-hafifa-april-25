import styles from "../styles/components/radio-option.module.css";

interface Props {
  text: string;
  value: string;
  groupName: string;
  onClick: () => void;
  isSelected: boolean;
}

export default function RadioOption({
  text,
  value,
  groupName,
  onClick,
  isSelected,
}: Props) {
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
