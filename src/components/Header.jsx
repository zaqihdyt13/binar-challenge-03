import { useState } from "react";
import { FaBook } from "react-icons/fa";

const Header = ({ setRefresh }) => {
  const [task, setTask] = useState("");

  // Fungsi untuk menambah data todo ketika tombol Add dii klik
  const addTodo = () => {
    const newTodo = { task, complete: false };

    fetch("http://localhost:8000/todos", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newTodo),
    }).then(() => {
      // ketika sukses menambah data, reset form dengan mengeset state title menjadi empty string
      setTask("");
      setRefresh(true);

      setTimeout(() => {
        alert("new todo added");
      }, 500);
    });
  };

  return (
    <div id="todo-header" className="header">
      <h2>Simple Todo App</h2>
      <div className="add-container">
        <div className="add-input">
          <input
            placeholder="Input/Edit Todo"
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <span className="button" onClick={addTodo}>
            <FaBook />
          </span>
        </div>
        <div className="submit">
          <span className="button" onClick={addTodo}>
            Submit
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
