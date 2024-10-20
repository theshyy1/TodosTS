import { useState } from "react";

interface IProps {
  addTodo: (todo: string) => string | undefined;
  inputRef: any;
}

const TodoForm = ({ addTodo, inputRef }: IProps) => {
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const isDone: string | undefined = addTodo(input);
    if (!isDone) return;
    setInput("");
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      const isDone: string | undefined = addTodo(input);
      if (!isDone) return;
      setInput("");
    }
  };
  return (
    <div>
      <input
        type="text"
        className="w-[70%] border-none outline-none p-2"
        placeholder="Add something to do at here ..."
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        value={input}
        ref={inputRef}
      />
      <button className="border rounded p-2" onClick={handleSubmit}>
        ADD
      </button>
    </div>
  );
};

export default TodoForm;
