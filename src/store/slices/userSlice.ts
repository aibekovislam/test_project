import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../hooks/useUsers";
import { RootState } from "../store";

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUser(state, action: PayloadAction<User>) {
      const index = state.users.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    setLoading(state) {
      state.loading = true;
    },
    setError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setUsers, updateUser, setLoading, setError } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.users;
export const selectLoading = (state: RootState) => state.users.loading;
export const selectError = (state: RootState) => state.users.error;

export default usersSlice.reducer;