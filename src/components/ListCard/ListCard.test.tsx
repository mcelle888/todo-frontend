import { fireEvent, render, screen, within } from "@testing-library/react";
import { ToDoItem } from "../../services/todo-services";
import ListCard from "./ListCard";

const testList = {
  id: 1,
  title: "Test List",
  items: [
    { id: 1, name: "Item A", done: false },
    { id: 2, name: "Item B", done: true },
  ] as ToDoItem[],
};

describe('ListCard Component', () => {
  const setup = () => {
    const onDelete = vi.fn();
    const onOpenItemModal = vi.fn();
    const onOpenTitleModal = vi.fn();
    const onToggleDone = vi.fn();
    const onDeleteItem = vi.fn();

    render(
      <ListCard
        list={testList}
        onDelete={onDelete}
        onOpenItemModal={onOpenItemModal}
        onOpenTitleModal={onOpenTitleModal}
        onToggleDone={onToggleDone}
        onDeleteItem={onDeleteItem}
      />
    );
      return {
      onDelete,
      onOpenItemModal,
      onOpenTitleModal,
      onToggleDone,
      onDeleteItem,
    };
  };

  test('component renders list title and list items correctly', () => {
    setup()
    expect(screen.getByText('Test List')).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes("Item A"))
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes("Item B"))
    ).toBeInTheDocument();
  })

 
});

