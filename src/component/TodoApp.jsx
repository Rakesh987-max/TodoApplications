
import React, { useReducer, useState, useEffect } from "react";
import "./TodoApp.css"// 👈 Import CSS file

const initialState =
  JSON.parse(localStorage.getItem("tasks")) || [
    "Rakesh",
    "Archana",
    "Kalyani",
    "Pujitha",
    "Rajakumari",
  ];

function reducer(state, action) {
  switch (action.type) {
    case "Add_User":
      return [...state, ...action.payload];
    case "Delete_User":
      return state.filter((_, index) => index !== action.payload);
    default:
      return state;
  }
}

const TodoApp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state));
  }, [state]);

  const AddTask = () => {
    if (text.trim() === "") return;
    dispatch({ type: "Add_User", payload: [text] });
    setText("");
  };

  const DeleteTask = (index) => {
    dispatch({ type: "Delete_User", payload: index });
  };

  return (
    <div className="todo-container">
      <h1>Todo App (Add + Delete)</h1>

      <ul className="todo-list">
        {state.map((value, index) => (
          <li key={index}>
            {value}
            <button className="delete-btn" onClick={() => DeleteTask(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter name"
        />
        <button className="add-btn" onClick={AddTask}>
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TodoApp;
