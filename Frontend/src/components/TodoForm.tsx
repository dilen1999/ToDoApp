import React, { Dispatch, SetStateAction, useState } from 'react';
import TodoService from '../TodoService';
import ToDoTypes from '../todo';
import "../CSS/TodoForm.css";

interface PropTypes {
    setTodos: Dispatch<SetStateAction<ToDoTypes[]>>
}

const TodoForm: React.FC<PropTypes> = ({ setTodos }) => {
    const [newTodoText, setNewTodoText] = useState<string>("");

    const handleAddToDo = () => {
        if (newTodoText.trim() !== "") {
            const newTodo = TodoService.addTodos(newTodoText);
            setTodos((prevTodos) => [...prevTodos, newTodo]);
            setNewTodoText(""); // Clear the input after adding
        }
    }

    return (
        <div className='inputForm'>
            <input
            type='text'
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            autoFocus={true}
            placeholder = "Add a Task"/>
            <button onClick={handleAddToDo}>Add Todo </button>
           
        </div>
    );
}

export default TodoForm;
