
import React, { useReducer, useState } from "react";

// Step 1: Initial State
const initialTodos = [];

// Step 2: Reducer Function
function reducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        { id: Date.now(), text: action.payload, completed: false },
      ];

    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);

    default:
      return state;
  }
}

// Step 3: Component
const TodoApp = () => {
  const [state, dispatch] = useReducer(reducer, initialTodos);
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text.trim() === "") return;
    dispatch({ type: "ADD_TODO", payload: text });
    setText("");
  };

  const handleToggle = (id) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  const handleDelete = (id) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>📝 Todo Application</h1>

      <input
        type="text"
        placeholder="Enter new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          padding: "8px",
          width: "250px",
          marginRight: "10px",
          borderRadius: "5px",
        }}
      />
      <button onClick={handleAdd}>Add</button>

      <ul style={{ listStyle: "none", padding: 0, marginTop: "30px" }}>
        {state.length === 0 ? (
          <p>No tasks yet!</p>
        ) : (
          state.map((todo) => (
            <li
              key={todo.id}
              style={{
                margin: "10px 0",
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "gray" : "black",
              }}
            >
              {todo.text}
              <button
                onClick={() => handleToggle(todo.id)}
                style={{ marginLeft: "10px" }}
              >
                {todo.completed ? "Undo" : "Done"}
              </button>
              <button
                onClick={() => handleDelete(todo.id)}
                style={{ marginLeft: "10px", color: "red" }}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoApp;
