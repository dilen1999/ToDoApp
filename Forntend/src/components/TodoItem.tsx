import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteTodo, makeTaskDone } from "../api/axios";
import TodoForm from "./TodoForm";
import { TodoItemProps } from "./Types";

interface TodoItemProp {
  todo: TodoItemProps;
}

const TodoItem: React.FC<TodoItemProp> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [todoData, setTodoData] = useState<TodoItemProps>(todo);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        "todos",
        "importantTodos",
        "completedTodos",
      ]);
    },
  });

  const doneMutation = useMutation(makeTaskDone, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      queryClient.invalidateQueries("importantTodos");
      queryClient.invalidateQueries("completedTodos");
    },
  });

  const handleToggleDone = () => {
    setTodoData({ ...todo, isDone: true });
    doneMutation.mutate(todo.id, {
      onError: (error) => {
        console.log(error);
        window.alert("Toggle Done Error");
      },
    });
  };

  const handleDelete = () => {
    deleteMutation.mutate(todo.id, {
      onError: (error) => {
        console.log(error);
        window.alert("Delete Todo Error");
      },
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
        queryClient.invalidateQueries("importantTodos");
        queryClient.invalidateQueries("completedTodos");
      },
    });
  };

  const handleEdit = () => {
    queryClient.invalidateQueries("todos");
    queryClient.invalidateQueries("importantTodos");
    queryClient.invalidateQueries("completedTodos");
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    queryClient.invalidateQueries('todos');
    queryClient.invalidateQueries("importantTodos");
    queryClient.invalidateQueries("completedTodos");
    console.log("onclose")
    setIsEditing(false);
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todoData.isDone}
        onChange={handleToggleDone}
      />
      <span
        style={{ textDecoration: todoData.isDone ? "line-through" : "none" }}
      >
        {todoData.name}
      </span>
      <button className="edit" onClick={handleEdit}>
        Edit
      </button>
      <button className="delete" onClick={handleDelete}>
        Delete
      </button>
      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <TodoForm
              isEditing={true}
              initialData={todo}
              onClose={handleCloseEdit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
