import { useEffect, useRef, useState } from "react";
import TodoList from "./TodoList";
import "./CSS/Todo.css";

export default function Todo() {
  let count = 0;
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);

  const add = () => {
    setTodos([
      ...todos,
      { no: count++, text: inputRef.current.value, display: "" },
    ]);
    inputRef.current.value = "";
    localStorage.setItem("todos_count", count);
  };

  useEffect(() => {
    console.log(todos);
    setTimeout(() => {
      localStorage.setItem("todos", JSON.stringify(todos));
    }, 1000);
  }, [todos]);

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todos")));
    count = localStorage.getItem("todos_count");
  }, []);

  return (
    <div className="todo">
      <div className="todo-header">
        <h1>Task Manager</h1>
      </div>
      <div className="todo-add">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add your Task"
          className="todo-input"
        />
        <div className="todo-add-btn" onClick={add}>
          Add
        </div>
      </div>
      <div className="todo-list">
        {todos.map((items, index) => {
          return (
            <TodoList
              key={index}
              setTodos={setTodos}
              no={items.no}
              display={items.display}
              text={items.text}
            />
          );
        })}
      </div>
    </div>
  );
}
