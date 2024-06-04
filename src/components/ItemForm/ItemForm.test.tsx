import { fireEvent, render, screen } from "@testing-library/react";
import ItemForm from "./ItemForm";

describe('ItemForm Component', () => {
    const setup = (mode: "Create" | "Edit" = "Create") => {
      const onSubmit = vi.fn();
      const defaultValues = {
        name: "",
        description: "",
        dueDate: "",
      };
      render(
        <ItemForm
          mode={mode}
          defaultValues={defaultValues}
          onSubmit={onSubmit}
        />
      );
      return {
        onSubmit,
        defaultValues,
      };
    };

    test('renders correct form in create mode', () => {
        setup('Create')
        expect(screen.getByText(/Add Item/i)).toBeInTheDocument();
    })

    test('renders correct form in edit mode', () => {
        setup('Edit');
        expect(screen.getByText(/Edit Item/i)).toBeInTheDocument();
    })

    test('renders error messages for required fields', async () => {
        setup('Create')
        fireEvent.submit(screen.getByRole('button', {name: /Add Item/i}));
        expect(await screen.findByText(/Name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Please enter a valid future date and time/i)).toBeInTheDocument();
    })
})