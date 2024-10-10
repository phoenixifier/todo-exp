import React from "react";
import { useAppDispatch, useAppSelector } from "../stores/redux/hooks.ts";
import {
  addTask,
  clearFinished,
  selectTodo,
  setText,
} from "../stores/redux/todo/todoSlice.ts";
import TasksCriteria from "./TasksCriteria.tsx";
import TodoItem from "./TodoItem.tsx";

const TodoList: React.FC = () => {
  const { text, tasks, isAdded, activeBtn } = useAppSelector(selectTodo);
  const dispatch = useAppDispatch();
  const [localText, setLocalText] = React.useState("");

  const handleBlur = () => {
    dispatch(setText(localText));
    setLocalText("");
  };

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
          value={localText}
          onChange={(e) => setLocalText(e.target.value)}
          onBlur={handleBlur}
        />
        {isAdded && (
          <div className="flex flex-col rounded-xl items-start bg-black p-5 gap-6">
            <TasksCriteria />
            {tasks
              .filter((task) => {
                if (activeBtn === 1) return true;
                if (activeBtn === 2) return !task.finished;
                if (activeBtn === 3) return task.finished;
                return false;
              })
              .map((task, index) => (
                <TodoItem key={index} task={task} />
              ))}
            <div className="flex w-full text-white justify-between">
              <div>
                {tasks.filter((task) => !task.finished).length} items left
              </div>
              <button
                onClick={() => {
                  dispatch(clearFinished());
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
        onClick={() => dispatch(addTask(text))}
        className="p-5 border text-white font-bold bg-black rounded-xl"
      >
        Add Task
      </button>
    </form>
  );
};

export default TodoList;
