import React, { useState, useEffect } from "react";
import "./CSS/TodoList.css";
import tick from "./Assets/tick.png";
import not_tick from "./Assets/not_tick.png";
import cross from "./Assets/cross.png";

export default function TodoList({ no, display, text, setTodos }) {
  const [localTodos, setLocalTodos] = useState([]);

  // Fetch todos from localStorage on mount and update state
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setLocalTodos(storedTodos);
  }, []);

  // Update localStorage when localTodos state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(localTodos));
  }, [localTodos]);

  const handleToggle = () => {
    setLocalTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.no === no
          ? {
              ...todo,
              display: (todo.display || "") === "" ? "line-through" : "",
            }
          : todo
      )
    );
  };

  const handleDelete = () => {
    setLocalTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter((todo) => todo.no !== no);
      return updatedTodos;
    });
  };
  
  
  

  return (
    <div className="todo-items">
      <div className={`todo-items-container ${display}`} onClick={handleToggle}>
        {display === "" ? (
          <img src={not_tick} alt="" />
        ) : (
          <img src={tick} alt="" />
        )}
        <div className="todo-items-text">{text}</div>
      </div>
      <img
        src={cross}
        alt=""
        onClick={handleDelete}
        className="todo-items-cross-icon"
      />
    </div>
  );
}
