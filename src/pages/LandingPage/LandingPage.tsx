import React, { useEffect, useState } from "react";
import {
  getAllLists,
  createNewList,
  deleteList,
  addItemToList,
  updateItemInList,
  deleteItemFromList,
  updateListTitle,
  ToDoItem,
  ToDoList,
} from "../../services/todo-services";
import ListCard from "../../components/ListCard/ListCard";
import Modal from "../../containers/Modal/Modal";
import ListForm from "../../components/ListForm/ListForm";
import ItemForm from "../../components/ItemForm/ItemForm";
import style from "./LandingPage.module.scss";

const LandingPage: React.FC = () => {
  const [lists, setLists] = useState<ToDoList[]>([]);
  const [modalState, setModalState] = useState({
    isItemModalOpen: false,
    isTitleModalOpen: false,
    selectedListId: null as number | null,
    selectedItem: null as ToDoItem | null,
  });

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

  const handleAddItem = async (
    listId: number,
    data: { name: string; description: string; dueDate: string },
    closeModal: () => void
  ) => {
    try {
      const newItem = await addItemToList(listId, data);
      setLists(
        lists.map((list) =>
          list.id === listId
            ? { ...list, items: [...list.items, newItem] }
            : list
        )
      );
      closeModal();
    } catch (e) {
      console.error("Failed to add item to list", e);
    }
  };

  const handleUpdateItem = async (
    data: { name: string; description: string; dueDate: string },
    closeModal: () => void
  ) => {
    if (modalState.selectedListId && modalState.selectedItem) {
      try {
        const updatedItem = await updateItemInList(
          modalState.selectedListId,
          modalState.selectedItem.id,
          data
        );
        setLists(
          lists.map((list) =>
            list.id === modalState.selectedListId
              ? {
                  ...list,
                  items: list.items.map((item) =>
                    item.id === modalState.selectedItem!.id ? updatedItem : item
                  ),
                }
              : list
          )
        );
        closeModal();
      } catch (e) {
        console.error("Failed to update item", e);
      }
    } else if (modalState.selectedListId) {
      await handleAddItem(modalState.selectedListId, data, closeModal);
    }
  };

  const handleDeleteItem = async (itemId: number) => {
    if (modalState.selectedListId) {
      try {
        await deleteItemFromList(modalState.selectedListId, itemId);
        setLists(
          lists.map((list) =>
            list.id === modalState.selectedListId
              ? {
                  ...list,
                  items: list.items.filter((item) => item.id !== itemId),
                }
              : list
          )
        );
      } catch (e) {
        console.error("Failed to delete item", e);
      }
    }
  };

  const handleUpdateTitle = async (title: string, closeModal: () => void) => {
    if (modalState.selectedListId) {
      try {
        const updatedList = await updateListTitle(
          modalState.selectedListId,
          title
        );
        setLists(
          lists.map((list) =>
            list.id === modalState.selectedListId
              ? { ...list, title: updatedList.title }
              : list
          )
        );
        closeModal();
      } catch (e) {
        console.error("Failed to update list title", e);
      }
    }
  };

  const handleToggleDone = async (listId: number, item: ToDoItem) => {
    const updatedItem = { ...item, done: !item.done };
    try {
      await updateItemInList(listId, item.id, updatedItem);
      setLists(
        lists.map((list) =>
          list.id === listId
            ? {
                ...list,
                items: list.items.map((i) =>
                  i.id === item.id ? updatedItem : i
                ),
              }
            : list
        )
      );
    } catch (e) {
      console.error("Failed to update item status", e);
    }
  };

  const openItemModal = (listId: number, item: ToDoItem | null) => {
    setModalState({
      isItemModalOpen: true,
      isTitleModalOpen: false,
      selectedListId: listId,
      selectedItem: item,
    });
  };

  const openTitleModal = (listId: number | null, _title: string = "") => {
    setModalState({
      isItemModalOpen: false,
      isTitleModalOpen: true,
      selectedListId: listId,
      selectedItem: null,
    });
  };

  return (
    <div>
      <header>
        <h2>To-Do List &#x1f5d2;</h2>
      </header>
      <div className={style.addListBox}>
        <button onClick={() => openTitleModal(null)}>Create New List +</button>
      </div>

      {/* modal for creating and editing list titles */}
      <Modal
        isOpen={modalState.isTitleModalOpen}
        size="medium"
        onClose={() =>
          setModalState({ ...modalState, isTitleModalOpen: false })
        }
      >
        {(closeModal) => (
          <ListForm
            mode={modalState.selectedListId === null ? "Create" : "Edit"}
            defaultTitle={
              modalState.selectedListId === null
                ? ""
                : lists.find((list) => list.id === modalState.selectedListId)
                    ?.title || ""
            }
            onSubmit={(title: string) => {
              if (modalState.selectedListId === null) {
                handleSubmitList(title, closeModal);
              } else {
                handleUpdateTitle(title, closeModal);
              }
            }}
            closeModal={closeModal}
          />
        )}
      </Modal>

      {/* modal for creating and editing items */}
      <Modal
        isOpen={modalState.isItemModalOpen}
        size="small"
        onClose={() => setModalState({ ...modalState, isItemModalOpen: false })}
      >
        {(closeModal) => (
          <ItemForm
            mode={modalState.selectedItem ? "Edit" : "Create"}
            defaultValues={
              modalState.selectedItem || {
                name: "",
                description: "",
                dueDate: "",
              }
            }
            onSubmit={(data) => handleUpdateItem(data, closeModal)}
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
            onOpenTitleModal={() => openTitleModal(list.id, list.title)}
            onToggleDone={(item) => handleToggleDone(list.id, item)}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
