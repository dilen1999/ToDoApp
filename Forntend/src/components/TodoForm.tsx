import React, { useState } from "react";
import { useMutation, useQueryClient} from "react-query";
import { creatTodo, updateTodo } from "../api/axios";
import { TodoItemProps } from "./Types";

interface TodoFormProps {
  initialData?: TodoItemProps;
  isEditing?: boolean;
  onClose: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({
  isEditing,
  initialData,
  onClose,
}) => {
  const [name, setName] = useState(initialData?.name || "");
  const [isImportant, setIsImportant] = useState(
    initialData?.isImportant || false
  );

    const queryClient= useQueryClient();

  const addMutation = useMutation(creatTodo,{
    onError: (error) => {
      console.error("Add Todo Error:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
      queryClient.invalidateQueries('importantTodos');
      queryClient.invalidateQueries('completedTodos');
      onClose();
    },
  });

  const updateMutation = useMutation(
    (data: TodoItemProps) => updateTodo(data),{
    onError: (error) => {
      console.error("Update Todo Error:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
      queryClient.invalidateQueries('importantTodos');
      queryClient.invalidateQueries('completedTodos');
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && initialData) {
      updateMutation.mutate(
        { ...initialData, name, isImportant }
      );
    } else {
      addMutation.mutate({
        taskName: name as string,
        isImportant: isImportant as boolean,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Task Name"
        required
      />
      <label>
        <input
          type="checkbox"
          checked={isImportant}
          onChange={(e) => setIsImportant(e.target.checked)}
        />
        Important
      </label>
      <button type="submit" onClick={handleSubmit}>
        Save
      </button>
      <button type="button" className="cancel" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

export default TodoForm;
