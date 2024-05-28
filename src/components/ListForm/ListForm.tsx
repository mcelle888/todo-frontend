import React, { useState } from 'react';

interface ListFormProps {
  onSubmit: (title: string) => void;
  closeModal: () => void;
}

const ListForm: React.FC<ListFormProps> = ({ onSubmit, closeModal }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title);
    setTitle('');  
    closeModal();  
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default ListForm;
