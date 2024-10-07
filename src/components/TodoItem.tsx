import React, { ElementRef } from "react";
import { FaCheck } from "react-icons/fa6";
import { MdDelete, MdEdit } from "react-icons/md";
import { TODO } from "../types/type.ts";

const TodoItem: React.FC<{
  task: TODO;
  toggleFinished: (id: number) => void;
  editTask: (id: number, newTask: string) => void;
  deleteTask: (id: number) => void;
}> = ({ task, toggleFinished, editTask, deleteTask }) => {
  const [isEdited, setIsEdited] = React.useState<number | null>(null);
  const ref = React.useRef<ElementRef<"input">>(null);

  const toggleEdit = (id: number) => {
    setIsEdited(id);
    if (ref.current) {
      ref.current.focus();
    }
  };

  return (
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
          onChange={(e) => editTask(task.id, e.target.value)}
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
  );
};

export default TodoItem;
