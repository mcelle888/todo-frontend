import React, { useState } from 'react';
import styles from './ListForm.module.scss'

interface ListFormProps {
  onSubmit: (title: string) => void;
  closeModal: () => void;
  defaultTitle?: string;
}

const ListForm: React.FC<ListFormProps> = ({ onSubmit, closeModal, defaultTitle = '' }) => {
  const [title, setTitle] = useState(defaultTitle);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title);
    setTitle(''); 
    closeModal(); 
  };

  return (
    <form className={styles.listForm} onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <button className={styles.createListButton} type="submit">Create List</button>
    </form>
  );
};

export default ListForm;
