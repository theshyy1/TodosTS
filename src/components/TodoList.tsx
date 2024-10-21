import { useEffect, useRef, useState } from "react";
import TodoForm from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import TodoItem from "./TodoItem";

export interface ITodo {
  id: number | string;
  title: string;
  isCompleted: boolean;
  time?: string;
}

const TodoList = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("Get todos from Local Storage");
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    } else {
      setTodos([]);
    }
  }, []);

  const addTodo = (todo: string) => {
    if (todo === "" || null) {
      alert("Cannot added this todo, try again!");
      return;
    }
    const alreadyOne = todos.find((x) => x.title === todo);
    if (alreadyOne) {
      alert("This one is already in the list");
      return;
    }

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    const timeCreated = `${day}/${month}/${year}`;

    let newTodo = {
      id: uuidv4(),
      title: todo,
      isCompleted: false,
      time: timeCreated,
    };
    localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
    setTodos([...todos, newTodo]);
    return todo;
  };

  const changeStatus = (id: string | number, status: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: status };
      } else {
        return todo;
      }
    });
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const deleteTodo = (id: string | number) => {
    if (!window.confirm("Are you sure you want to delete")) {
      return;
    }
    const todosFiltered = todos.filter((todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(todosFiltered));
    setTodos(todosFiltered);
  };

  const updateTodo = (id: string | number, text: { title: string }) => {
    const { title } = text;

    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, title };
      } else {
        return todo;
      }
    });
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setTodos([...newTodos]);
  };

  const handleClickFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  return (
    <div className="w-full bg-orange-300 h-screen flex justify-center">
      <div className="w-full">
        <TodoForm addTodo={addTodo} inputRef={inputRef} />
        <ul className="flex justify-between items-center w-full border-b-2 italic text-sm">
          <li className="w-20 text-center"></li>
          <li className="flex-grow text-center">Tiêu đề</li>
          <li className="w-24 text-center">Trạng thái</li>
          <li className="w-24 text-center mx-10">Thời gian</li>
          <li className="w-24 text-center mx-10"></li>
        </ul>
        <ul className="text-center">
          {todos.length > 0 ? (
            todos?.map((todo, v) => {
              return (
                <TodoItem
                  todo={todo}
                  stt={v}
                  deleteTodo={deleteTodo}
                  changeStatus={changeStatus}
                  updateTodo={updateTodo}
                />
              );
            })
          ) : (
            <div className="flex justify-between items-center">
              <button
                onClick={handleClickFocus}
                className="flex justify-between items-center"
              >
                Thêm mới
              </button>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
