import React, { ReactNode } from "react";
import styles from "./Modal.module.scss";

interface ModalProps {
  buttonText?: string;
  children: (close: () => void) => ReactNode;
  size: "small" | "medium" | "large";
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
  buttonText,
  children,
  size,
  isOpen,
  onClose,
}) => {
  const sizes = {
    small: `${styles.smallModal}`,
    medium: `${styles.mediumModal}`,
    large: `${styles.largeModal}`,
  };

  const modalClass = sizes[size];

  return (
    <>
      {buttonText && (
        <button className={styles.modalButton} onClick={onClose}>
          {buttonText}
        </button>
      )}
      {isOpen && (
        <dialog className={modalClass} open>
          <button onClick={onClose} className={styles.closeDialog}>
            X
          </button>
          <div>{children(onClose)}</div>
        </dialog>
      )}
    </>
  );
};

export default Modal;
