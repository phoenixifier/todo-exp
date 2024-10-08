import React from "react";
import { create } from "zustand";
import { TODO } from "../types/type.ts";

type State = {
  text: string;
  tasks: TODO[];
  isAdded: boolean;
  activeBtn: number;
  editedTask: number | null;
  inputRef: React.RefObject<HTMLInputElement>;
};

type Action = {
  updateText: (text: State["text"]) => void;
  updateTasks: (tasks: State["tasks"]) => void;
  updateIsAdded: (isAdded: State["isAdded"]) => void;
  updateActiveBtn: (activeBtn: State["activeBtn"]) => void;
  updateEditedTask: (editedTask: State["editedTask"]) => void;
  addTask: (task: string) => void;
  toggleFinished: (id: number) => void;
  toggleEdit: (id: number) => void;
  deleteTask: (id: number) => void;
  editTask: (id: number, newTask: string) => void;
  clearFinished: () => void;
};

export const useTaskStore = create<State & Action>((set, get) => ({
  text: "",
  tasks: [],
  isAdded: false,
  activeBtn: 1,
  editedTask: null,
  inputRef: React.createRef<HTMLInputElement>(),
  updateText: (text) => set(() => ({ text })),
  updateTasks: (tasks) => set(() => ({ tasks })),
  updateIsAdded: (isAdded) => set(() => ({ isAdded })),
  updateActiveBtn: (activeBtn) => set(() => ({ activeBtn })),
  updateEditedTask: (editedTask) => set(() => ({ editedTask })),
  addTask: (task) => {
    const { text, tasks } = get();
    if (text.trim() === "") return;
    const newTask = {
      id: Date.now(),
      task,
      finished: false,
    };
    set({
      tasks: [...tasks, newTask],
      text: "",
      isAdded: true,
    });
  },
  toggleFinished: (id) => {
    const { tasks } = get();
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, finished: !task.finished } : task,
    );
    set({ tasks: updatedTasks });
  },
  toggleEdit: (id) => {
    const { inputRef } = get();
    set({
      editedTask: id,
    });
    if (inputRef.current) {
      inputRef.current.focus();
    }
  },
  deleteTask: (id) => {
    const { tasks } = get();
    const filteredTasks = tasks.filter((task) => task.id !== id);
    set({ tasks: filteredTasks });
  },
  editTask: (id, newTask) => {
    const { tasks } = get();
    const editedTasks = tasks.map((task) =>
      task.id === id ? { ...task, task: newTask } : task,
    );
    set({ tasks: editedTasks });
  },
  clearFinished: () => {
    const { tasks } = get();
    const filteredTasks = tasks.filter(
      (task) => !task.finished && { ...task, task: task.finished },
    );
    set({ tasks: filteredTasks });
  },
}));
