import { User } from "../../hooks/useUsers";
import usersReducer, { setUsers, updateUser, setLoading, setError } from "../slices/userSlice";
import '@testing-library/jest-dom';

const mockUsers: User[] = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive" }
];  

describe("usersSlice", () => {
  test("should handle initial state", () => {
    expect(usersReducer(undefined, { type: "unknown" })).toEqual({
      users: [],
      loading: false,
      error: null,
    });
  });

  test("should handle setUsers", () => {
    const actual = usersReducer(undefined, setUsers(mockUsers));
    expect(actual.users).toEqual(mockUsers);
    expect(actual.loading).toBe(false);
    expect(actual.error).toBe(null);
  });

  test("should handle updateUser", () => {
    const initialState = { users: mockUsers, loading: false, error: null };
    const updatedUser = { id: 1, name: "John Doe", email: "john@newemail.com", status: "active" };
    const actual = usersReducer(initialState, updateUser(updatedUser));
    expect(actual.users[0]).toEqual(updatedUser);
  });

  test("should handle setLoading", () => {
    const actual = usersReducer(undefined, setLoading());
    expect(actual.loading).toBe(true);
  });

  test("should handle setError", () => {
    const errorMessage = "Failed to load users";
    const actual = usersReducer(undefined, setError(errorMessage));
    expect(actual.error).toBe(errorMessage);
    expect(actual.loading).toBe(false);
  });
});