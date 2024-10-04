import React from "react";
import styled from "styled-components";
import { User } from "../hooks/useUsers";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th, td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #f4f4f4;
  }

  @media (max-width: 768px) {
    th, td {
      display: block;
      text-align: right;
      padding: 10px;
      position: relative;
    }

    .head_table {
        display: none;
    }

    th {
      background-color: transparent;
    }

    td::before {
      content: attr(data-label);
      position: absolute;
      left: 0;
      width: 50%;
      padding-left: 10px;
      font-weight: bold;
      text-align: left;
    }

    td {
      border: none;
      border-bottom: 1px solid #ddd;
    }

    tr {
      margin-bottom: 10px;
      display: block;
      border-bottom: 2px solid #ddd;
    }
  }
`;

const UserTable: React.FC<UserTableProps> = ({ users, onEdit }) => {
  return (
    <Table>
      <thead className="head_table">
        <tr>
          <th>ID</th>
          <th>Имя</th>
          <th>Email</th>
          <th>Статус</th>
          <th>Действие</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td data-label="ID">{user.id}</td>
            <td data-label="Name">{user.name}</td>
            <td data-label="Email">{user.email}</td>
            <td data-label="Status">{user.status}</td>
            <td data-label="Actions">
              <button onClick={() => onEdit(user)}>Изменить</button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserTable;