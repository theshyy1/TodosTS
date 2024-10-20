import TodoList from "./components/TodoList";

function App() {
  return (
    <>
      <div className="">
        <h1 className="w-full text-5xl text-red-700 text-bold flex justify-center py-4 bg-gray-400">
          Công việc hàng ngày
        </h1>
        <TodoList />
      </div>
    </>
  );
}

export default App;
