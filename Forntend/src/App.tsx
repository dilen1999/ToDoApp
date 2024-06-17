import React, { useState } from 'react';
import TodoList from './components/TodoList';
import ImportantTodoList from './components/ImportantTodoList';
import CompletedTodoList from './components/CompletedTodoList';
import TodoForm from './components/TodoForm';
import './index.css';
import './CSS/TodoList.css'


const App: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
      <div className="container">
        <h1>Todo App</h1>
        <button className="add-task" onClick={handleOpenForm}>Add Task</button>
        {isFormOpen && <TodoForm onClose={handleCloseForm} />}
        <h2>All Tasks</h2>
        <TodoList />
        <h2>Important Tasks</h2>
        <ImportantTodoList />
        <h2>Completed Tasks</h2>
        <CompletedTodoList />
      </div>
  );
};

export default App;
