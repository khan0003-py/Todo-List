import "./CSS/TodoList.css";
import tick from "./Assets/tick.png";
import not_tick from "./Assets/not_tick.png";
import cross from "./Assets/cross.png";

export default function TodoList({ no, display, text, setTodos }) {

    const Delete=(no)=>{
        let data=JSON.parse(localStorage.getItem("todos"));
        data=data.filter((todo)=>todo.no!==no);
        setTodos(data);
    }
  const toggle = () => {
    let data = JSON.parse(localStorage.getItem("todos"));
    for (let i = 0; i < data.length; i++) {
      if (data[i].no === no) {
        if (data[i].display === "") {
          data[i].display = "line-through";
        } else {
          data[i].display = "";
        }
        break;
      }
    }
    setTodos(data);
  };

  return (
    <div className="todo-items">
      <div
        className={`todo-items-container ${display}`}
        onClick={() => {
          toggle(no);
        }}
      >
        {display == "" ? (
          <img src={not_tick} alt="" />
        ) : (
          <img src={tick} alt="" />
        )}
        <div className="todo-items-text">{text}</div>
      </div>
      <img src={cross} alt="" onClick={Delete} className="todo-items-cross-icon" />
    </div>
  );
}
