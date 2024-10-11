import { useUnit } from "effector-react";
import React, { useRef } from "react";
import { FaCheck } from "react-icons/fa6";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  $editedTask,
  deleteTask,
  editTask,
  toggleEdit,
  toggleFinished,
} from "../stores/effector/store.ts";
import { TODO } from "../types/type.ts";

const TodoItem: React.FC<{
  task: TODO;
}> = ({ task }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [
    editedTask,
    setEditedInput,
    handleToggleFinished,
    handleToggleEdit,
    handleDeleteTask,
  ] = useUnit([$editedTask, editTask, toggleFinished, toggleEdit, deleteTask]);

  React.useEffect(() => {
    if (editedTask === task.id && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editedTask === task.id]);

  return (
    <div className="flex w-full justify-between gap-4">
      <div className="flex w-full items-center gap-2" key={task.id}>
        <button
          onClick={() => {
            handleToggleFinished(task.id);
          }}
          className={`p-4 border rounded-full ${task.finished && "!p-1.5 border-[#FF0000]"}`}
        >
          {task.finished && <FaCheck color="#FF0000" size={20} />}
        </button>
        <input
          type="text"
          ref={inputRef}
          disabled={!(editedTask === task.id)}
          value={task.task}
          onChange={(e) =>
            setEditedInput({ id: task.id, newTask: e.target.value })
          }
          className={`w-full py-3 px-4 ${task.finished ? "text-[#FF0000] line-through" : "text-white"}`}
        />
      </div>
      <div className="flex gap-3 items-center">
        <button className="flex border border-[#00FF00] rounded-md p-2">
          <MdEdit
            onClick={() => handleToggleEdit(task.id)}
            color="#00FF00"
            size={20}
          />
        </button>
        <button
          onClick={() => handleDeleteTask(task.id)}
          className="flex border border-[#FF0000] rounded-md p-2"
        >
          <MdDelete color="#FF0000" size={20} />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
