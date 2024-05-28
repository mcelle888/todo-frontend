import React from 'react';
import { ToDoItem } from '../../services/todo-services';
import styles from './ListCard.module.scss';

interface ListCardProps {
  list: {
    id: number;
    title: string;
    items: ToDoItem[];
  };
  onDelete: (id: number) => void;  
}

const ListCard: React.FC<ListCardProps> = ({ list, onDelete }) => {
  const handleDelete = () => {
    onDelete(list.id);
  };

  return (
    <div key={list.id} className={styles.listCard}>
      <h3>{list.title}</h3>
      <button onClick={handleDelete}>Delete List</button>
      <ul>
        {list.items.map((item) => (
          <li key={item.id} className={`${item.done ? styles.done : ''}`}>
            {item.name}: {item.description} (Due: {item.dueDate})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListCard;
