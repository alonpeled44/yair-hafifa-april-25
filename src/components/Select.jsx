import { useEffect, useRef, useState } from "react";
import styles from "@/styles/components/select.module.css";

export default function Select({
  multiple,
  options = [],
  checkedOptions,
  setCheckedOptions,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleCheckboxChange = (option) => {
    setCheckedOptions((prevCheckedOptions) =>
      prevCheckedOptions.includes(option)
        ? prevCheckedOptions.filter((type) => type !== option)
        : [...prevCheckedOptions, option]
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
                  onClick={(e) => {
                    setCheckedOptions(e.target.value);
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
