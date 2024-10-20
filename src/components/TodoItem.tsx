import { useState } from "react";
import { ITodo } from "./TodoList";
import classNames from "classnames";

interface IProps {
  todo: ITodo;
  stt: number;
  deleteTodo: (id: string | number) => void;
  changeStatus: (id: string | number, status: boolean) => void;
  updateTodo: (id: string | number, title: any) => void;
}

const TodoItem = ({ todo, deleteTodo, changeStatus, updateTodo }: IProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e: any) => {
    setNewTitle(e.target.value);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      saveTitle();
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  // Lưu tiêu đề mới và kết thúc chế độ chỉnh sửa
  const saveTitle = () => {
    updateTodo(todo.id, { title: newTitle });
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setNewTitle(todo.title);
    setIsEditing(false);
  };

  const liClassnames = classNames(
    "bg-slate-300 border w-full py-3 cursor-pointer",
    { "bg-red-400": todo.isCompleted }
  );

  return (
    <li className={liClassnames}>
      <div className="flex justify-between items-center w-full">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={(e) => changeStatus(todo.id, e.target.checked)}
          className="flex-shrink-0 w-5 h-5 mx-5"
        />

        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={saveTitle}
            className="flex-grow text-left text-3xl font-sans"
            autoFocus
          />
        ) : (
          <h4
            className="flex-grow text-center text-3xl font-sans truncate cursor-pointer"
            onDoubleClick={handleEdit}
          >
            {todo.title}
          </h4>
        )}

        <div className="w-30 text-center px-5">
          {todo.isCompleted ? <p>Hoàn Thành</p> : <p>Chưa hoàn thành</p>}
        </div>
        <div className="w-30 text-center mx-5">
          <p>{todo?.time}</p>
        </div>

        <div className="w-24 text-center mx-10">
          {todo.isCompleted && (
            <span
              className="w-24 text-center cursor-pointer text-white border rounded p-2"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </span>
          )}
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
