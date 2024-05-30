import React, { useEffect, useState } from 'react';
import { getAllLists, createNewList, deleteList, addItemToList, updateItemInList, deleteItemFromList, updateListTitle, ToDoItem, ToDoList } from '../../services/todo-services';
import ListCard from '../../components/ListCard/ListCard';
import Modal from '../../containers/Modal/Modal';
import ListForm from '../../components/ListForm/ListForm';
import ItemForm from '../../components/ItemForm/ItemForm';
import style from './LandingPage.module.scss';

const LandingPage: React.FC = () => {
  const [lists, setLists] = useState<ToDoList[]>([]);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isTitleModalOpen, setIsTitleModalOpen] = useState(false);
  const [selectedListId, setSelectedListId] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<ToDoItem | null>(null);

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

  const handleUpdateItem = async (data: { name: string; description: string; dueDate: string }, closeModal: () => void) => {
    if (selectedListId && selectedItem) {
      try {
        const updatedItem = await updateItemInList(selectedListId, selectedItem.id, data);
        setLists(lists.map(list => list.id === selectedListId ? { ...list, items: list.items.map(item => item.id === selectedItem.id ? updatedItem : item) } : list));
        closeModal();
      } catch (e) {
        console.error("Failed to update item", e);
      }
    } else if (selectedListId) {
      await handleAddItem(selectedListId, data, closeModal);
    }
  };

  const handleDeleteItem = async (itemId: number) => {
    if (selectedListId) {
      try {
        await deleteItemFromList(selectedListId, itemId);
        setLists(lists.map(list => list.id === selectedListId ? { ...list, items: list.items.filter(item => item.id !== itemId) } : list));
      } catch (e) {
        console.error("Failed to delete item", e);
      }
    }
  };

  const handleUpdateTitle = async (title: string, closeModal: () => void) => {
    if (selectedListId) {
      try {
        const updatedList = await updateListTitle(selectedListId, title);
        setLists(lists.map(list => list.id === selectedListId ? { ...list, title: updatedList.title } : list));
        closeModal();
      } catch (e) {
        console.error("Failed to update list title", e);
      }
    }
  };

  const handleToggleDone = async (item: ToDoItem) => {
    if (selectedListId) {
      const updatedItem = { ...item, done: !item.done };
      try {
        await updateItemInList(selectedListId, item.id, updatedItem);
        setLists(lists.map(list => list.id === selectedListId ? { ...list, items: list.items.map(i => i.id === item.id ? updatedItem : i) } : list));
      } catch (e) {
        console.error("Failed to update item status", e);
      }
    }
  };

  const openItemModal = (listId: number, item: ToDoItem | null) => {
    setSelectedListId(listId);
    setSelectedItem(item);
    setIsItemModalOpen(true);
  };

  const openTitleModal = (listId: number) => {
    setSelectedListId(listId);
    setIsTitleModalOpen(true);
  };

  return (
    <div>
      <header>
        <h2>To-Do List &#x1f5d2;</h2>
      </header>
      <div className={style.addListBox}>
        <button onClick={() => setIsListModalOpen(true)}>Create New List +</button>
      </div>
      {/* Opens modal to add new list */}
      <Modal isOpen={isListModalOpen} size="medium" onClose={() => setIsListModalOpen(false)}>
        {(closeModal) => (
          <ListForm onSubmit={(title: string) => handleSubmitList(title, closeModal)} closeModal={closeModal} />
        )}
      </Modal>
      {/* Opens modal to edit item on list */}
      <Modal isOpen={isItemModalOpen} size="small" onClose={() => setIsItemModalOpen(false)}>
        {(closeModal) => (
          <ItemForm
            mode="Edit"
            defaultValues={selectedItem || { name: '', description: '', dueDate: '' }}
            onSubmit={(data) => handleUpdateItem(data, closeModal)}
          />
        )}
      </Modal>
      {/* opens modal to update title of list */}
      <Modal isOpen={isTitleModalOpen} size="medium" onClose={() => setIsTitleModalOpen(false)}>
        {(closeModal) => (
          <ListForm
            defaultTitle={lists.find(list => list.id === selectedListId)?.title || ''}
            onSubmit={(title: string) => handleUpdateTitle(title, closeModal)}
            closeModal={closeModal}
          />
        )}
      </Modal>
      <div className={style.listContainer}>
        {lists.map((list) => (
          <ListCard
            key={list.id}
            list={list}
            onDelete={handleDelete}
            onOpenItemModal={(item) => openItemModal(list.id, item)}
            onOpenTitleModal={() => openTitleModal(list.id)}
            onToggleDone={handleToggleDone}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
