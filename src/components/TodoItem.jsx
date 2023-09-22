import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";

const TodoItem = ({ todo, setRefresh }) => {
  const [editText, setEditText] = useState(todo.task);
  const [isEditing, setIsEditing] = useState(false);

  const updateTodo = () => {
    todo.complete = !todo.complete;

    fetch("http://localhost:8000/todos/" + todo.id, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(todo),
    }).then(() => {
      console.log("todo updated.");
      setRefresh(true);
    });
  };

  const deleteTodo = () => {
    fetch("http://localhost:8000/todos/" + todo.id, {
      method: "DELETE",
    }).then(() => {
      console.log("todo-deleted.");
      setRefresh(true);
    });
  };

  const changeTodo = () => {
    const editedTodo = { ...todo, task: editText };

    fetch("http://localhost:8000/todos/" + todo.id, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(editedTodo),
    }).then(() => {
      console.log("todo updated.");
      setIsEditing(false);
      setRefresh(true);
    });
  };

  return (
    <li className={`${todo.complete ? "checked" : ""}`}>
      <div>
        {isEditing ? (
          <div className="task-edit">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <span className="button" onClick={changeTodo}>
              Edit
            </span>
          </div>
        ) : (
          <div className="task-container">
            <div className="task-item" onClick={updateTodo}>
              {todo.task}
            </div>

            <div className="task-action">
              <span className="close" onClick={deleteTodo}>
                <FaTrash />
              </span>
              <span className="close" onClick={() => setIsEditing(true)}>
                <MdModeEdit />
              </span>
            </div>
          </div>
        )}
      </div>
    </li>
  );
};

export default TodoItem;

// // import { useState } from "react";

// // const TodoItem = ({ todo, setRefresh }) => {
// // 	const [editText, setEditText] = useState(todo.task);
// // 	const [isEditing, setIsEditing] = useState(false);

// // 	const updateTodo = () => {
// // 		todo.complete = !todo.complete;

// // 		fetch("http://localhost:8000/todos/" + todo.id, {
// // 			method: "PUT",
// // 			headers: {
// // 				"Content-Type": "application/json",
// // 			},
// // 			body: JSON.stringify(todo),
// // 		}).then(() => {
// // 			console.log("todo updated.");
// // 			setRefresh(true);
// // 		});
// // 	};

// // 	const deleteTodo = () => {
// // 		console.log("Id dari delete ", todo.id);
// // 		fetch("http://localhost:8000/todos/" + todo.id, {
// // 			method: "DELETE",
// // 		}).then(() => {
// // 			console.log("todo deleted.");
// // 			setRefresh(true);
// // 		});
// // 	};

// // 	const changeTodo = () => {
// // 		const editedTodo = { ...todo, task: editText };

// // 		fetch("http://localhost:8000/todos/" + todo.id, {
// // 			method: "PUT",
// // 			headers: {
// // 				"Content-Type": "application/json",
// // 			},
// // 			body: JSON.stringify(editedTodo),
// // 		}).then(() => {
// // 			console.log("todo updated.");
// // 			setIsEditing(false);
// // 			setRefresh(true);
// // 		});
// // 	};

// // 	return (
// // 		<li className={`${todo.complete ? "checked" : ""}`}>
// // 			<div>
// // 				{isEditing ? (
// // 					<div className="task-container">
// // 						<input
// // 							type="text"
// // 							value={editText}
// // 							onChange={(e) => setEditText(e.target.value)}
// // 						/>
// // 						<span className="add-button" onClick={changeTodo}>
// // 							Add
// // 						</span>
// // 					</div>
// // 				) : (
// // 					<div className="task-container">
// // 						<div className="task-item" onClick={updateTodo}>
// // 							{todo.task}
// // 						</div>
// // 						<span className="close" onClick={deleteTodo}>
// // 							x
// // 						</span>
// // 						<span
// // 							className="close"
// // 							onClick={() => setIsEditing(true)}
// // 						>
// // 							i
// // 						</span>
// // 					</div>
// // 				)}
// // 			</div>
// // 		</li>
// // 	);
// // };

// // export default TodoItem;
