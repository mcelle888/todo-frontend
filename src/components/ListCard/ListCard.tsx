import React, { useState, useEffect } from "react";
import { ToDoItem } from "../../services/todo-services";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import styles from "./ListCard.module.scss";

interface ListCardProps {
  list: {
    id: number;
    title: string;
    items: ToDoItem[];
  };
  onDelete: (id: number) => void;
  onOpenItemModal: (item: ToDoItem | null) => void;
  onOpenTitleModal: () => void;
  onToggleDone: (item: ToDoItem) => void;
  onDeleteItem: (itemId: number) => void;
}

const ListCard: React.FC<ListCardProps> = ({
  list,
  onDelete,
  onOpenItemModal,
  onOpenTitleModal,
  onToggleDone,
  onDeleteItem,
}) => {
  const [items, setItems] = useState<ToDoItem[]>(list.items);

  useEffect(() => {
    setItems(list.items);
  }, [list.items]);

  const handleDelete = () => {
    onDelete(list.id);
  };

  return (
    <div key={list.id} className={styles.listCard}>
      <div className={styles.cardHeader}>
        <div className={styles.titleBox}>
          <h3>{list.title}</h3>
          <button className={styles.iconButtons} onClick={onOpenTitleModal}>
            <FontAwesomeIcon icon={faSquarePen} />
          </button>
        </div>
        <button className={styles.deleteButton} onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
      <ul className={styles.itemList}>
        {items.map((item) => (
          <li key={item.id} className={item.done ? styles.done : ""}>
            <div className={styles.itemBox}>
              <input
                className={styles.checkBox}
                type="checkbox"
                checked={item.done}
                onChange={() => onToggleDone(item)}
              />
              <div>
                <p>{item.name}:</p>
                <p className={styles.description}>{item.description}</p>
                <div className={styles.dateContainer}>
                  Due: {dayjs(item.dueDate).format("dddd, MMMM D, YYYY h:mm A")}
                </div>
              </div>
            </div>
            <div className={styles.itemButtons}>
              <button
                className={styles.iconButtons}
                onClick={() => onOpenItemModal(item)}
              >
                <FontAwesomeIcon icon={faSquarePen} />
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => onDeleteItem(item.id)}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button
        className={styles.addItemButton}
        onClick={() => onOpenItemModal(null)}
      >
        Add Item
      </button>
    </div>
  );
};

export default ListCard;
