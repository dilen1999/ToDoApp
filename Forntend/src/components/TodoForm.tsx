import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { creatTodo, updateTodo } from "../api/axios";
import { TodoItemProps } from "./Types";
import '../CSS/TodoForm.css'

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
  const [error, setError] = useState("");

  const queryClient = useQueryClient();

  const addMutation = useMutation(creatTodo, {
    onError: (error) => {
      console.error("Add Todo Error:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      queryClient.invalidateQueries("importantTodos");
      queryClient.invalidateQueries("completedTodos");
      onClose();
    },
  });

  const updateMutation = useMutation(
    (data: TodoItemProps) => updateTodo(data),
    {
      onError: (error) => {
        console.error("Update Todo Error:", error);
      },
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
        queryClient.invalidateQueries("importantTodos");
        queryClient.invalidateQueries("completedTodos");
        onClose();
      },
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please fill in the task name.");
      return;
    }
    setError(""); // Clear any previous error

    if (isEditing && initialData) {
      updateMutation.mutate({ ...initialData, name, isImportant });
    } else {
      addMutation.mutate({
        taskName: name,
        isImportant: isImportant,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <h1>Input Your Task Here</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Task Name"
        required
      />
      {error && <p className="error-message">{error}</p>}
      <label className="important-checkbox">
        <input
          type="checkbox"
          checked={isImportant}
          onChange={(e) => setIsImportant(e.target.checked)}
        />
        Important
      </label>
      <div className="button-group">
        <button type="submit">Save</button>
        <button type="button" className="cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
