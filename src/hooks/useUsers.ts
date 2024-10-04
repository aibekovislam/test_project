import { useEffect, useState } from "react";
import axios from "axios";

export interface User {
  id: number;
  name: string;
  email: string;
  status: string;
}

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const formattedUsers = response.data.map((user: any) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          status: "active",
        }));
        setUsers(formattedUsers);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load users");
        setLoading(false);
      });
  }, []);

  return { users, loading, error, setUsers };
};

export default useUsers;