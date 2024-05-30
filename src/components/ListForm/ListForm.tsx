import React, { useState } from 'react';
import styles from './ListForm.module.scss';

interface ListFormProps {
  onSubmit: (title: string) => void;
  closeModal: () => void;
  defaultTitle?: string;
  mode?: 'Create' | 'Edit';
}

const ListForm: React.FC<ListFormProps> = ({ onSubmit, closeModal, defaultTitle = '', mode = 'Create' }) => {
  const [title, setTitle] = useState(defaultTitle);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title);
    closeModal();
  };

  return (
    <form className={styles.listForm} onSubmit={handleSubmit}>
      <h4>{mode === 'Create' ? 'Create a List' : 'Edit List Title'}</h4>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <button className={styles.createListButton} type="submit">
        {mode === 'Create' ? 'Add List' : 'Edit Title'}
      </button>
    </form>
  );
};

export default ListForm;


