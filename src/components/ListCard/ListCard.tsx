import React, { useState, useEffect } from "react";
import { ToDoItem } from "../../services/todo-services";
import ListItem from "../ListItem/ListItem";
import Button from "../Button/Button";
import styles from "./ListCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePen } from "@fortawesome/free-solid-svg-icons/faSquarePen";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons/faTrashCan";

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
          <Button className={styles.iconButtons} onClick={onOpenTitleModal}>
            <FontAwesomeIcon icon={faSquarePen} />
          </Button>
        </div>
        <Button className={styles.deleteButton} onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrashCan} />
        </Button>
      </div>
      <ul className={styles.itemList}>
        {items.map((item) => (
          <ListItem
            key={item.id}
            item={item}
            onToggleDone={onToggleDone}
            onEditItem={() => onOpenItemModal(item)}
            onDeleteItem={() => onDeleteItem(item.id)}
          />
        ))}
      </ul>
      <Button
        className={styles.addItemButton}
        onClick={() => onOpenItemModal(null)}
      >
        Add Item
      </Button>
    </div>
  );
};

export default ListCard;
