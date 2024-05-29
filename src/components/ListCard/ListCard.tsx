import React, { useState, useEffect } from 'react';
import { ToDoItem, updateItemInList, deleteItemFromList, updateListTitle } from '../../services/todo-services';
import Modal from '../../containers/Modal/Modal';
import ItemForm from '../ItemForm/ItemForm';
import ListForm from '../ListForm/ListForm';
import styles from './ListCard.module.scss';
import dayjs from 'dayjs';

interface ListCardProps {
  list: {
    id: number;
    title: string;
    items: ToDoItem[];
  };
  onDelete: (id: number) => void;
  onOpenItemModal: () => void;
  onUpdateTitle: (listId: number, title: string, closeModal: () => void) => void;
}

const ListCard: React.FC<ListCardProps> = ({ list, onDelete, onOpenItemModal, onUpdateTitle }) => {
  const [selectedItem, setSelectedItem] = useState<ToDoItem | null>(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isTitleModalOpen, setIsTitleModalOpen] = useState(false);
  const [items, setItems] = useState<ToDoItem[]>(list.items);

  useEffect(() => {
    setItems(list.items);
  }, [list.items]);

  const handleDelete = () => {
    onDelete(list.id);
  };

  const handleEditItem = (item: ToDoItem) => {
    setSelectedItem(item);
    setIsItemModalOpen(true);
  };

  const handleUpdateItem = async (data: { name: string; description: string; dueDate: string }, closeModal: () => void) => {
    if (selectedItem) {
      try {
        const updatedItem = await updateItemInList(list.id, selectedItem.id, data);
        setSelectedItem(null);
        setIsItemModalOpen(false);
        setItems(items.map(item => item.id === selectedItem.id ? updatedItem : item));
        closeModal();
      } catch (e) {
        console.error("Failed to update item", e);
      }
    }
  };

  const handleDeleteItem = async (itemId: number) => {
    try {
      await deleteItemFromList(list.id, itemId);
      setItems(items.filter(item => item.id !== itemId));
    } catch (e) {
      console.error("Failed to delete item", e);
    }
  };

  const handleUpdateTitle = async (title: string, closeModal: () => void) => {
    try {
      const updatedList = await updateListTitle(list.id, title);
      list.title = updatedList.title;
      setIsTitleModalOpen(false);
      closeModal();
    } catch (e) {
      console.error("Failed to update list title", e);
    }
  };

  const handleToggleDone = async (item: ToDoItem) => {
    const updatedItem = { ...item, done: !item.done };
    try {
      await updateItemInList(list.id, item.id, updatedItem);
      setItems(items.map(i => (i.id === item.id ? updatedItem : i)));
    } catch (e) {
      console.error("Failed to update item status", e);
    }
  };

  const closeModal = () => {
    setIsItemModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div key={list.id} className={styles.listCard}>
      <h3>{list.title}</h3>
      <button onClick={handleDelete}>Delete List</button>
      <button onClick={() => setIsTitleModalOpen(true)}>Edit Title</button>
      <button onClick={onOpenItemModal}>Add Item</button>
      <ul>
        {items.map((item) => (
          <li key={item.id} className={item.done ? styles.done : ''}>
            <input
              type="checkbox"
              checked={item.done}
              onChange={() => handleToggleDone(item)}
            />
            {item.name}: {item.description} (Due: {dayjs(item.dueDate).format('dddd, MMMM D, YYYY h:mm A')})
            <button onClick={() => handleEditItem(item)}>Edit</button>
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {isItemModalOpen && selectedItem && (
        <Modal size="small" isOpen={isItemModalOpen} onClose={closeModal}>
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
      {isTitleModalOpen && (
        <Modal size="small" isOpen={isTitleModalOpen} onClose={() => setIsTitleModalOpen(false)}>
          {(closeModal) => (
            <ListForm
              onSubmit={(title) => handleUpdateTitle(title, closeModal)}
              closeModal={closeModal}
              defaultTitle={list.title}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default ListCard;

