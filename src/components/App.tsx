import React, { ChangeEvent } from "react";
import { FaCheck } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const App: React.FC = () => {
  const [text, setText] = React.useState("");
  const [isAdded, setIsAdded] = React.useState(false);
  const [isEdited, setIsEdited] = React.useState<number | null>(null);
  const ref = React.useRef(null);
  const [tasks, setTasks] = React.useState([]);
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

  const editTask = (id: number, e) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, task: e.target.value } : task,
      ),
    );
  };

  const toggleEdit = (id: number) => {
    setIsEdited(id);
    setTimeout(() => {
      ref.current.focus();
    }, 0);
  };

  return (
    <main className="container flex flex-col min-h-screen items-center mx-auto overflow-x-hidden pt-10">
      <h1 className="italic text-red-500">Todos</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="mt-10 flex justify-center items-start gap-5 w-full"
      >
        <div className="flex w-1/2 flex-col gap-5">
          <input
            className="p-5 bg-white border border-gray-500 rounded-xl outline-none"
            placeholder="What needs to be done?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {isAdded && (
            <div className="flex flex-col rounded-xl items-start bg-black p-5 gap-6">
              <h2 className="font-bold text-white">Current Tasks</h2>
              {tasks.map((task) => (
                <div className="flex w-full justify-between gap-4">
                  <div className="flex w-full items-center gap-2" key={task.id}>
                    <button
                      onClick={() => {
                        toggleFinished(task.id);
                      }}
                      className={`p-4 border rounded-full ${task.finished && "!p-1.5 border-[#FF0000]"}`}
                    >
                      {task.finished && <FaCheck color="#FF0000" size={20} />}
                    </button>
                    <input
                      ref={isEdited === task.id ? ref : null}
                      disabled={isEdited !== task.id}
                      value={task.task}
                      onChange={(e) => editTask(task.id, e)}
                      className={`w-full py-3 px-4 ${task.finished ? "text-[#FF0000] line-through" : "text-white"}`}
                    />
                  </div>
                  <div className="flex gap-3 items-center">
                    <button className="flex border border-[#00FF00] rounded-md p-2">
                      <MdEdit
                        onClick={() => toggleEdit(task.id)}
                        color="#00FF00"
                        size={20}
                      />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="flex border border-[#FF0000] rounded-md p-2"
                    >
                      <MdDelete color="#FF0000" size={20} />
                    </button>
                  </div>
                </div>
              ))}
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
    </main>
  );
};

export default App;
