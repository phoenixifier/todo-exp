import React from "react";
import { TODO } from "../types/type.ts";
import TasksCriteria from "./TasksCriteria.tsx";
import TodoItem from "./TodoItem.tsx";

const TodoList: React.FC = () => {
  const [text, setText] = React.useState("");
  const [tasks, setTasks] = React.useState<TODO[]>([]);
  const [isAdded, setIsAdded] = React.useState(false);
  const [activeBtn, setActiveBtn] = React.useState(1);

  const addTask = (task: string) => {
    if (text.trim() === "") return;

    const newTask = {
      id: Date.now(),
      task,
      finished: false,
    };

    setTasks([...tasks, newTask]);
    setText("");
    setIsAdded(true);
  };

  const toggleFinished = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, finished: !task.finished } : task,
      ),
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id: number, newTask: string) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, task: newTask } : task)),
    );
  };

  const clearFinished = () => {
    setTasks(
      tasks.filter(
        (task) => !task.finished && { ...task, task: task.finished },
      ),
    );
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
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {isAdded && (
          <div className="flex flex-col rounded-xl items-start bg-black p-5 gap-6">
            <TasksCriteria activeBtn={activeBtn} setActiveBtn={setActiveBtn} />
            {tasks
              .filter((task) => {
                if (activeBtn === 1) return true;
                if (activeBtn === 2) return !task.finished;
                if (activeBtn === 3) return task.finished;
                return false;
              })
              .map((task, index) => (
                <TodoItem
                  key={index}
                  task={task}
                  toggleFinished={toggleFinished}
                  editTask={editTask}
                  deleteTask={deleteTask}
                />
              ))}
            <div className="flex w-full text-white justify-between">
              <div>
                {tasks.filter((task) => !task.finished).length} items left
              </div>
              <button onClick={clearFinished} className="hover:underline">
                Clear finished
              </button>
            </div>
          </div>
        )}
      </div>
      <button
        type="submit"
        onClick={() => addTask(text)}
        className="p-5 border text-white font-bold bg-black rounded-xl"
      >
        Add Task
      </button>
    </form>
  );
};

export default TodoList;
