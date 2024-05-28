import React, { useEffect, useState } from 'react';
import { getAllLists, createNewList, deleteList } from '../../services/todo-services';
import ListCard from '../../components/ListCard/ListCard';
import Modal from '../../containers/Modal/Modal';
import ListForm from '../../components/ListForm/ListForm';
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

  const handleSubmit = async (title: string) => {
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

  return (
    <div>
      <h2>To-Do Lists</h2>
      <Modal buttonText="Create New List" size="medium">
        {(closeModal) => <ListForm onSubmit={handleSubmit} closeModal={closeModal} />}
      </Modal>
      <div className={style.listContainer}>
        {lists.map((list) => (
          <ListCard key={list.id} list={list} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
