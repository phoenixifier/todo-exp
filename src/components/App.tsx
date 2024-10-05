import React from "react";
import TodoList from "./TodoList.tsx";

const App: React.FC = () => {
  return (
    <main className="container flex flex-col min-h-screen items-center mx-auto overflow-x-hidden pt-10">
      <h1 className="italic text-red-500">Todos</h1>
      <TodoList />
    </main>
  );
};

export default App;
