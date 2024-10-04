import { render, screen, fireEvent } from "@testing-library/react";
import UserTable from "./UserTable";
import { User } from "../hooks/useUsers";
import '@testing-library/jest-dom';

const mockUsers: User[] = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive" }
];  

describe("UserTable", () => {
  test("renders user data correctly", () => {
    render(<UserTable users={mockUsers} onEdit={jest.fn()} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
  });

  test("calls onEdit when the edit button is clicked", () => {
    const mockOnEdit = jest.fn();
    render(<UserTable users={mockUsers} onEdit={mockOnEdit} />);

    const editButton = screen.getAllByText("Изменить")[0];
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledWith(mockUsers[0]);
  });
});