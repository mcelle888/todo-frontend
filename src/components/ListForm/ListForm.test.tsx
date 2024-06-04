import { fireEvent, render, screen } from "@testing-library/react";
import ListForm from "./ListForm";


describe('ListForm Component', () => {
    const setup = (mode: "Create" | "Edit" = "Create", defaultTitle="") => {
        const onSubmit = vi.fn();
        const closeModal = vi.fn();
        const utils = render(
          <ListForm
            mode={mode}
            onSubmit={onSubmit}
            closeModal={closeModal}
            defaultTitle={defaultTitle}
          />
        );
        return {
            onSubmit,
            closeModal,
            ...utils,
        };
    };

    test('renders the correct form in create mode', () => {
        setup('Create')
        expect(screen.getByText(/Add List/i)).toBeInTheDocument();
    })

    test('renders the correct form in edit mode', () => {
        setup('Edit')
        expect(screen.getByText(/Edit Title/i)).toBeInTheDocument();
    })

    test('calls onSubmit and closeModal when form is submitted', () => {
          const { getByText, getByLabelText, onSubmit, closeModal } =
            setup("Create");
          const input = getByLabelText("Title:");
          fireEvent.change(input, { target: { value: "Test List" } });
          fireEvent.click(getByText("Add List"));
          expect(onSubmit).toHaveBeenCalledWith("Test List");
          expect(closeModal).toHaveBeenCalled();
    })
})