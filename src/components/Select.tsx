import { useEffect, useRef, useState } from "react";
import styles from "../styles/components/select.module.css";

type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

type Props<T extends string | string[]> = {
  multiple: boolean;
  options: string[];
  checkedOptions: T;
  setCheckedOptions: SetStateType<T>;
};

export default function Select<T extends string | string[]>({
  multiple,
  options = [],
  checkedOptions,
  setCheckedOptions,
}: Props<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleCheckboxChange = (option: string) => {
    if (multiple) {
      setCheckedOptions((prevCheckedOptions) => {
        const prev = prevCheckedOptions as string[];
        if (prev.includes(option)) {
          return prev.filter((o) => o !== option) as T;
        } else {
          return [...prev, option] as T;
        }
      });
    } else {
      setCheckedOptions(option as T);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={styles.dropdown}>
      <button
        className={styles.dropbtn}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {multiple ? "types" : checkedOptions}
      </button>

      {isOpen && (
        <div className={styles["dropdown-content"]}>
          {options.map((option, index) => (
            <label key={index}>
              {multiple ? (
                <input
                  type="checkbox"
                  name={option}
                  checked={checkedOptions.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                />
              ) : (
                <input
                  type="button"
                  key={index}
                  value={option}
                  onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                    if (!e.target) return;
                    const target = e.currentTarget.value as T;

                    setCheckedOptions(target);
                  }}
                />
              )}
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
