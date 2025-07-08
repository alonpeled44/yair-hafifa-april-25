import { useRef, useEffect, ReactNode } from "react";
import { useWindowWidth } from "../contexts/WindowWidthProvider";
import styles from "../styles/components/modal.module.css";

interface Props {
  children: ReactNode;
  isOpen: boolean;
  handleClose: () => void;
}

export default function Modal({ children, isOpen, handleClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const windowWidth = useWindowWidth();

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (isOpen) {
      dialog.close();

      if (windowWidth > 480) {
        dialog.showModal();
      } else {
        dialog.show();
      }
    } else {
      dialog.close();
      return;
    }

    const exitOnBackgroundClick = (event: MouseEvent) => {
      if (event.target === dialog) handleClose();
    };

    const exitOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    if (isOpen) {
      dialog.addEventListener("click", exitOnBackgroundClick);
      document.addEventListener("keydown", handleClose);
    }

    return () => {
      dialog.removeEventListener("click", exitOnBackgroundClick);
      document.removeEventListener("keydown", exitOnEscape);
    };
  }, [isOpen, windowWidth]);

  return (
    <dialog className={styles.dialog} ref={dialogRef}>
      <div className={styles["modal-container"]}>
        {children}
        <button onClick={handleClose}>&times;</button>
      </div>
    </dialog>
  );
}
