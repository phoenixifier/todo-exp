import { useUnit } from "effector-react/effector-react.umd";
import React from "react";
import { $activeBtn, onActiveBtnChange } from "../stores/effector/store.ts";

const tasksBtns = [
  { id: 1, title: "All Tasks" },
  { id: 2, title: "New Tasks" },
  { id: 3, title: "Finished Tasks" },
];

const TasksCriteria: React.FC = () => {
  const [activeBtn, setActiveBtn] = useUnit([$activeBtn, onActiveBtnChange]);
  return (
    <div className="flex w-full items-center justify-between text-white text-sm">
      {tasksBtns.map((button, index) => (
        <button
          onClick={() => setActiveBtn(index + 1)}
          key={button.id}
          className={`w-full
                    ${
                      index + 1 === activeBtn
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
};

export default TasksCriteria;
