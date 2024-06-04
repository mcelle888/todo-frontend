import { render, screen } from "@testing-library/react";
import { ToDoItem } from "../../services/todo-services"
import ListItem from "./ListItem";


describe("ListItem Component", () => {
    const testItem: ToDoItem = {
        id: 1,
        name: "Test Item",
        description: "Testing",
        dueDate: new Date().toISOString(),
        done: false,
    };

    const setup = () => {
        const onToggleDone = vi.fn();
        const onEditItem = vi.fn();
        const onDeleteItem = vi.fn();

        render(
            <ListItem
            item={testItem}
            onToggleDone={onToggleDone}
            onEditItem={onEditItem}
            onDeleteItem={onDeleteItem}
            />
        )
        return {
            onToggleDone,
            onEditItem,
            onDeleteItem,
        }
    }

    test('renders item name, description and due date correctly', () => {
        setup()
        expect(screen.getByText("Test Item:")).toBeInTheDocument();
        
        expect(screen.getByText("Testing")).toBeInTheDocument();
        expect(screen.getByText(/Due:/)).toBeInTheDocument();
    })
})