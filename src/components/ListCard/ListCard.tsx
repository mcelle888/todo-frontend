import React, { useState } from 'react';
import { ToDoItem, updateItemInList } from '../../services/todo-services';
import Modal from '../../containers/Modal/Modal';
import ItemForm from '../ItemForm/ItemForm';
import styles from './ListCard.module.scss';

interface ListCardProps {
  list: {
    id: number;
    title: string;
    items: ToDoItem[];
  };
  onDelete: (id: number) => void;
  onOpenItemModal: () => void;
}

const ListCard: React.FC<ListCardProps> = ({ list, onDelete, onOpenItemModal }) => {
  const [selectedItem, setSelectedItem] = useState<ToDoItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    onDelete(list.id);
  };

  const handleEdit = (item: ToDoItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleUpdateItem = async (data: { name: string; description: string; dueDate: string }, closeModal: () => void) => {
    if (selectedItem) {
      try {
        const updatedItem = await updateItemInList(list.id, selectedItem.id, data);
        setSelectedItem(null);
        setIsModalOpen(false);
        list.items = list.items.map(item => item.id === selectedItem.id ? updatedItem : item);
        closeModal();
      } catch (e) {
        console.error("Failed to update item", e);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div key={list.id} className={styles.listCard}>
      <h3>{list.title}</h3>
      <button onClick={handleDelete}>Delete List</button>
      <button onClick={onOpenItemModal}>Add Item</button>
      <ul>
        {list.items.map((item) => (
          <li key={item.id} className={item.done ? styles.done : ''}>
            {item.name}: {item.description} (Due: {new Date(item.dueDate).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })})
            <button onClick={() => handleEdit(item)}>Edit</button>
          </li>
        ))}
      </ul>
      {isModalOpen && selectedItem && (
        <Modal size="small" isOpen={isModalOpen} onClose={closeModal}>
          {(closeModal) => (
            <ItemForm
              mode="Edit"
              defaultValues={selectedItem}
              onSubmit={(data) => {
                handleUpdateItem(data, closeModal);
              }}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default ListCard;
