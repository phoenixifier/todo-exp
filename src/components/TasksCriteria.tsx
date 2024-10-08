import { observer } from "mobx-react-lite";
import React from "react";
import todo from "../stores/store-mobx.ts";

const tasksBtns = [
  { id: 1, title: "All Tasks" },
  { id: 2, title: "New Tasks" },
  { id: 3, title: "Finished Tasks" },
];

const TasksCriteria: React.FC = observer(() => {
  return (
    <div className="flex w-full items-center justify-between text-white text-sm">
      {tasksBtns.map((button, index) => (
        <button
          onClick={() => todo.setActiveBtn(index + 1)}
          key={button.id}
          className={`w-full
                    ${
                      index + 1 === todo.activeBtn
                        ? "bg-white text-black p-5 rounded-xl font-semibold"
                        : "text-white"
                    }
                  `}
        >
          {button.title}
        </button>
      ))}
    </div>
  );
});

export default TasksCriteria;
