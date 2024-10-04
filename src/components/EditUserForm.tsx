import React from "react";
import { useForm } from "react-hook-form";
import { User } from "../hooks/useUsers";

interface EditUserFormProps {
  user: User;
  onSave: (data: User) => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ user, onSave }) => {
  const { register, handleSubmit } = useForm<User>({
    defaultValues: user,
  });

  const onSubmit = (data: User) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Name:
        <input {...register("name")} />
      </label>
      <label>
        Email:
        <input {...register("email")} />
      </label>
      <label>
        Status:
        <select {...register("status")}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </label>
      <button type="submit">Сохранить</button>
    </form>
  );
};

export default EditUserForm;