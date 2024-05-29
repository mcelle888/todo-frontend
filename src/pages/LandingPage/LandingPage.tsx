import React, { useEffect, useState } from 'react';
import { getAllLists, createNewList, deleteList, addItemToList } from '../../services/todo-services';
import ListCard from '../../components/ListCard/ListCard';
import Modal from '../../containers/Modal/Modal';
import ListForm from '../../components/ListForm/ListForm';
import ItemForm from '../../components/ItemForm/ItemForm';
import style from './LandingPage.module.scss';

const LandingPage: React.FC = () => {
  const [lists, setLists] = useState<any[]>([]);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const data = await getAllLists();
        setLists(data);
      } catch (e) {
        console.warn(e);
      }
    };

    fetchLists();
  }, []);

  const handleSubmitList = async (title: string) => {
    try {
      const newList = await createNewList(title);
      setLists([...lists, newList]);
    } catch (e) {
      console.error("Failed to create new list", e);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteList(id);
      setLists(lists.filter((list) => list.id !== id));
    } catch (e) {
      console.error("Failed to delete list", e);
    }
  };

  const handleAddItem = async (listId: number, data: { name: string; description: string; dueDate: string }) => {
    try {
      const newItem = await addItemToList(listId, data);
      setLists(lists.map(list => list.id === listId ? { ...list, items: [...list.items, newItem] } : list));
    } catch (e) {
      console.error("Failed to add item to list", e);
    }
  };

  return (
    <div>
      <h2>To-Do Lists</h2>
      <Modal buttonText="Create New List" size="medium">
        {(closeModal) => <ListForm onSubmit={(title: string) => { handleSubmitList(title); closeModal(); }} closeModal={closeModal} />}
      </Modal>
      <div className={style.listContainer}>
        {lists.map((list) => (
          <div key={list.id}>
            <ListCard list={list} onDelete={handleDelete} />
            <Modal buttonText="Add Item" size="small">
              {(closeModal) => <ItemForm onSubmit={(data) => { handleAddItem(list.id, data); closeModal(); }} />}
            </Modal>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
