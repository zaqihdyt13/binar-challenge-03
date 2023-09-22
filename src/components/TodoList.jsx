import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import TodoItem from "./TodoItem";

const TodoList = ({ isRefresh, setRefresh }) => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isRefresh) {
      fetch("http://localhost:8000/todos")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setRefresh(false);
          setTodos(data);
          console.log(data);
        })
        .catch((err) => {
          setRefresh(false);
          if (err.name === "AbortError") {
            console.log("fetch aborted.");
          }
        });
    }
  }, [isRefresh, setRefresh]);

  const searchHandler = () => {
    if (query.length === 0) {
      setQueryResults([]);
      return;
    }

    setQueryResults(
      todos.filter((todo) =>
        todo.task.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const results = queryResults.length !== 0 ? queryResults : todos;

  const filteredTodos =
    filter === "all"
      ? results
      : filter === "done"
      ? results.filter((todo) => todo.complete === true)
      : filter === "todo" && results.filter((todo) => todo.complete === false);

  console.log(queryResults);

  return (
    <>
      <div className="search-filter">
        <h2>TodoSearch</h2>
        <div className="search-add">
          <div className="search-box">
            <input
              placeholder="Search Todo"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <span className="button" onClick={searchHandler}>
              <FaSearch className="fs" />
            </span>
          </div>
          <div className="search-row2">
            <div className="search2">
              <span className="button" onClick={searchHandler}>
                Search
              </span>
            </div>
            <div className="add-box">
              <button className="button" onClick={() => navigate("/add-todo")}>
                Add new Task
              </button>
            </div>
          </div>
        </div>
        <div className="filter">
          <h2>TodoList</h2>
          <div className="filter-buttons">
            <button className="button" onClick={() => setFilter("all")}>
              All
            </button>
            <button className="button" onClick={() => setFilter("done")}>
              Done
            </button>
            <button className="button" onClick={() => setFilter("todo")}>
              Todo
            </button>
          </div>
        </div>
      </div>
      <ul id="todo-list">
        {filteredTodos.length === 0 ? (
          <h3 className="result-text">Empty</h3>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem todo={todo} setRefresh={setRefresh} key={todo.id} />
          ))
        )}
      </ul>
    </>
  );
};

export default TodoList;
