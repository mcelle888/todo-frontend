import React, { useState } from 'react';
import styles from './Modal.module.scss';

interface ModalProps {
  buttonText: string;
  children: (close: () => void) => React.ReactNode;
  size: 'small' | 'medium' | 'large';
}

const Modal: React.FC<ModalProps> = ({ buttonText, children, size }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const sizes = {
    small: `${styles.smallModal}`,
    medium: `${styles.mediumModal}`,
    large: `${styles.largeModal}`,
  };

  const modalClass = sizes[size];

  return (
    <>
      <button className={styles.modalButton} onClick={toggleModal}>
        {buttonText}
      </button>
      {isOpen && (
        <dialog className={modalClass} open>
          <button onClick={toggleModal} className={styles.closeDialog}>
            X
          </button>
          <div>{children(toggleModal)}</div>
        </dialog>
      )}
    </>
  );
};

export default Modal;
