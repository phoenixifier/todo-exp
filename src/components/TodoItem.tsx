import React, { useRef } from "react";
import { FaCheck } from "react-icons/fa6";
import { MdDelete, MdEdit } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../stores/redux/hooks.ts";
import {
  deleteTask,
  editTask,
  toggleEdit,
  toggleFinished,
} from "../stores/redux/todo/todoSlice.ts";
import { TODO } from "../types/type.ts";

const TodoItem: React.FC<{
  task: TODO;
}> = ({ task }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const isEditing = useAppSelector(
    (state) => state.todo.editedTask === task.id,
  );

  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const [localEdit, setLocalEdit] = React.useState({
    id: 0,
    newTask: task.task,
  });

  const handleEditBlur = () => {
    dispatch(editTask({ id: localEdit.id, newTask: localEdit.newTask }));
  };

  return (
    <div className="flex w-full justify-between gap-4">
      <div className="flex w-full items-center gap-2" key={task.id}>
        <button
          onClick={() => {
            dispatch(toggleFinished(task.id));
          }}
          className={`p-4 border rounded-full ${task.finished && "!p-1.5 border-[#FF0000]"}`}
        >
          {task.finished && <FaCheck color="#FF0000" size={20} />}
        </button>
        <input
          type="text"
          ref={inputRef}
          disabled={!isEditing}
          value={localEdit.newTask}
          onChange={(e) =>
            setLocalEdit({ id: task.id, newTask: e.target.value })
          }
          onBlur={handleEditBlur}
          className={`w-full py-3 px-4 ${task.finished ? "text-[#FF0000] line-through" : "text-white"}`}
        />
      </div>
      <div className="flex gap-3 items-center">
        <button className="flex border border-[#00FF00] rounded-md p-2">
          <MdEdit
            onClick={() => dispatch(toggleEdit(task.id))}
            color="#00FF00"
            size={20}
          />
        </button>
        <button
          onClick={() => dispatch(deleteTask(task.id))}
          className="flex border border-[#FF0000] rounded-md p-2"
        >
          <MdDelete color="#FF0000" size={20} />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
