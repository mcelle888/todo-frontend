import React from "react";
import { ToDoItem } from "../../services/todo-services";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import styles from "./ListItem.module.scss";

interface ListItemProps {
  item: ToDoItem;
  onToggleDone: (item: ToDoItem) => void;
  onEditItem: () => void;
  onDeleteItem: () => void;
}

const ListItem: React.FC<ListItemProps> = ({
  item,
  onToggleDone,
  onEditItem,
  onDeleteItem,
}) => {
  return (
    <li className={item.done ? styles.done : ""}>
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
        <button className={styles.iconButtons} onClick={onEditItem}>
          <FontAwesomeIcon icon={faSquarePen} />
        </button>
        <button className={styles.deleteButton} onClick={onDeleteItem}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
    </li>
  );
};

export default ListItem;
