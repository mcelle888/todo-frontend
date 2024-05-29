import React, { useEffect, useState } from 'react';
import { getAllLists, createNewList, deleteList, addItemToList, updateListTitle } from '../../services/todo-services';
import ListCard from '../../components/ListCard/ListCard';
import Modal from '../../containers/Modal/Modal';
import ListForm from '../../components/ListForm/ListForm';
import ItemForm from '../../components/ItemForm/ItemForm';
import style from './LandingPage.module.scss';

const LandingPage: React.FC = () => {
  const [lists, setLists] = useState<any[]>([]);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [selectedListId, setSelectedListId] = useState<number | null>(null);

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

  const handleSubmitList = async (title: string, closeModal: () => void) => {
    try {
      const newList = await createNewList(title);
      setLists([...lists, newList]);
      closeModal();
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

  const handleAddItem = async (listId: number, data: { name: string; description: string; dueDate: string }, closeModal: () => void) => {
    try {
      const newItem = await addItemToList(listId, data);
      setLists(lists.map(list => list.id === listId ? { ...list, items: [...list.items, newItem] } : list));
      closeModal();
    } catch (e) {
      console.error("Failed to add item to list", e);
    }
  };

  const handleUpdateTitle = async (listId: number, title: string, closeModal: () => void) => {
    try {
      const updatedList = await updateListTitle(listId, title);
      setLists(lists.map(list => list.id === listId ? { ...list, title: updatedList.title } : list));
      closeModal();
    } catch (e) {
      console.error("Failed to update list title", e);
    }
  };

  const openItemModal = (listId: number) => {
    setSelectedListId(listId);
    setIsItemModalOpen(true);
  };

  return (
    <div>
      <header>
        <h2>To-Do List &#x1f5d2;</h2>
      </header>
      <div className={style.addListBox}>
          <button onClick={() => setIsListModalOpen(true)}>Create New List +</button>
      </div>
     
  
      <Modal isOpen={isListModalOpen} size="medium" onClose={() => setIsListModalOpen(false)}>
        {(closeModal) => (
          <ListForm onSubmit={(title: string) => handleSubmitList(title, closeModal)} closeModal={closeModal} />
        )}
      </Modal>
      <div className={style.listContainer}>
        {lists.map((list) => (
          <div key={list.id}>
            <ListCard list={list} onDelete={handleDelete} onOpenItemModal={() => openItemModal(list.id)} onUpdateTitle={handleUpdateTitle} />
          </div>
        ))}
      </div>
      {selectedListId && (
        <Modal isOpen={isItemModalOpen} size="small" onClose={() => setIsItemModalOpen(false)}>
          {(closeModal) => (
            <ItemForm onSubmit={(data) => handleAddItem(selectedListId, data, closeModal)} />
          )}
        </Modal>
      )}
    </div>
  );
};

export default LandingPage;
