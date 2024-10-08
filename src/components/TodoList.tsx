import { observer } from "mobx-react-lite";
import React from "react";
import todo from "../stores/store-mobx.ts";
import TasksCriteria from "./TasksCriteria.tsx";
import TodoItem from "./TodoItem.tsx";

const TodoList: React.FC = observer(() => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="mt-10 flex justify-center items-start gap-5 w-full"
    >
      <div className="flex w-1/2 flex-col gap-5">
        <input
          className="p-5 bg-white border border-gray-400 rounded-xl outline-none"
          placeholder="What needs to be done?"
          value={todo.text}
          onChange={(e) => todo.setText(e.target.value)}
        />
        {todo.isAdded && (
          <div className="flex flex-col rounded-xl items-start bg-black p-5 gap-6">
            <TasksCriteria />
            {todo.tasks
              .filter((task) => {
                if (todo.activeBtn === 1) return true;
                if (todo.activeBtn === 2) return !task.finished;
                if (todo.activeBtn === 3) return task.finished;
                return false;
              })
              .map((task, index) => (
                <TodoItem key={index} task={task} />
              ))}
            <div className="flex w-full text-white justify-between">
              <div>
                {todo.tasks.filter((task) => !task.finished).length} items left
              </div>
              <button
                onClick={() => {
                  todo.clearFinished();
                }}
                className="hover:underline"
              >
                Clear finished
              </button>
            </div>
          </div>
        )}
      </div>
      <button
        type="submit"
        onClick={() => todo.addTask(todo.text)}
        className="p-5 border text-white font-bold bg-black rounded-xl"
      >
        Add Task
      </button>
    </form>
  );
});

export default TodoList;
