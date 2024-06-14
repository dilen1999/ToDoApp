import React, { useState } from "react";
import ToDoTypes from "../todo";
import TodoService from "../TodoService";
import { FaCheck, FaEdit } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { RiDeleteBinFill } from "react-icons/ri";
import TodoForm from "./TodoForm";
import "../CSS/TodoList.css";

const TodoList = () => {
  const [todos, setTodos] = useState<ToDoTypes[]>(TodoService.getTodos());
  const [editingTodoId, setEditedTodoId] = useState<number | null>(null);
  const [editedTodoText, setEditedTodoText] = useState<string>("");

  //function for handiling edit action
  const handleEditStart = (id: number, text: string) => {
    setEditedTodoId(id);
    setEditedTodoText(text);
  };

  const handleEditCancel = () => {
    setEditedTodoId(null);
    setEditedTodoText("");
  };

  const handleEditSave = (id: number) => {
    if (editedTodoText.trim() !== "") {
      const existingTodo = todos.find((todo) => todo.id === id);

      if (existingTodo) {
        const updatedTodo = TodoService.updateTodo({
          id,
          text: editedTodoText,
          completed: existingTodo.completed, 
        });

        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
        );

       
        setEditedTodoId(null);
        setEditedTodoText("");
      }
    }
  };

  // function to delete todo
   const handleDeleteTodo = (id:number)=>{
    TodoService.deleteTodo(id);
    setTodos((prevTodo) => prevTodo.filter((todo)=> todo.id !== id));
   }
   return (
    <div className="todoContainer">
        <div>
            {/* Todo input form */}
            <TodoForm setTodos={setTodos}/>
        </div>
        <div className="todos">
        {
            todos.map((todo) => (
                <div className="items" key={todo.id}>
                    {editingTodoId === todo.id ? (
                        <div className="editedText">
                            <input 
                                type="text" 
                                value={editedTodoText} 
                                onChange={(e) => setEditedTodoText(e.target.value)} 
                                autoFocus={true}
                            />
                            <button onClick={() => handleEditSave(todo.id)}>
                                 <FaCheck/>
                            </button>

                            <button className="cancelBtn" onClick={() => handleEditCancel()}>
                                 <GiCancel/>
                            </button>
                        </div>
                    ) : (
                        <div className="editBtn">
                            {/* Display the todo text or other content here */}
                            <span>{todo.text}</span>
                            <button onClick={()=>handleEditStart(todo.id, todo.text)} className="editText">
                                <FaEdit/>
                            </button>
                        </div>
                    )}
                    <button onClick={()=> handleDeleteTodo(todo.id)}>
                        <RiDeleteBinFill/>
                    </button>
                </div>
            ))
        }
        </div>
    </div>
);

};

export default TodoList;
