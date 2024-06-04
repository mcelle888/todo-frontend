import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  test("renders the button with children text", () => {
    render(<Button onClick={() => {}}>test</Button>);

    const button = screen.getByText(/test/i);
    expect(button).toBeInTheDocument();
  });

  test("calls onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>test</Button>);

    const button = screen.getByText(/test/i);
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
