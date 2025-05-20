import { useRef, useEffect } from "react";
import styles from "@/styles/components/modal.module.css";

export default function Modal({ children, isOpen, handleClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;

    const exitOnBackgroundClick = (event) => {
      if (event.target === dialog) handleClose();
    };

    const exitOnEscape = (event) => {
      if (event.key === "Escape") handleClose();
    };

    document.addEventListener("click", exitOnBackgroundClick);
    document.addEventListener("keydown", exitOnEscape);

    return () => {
      document.removeEventListener("click", exitOnBackgroundClick);
      document.removeEventListener("keydown", exitOnEscape);
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <dialog className={styles.dialog} ref={dialogRef}>
          <div className={styles["modal-container"]}>
            {children}

            <button onClick={handleClose}>&times;</button>
          </div>
        </dialog>
      )}
    </>
  );
}
