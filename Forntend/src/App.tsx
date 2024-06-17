import React, { useState } from "react";
import TodoList from "./components/TodoList";
import ImportantTodoList from "./components/ImportantTodoList";
import CompletedTodoList from "./components/CompletedTodoList";
import TodoForm from "./components/TodoForm";
import LoginForm from "./components/LoginForm";
import "./index.css";
import "./CSS/TodoList.css";

const App: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="container">
      {isLoggedIn ? (
        <>
          <h1 className="TaskMaster">Task Master</h1>
          <button className="add-task" onClick={handleOpenForm}>
            Add Task
          </button>
          {isFormOpen && (
            <div className="modal">
              <div className="modal-content">
                <TodoForm onClose={handleCloseForm} />
              </div>
            </div>
          )}
          <div className="todo-container">
            <div className="todo-section">
              <h2 className="section-title">All To-Do Items</h2>
              <TodoList />
            </div>
            <div className="todo-section">
              <h2 className="section-title">Important Tasks</h2>
              <ImportantTodoList />
            </div>
            <div className="todo-section">
              <h2 className="section-title">Completed To-Dos</h2>
              <CompletedTodoList />
            </div>
          </div>
        </>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
