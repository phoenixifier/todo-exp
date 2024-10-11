import { createEvent, createStore } from "effector";
import { TODO } from "../../types/type.ts";

interface TodoState {
  text: string;
  tasks: TODO[];
  isAdded: boolean;
  activeBtn: number;
  editedTask: number | null;
}

export const $input = createStore<TodoState["text"]>("");
export const $tasks = createStore<TodoState["tasks"]>([]);
export const $isAdded = createStore<TodoState["isAdded"]>(false);
export const $activeBtn = createStore<TodoState["activeBtn"]>(1);
export const $editedTask = createStore<TodoState["editedTask"]>(null);

export const onInputChange = createEvent<TodoState["text"]>();
export const onActiveBtnChange = createEvent<TodoState["activeBtn"]>();
export const addTodo = createEvent<string>();
export const toggleFinished = createEvent<number>();
export const deleteTask = createEvent<number>();
export const toggleEdit = createEvent<number>();
export const editTask = createEvent<{ id: number; newTask: string }>();
export const clearFinished = createEvent<void>();

$input.on(onInputChange, (_, value) => value);
$editedTask.on(toggleEdit, (_, id) => id);
$activeBtn.on(onActiveBtnChange, (_, value) => value);

$tasks.on(addTodo, (tasks, task) => {
  if (task.trim() === "") return;
  const newTask = {
    id: Date.now(),
    task: task,
    finished: false,
  };
  return [...tasks, newTask];
});
$isAdded.on(addTodo, (_) => true);
$input.on(addTodo, (_) => "");

$tasks.on(deleteTask, (tasks, id) => {
  return tasks.filter((task) => task.id !== id);
});

$tasks.on(toggleFinished, (tasks, id) => {
  return tasks.map((task) =>
    task.id === id ? { ...task, finished: !task.finished } : task,
  );
});

$tasks.on(editTask, (tasks, { id, newTask }) => {
  return tasks.map((task) =>
    task.id === id ? { ...task, task: newTask } : task,
  );
});

$tasks.on(clearFinished, (tasks) => {
  return tasks.filter(
    (task) => !task.finished && { ...task, task: task.finished },
  );
});
