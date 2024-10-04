import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./Modal";
import '@testing-library/jest-dom';

describe("Modal", () => {
  test("renders children correctly", () => {
    render(
      <Modal onClose={jest.fn()}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  test("calls onClose when the overlay is clicked", () => {
    const mockOnClose = jest.fn();
    render(
      <Modal onClose={mockOnClose}>
        <div>Modal Content</div>
      </Modal>
    );

    const overlay = screen.getByRole("dialog").parentElement!;
    fireEvent.click(overlay);

    expect(mockOnClose).toHaveBeenCalled();
  });
});