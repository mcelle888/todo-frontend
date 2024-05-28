import React from 'react';
import { ToDoItem } from '../../services/todo-services';

interface ListCardProps {
  list: {
    id: number;
    title: string;
    items: ToDoItem[];
  };
}

const ListCard: React.FC<ListCardProps> = ({ list }) => {
  return (
    <div key={list.id}>
      <h3>{list.title}</h3>
      <div>
        {list.items.map((item) => (
          <li key={item.id}>
            {item.name}: {item.description} (Due: {item.dueDate})
          </li>
        ))}
      </div>
    </div>
  );
};

export default ListCard;