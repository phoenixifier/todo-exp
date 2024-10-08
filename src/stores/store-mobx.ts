import { makeAutoObservable } from "mobx";
import React from "react";
import { TODO } from "../types/type.ts";

class Todo {
  text: string = "";
  tasks: TODO[] = [];
  isAdded: boolean = false;
  activeBtn: number = 1;
  editedTask: number | null = null;
  inputRef: React.RefObject<HTMLInputElement> =
    React.createRef<HTMLInputElement>();
  constructor() {
    makeAutoObservable(this);
  }
  setText(newText: string) {
    this.text = newText;
  }
  setActiveBtn(id: number) {
    this.activeBtn = id;
  }

  addTask(task: string) {
    if (this.text.trim() === "") return;
    const newTask = {
      id: Date.now(),
      task,
      finished: false,
    };
    this.tasks.push(newTask);
    this.text = "";
    this.isAdded = true;
  }
  toggleFinished(id: number) {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, finished: !task.finished } : task,
    );
  }
  toggleEdit(id: number) {
    this.editedTask = id;
    if (this.inputRef) {
      this.inputRef?.current?.focus();
    }
  }
  deleteTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
  editTask(id: number, newTask: string) {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, task: newTask } : task,
    );
  }
  clearFinished() {
    this.tasks = this.tasks.filter(
      (task) => !task.finished && { ...task, task: task.finished },
    );
  }
}

export default new Todo();
