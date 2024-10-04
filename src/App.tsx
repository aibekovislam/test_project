import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, setLoading, setError, selectUsers, selectLoading, selectError, updateUser } from "./store/slices/userSlice";
import UserTable from "./components/UserTable";
import EditUserForm from "./components/EditUserForm";
import Modal from "./components/Modal";
import GlobalStyles from "./styles/GlobalStyles";
import axios from "axios";
import { User } from "./hooks/useUsers";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [editingUser, setEditingUser] = React.useState<User | null>(null);

  useEffect(() => {
    dispatch(setLoading());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const formattedUsers = response.data.map((user: any) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          status: "active",
        }));
        dispatch(setUsers(formattedUsers));
      })
      .catch(() => {
        dispatch(setError("Ошибка с стягиванием данных"));
      });
  }, [dispatch]);

  const handleSaveUser = (updatedUser: User) => {
    dispatch(updateUser(updatedUser));
    setEditingUser(null);
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <GlobalStyles />
      <h1>ТЗ ДЛЯ ORACLE DIGITAL)</h1>
      <UserTable users={users} onEdit={setEditingUser} />
      {editingUser && (
        <Modal onClose={() => setEditingUser(null)}>
          <EditUserForm user={editingUser} onSave={handleSaveUser} />
        </Modal>
      )}
    </div>
  );
};

export default App;