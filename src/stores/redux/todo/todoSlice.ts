import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { TODO } from "../../../types/type.ts";
import { RootState } from "../store.ts";

interface TodoState {
  text: string;
  tasks: TODO[];
  isAdded: boolean;
  activeBtn: number;
  editedTask: number | null;
}

const initialState: TodoState = {
  text: "",
  tasks: [],
  isAdded: false,
  activeBtn: 1,
  editedTask: null,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    setActiveBtn: (state, action: PayloadAction<number>) => {
      state.activeBtn = action.payload;
    },
    addTask: (state, action: PayloadAction<string>) => {
      if (state.text.trim() === "") return;
      const newTask = {
        id: Date.now(),
        task: action.payload,
        finished: false,
      };
      state.tasks = [...state.tasks, newTask];
      state.text = "";
      state.isAdded = true;
    },
    toggleFinished: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload
          ? { ...task, finished: !task.finished }
          : task,
      );
    },
    toggleEdit: (state, action: PayloadAction<number>) => {
      state.editedTask = action.payload;
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    editTask: (
      state,
      action: PayloadAction<{ id: number; newTask: string }>,
    ) => {
      const { id, newTask } = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.id === id ? { ...task, task: newTask } : task,
      );
    },
    clearFinished: (state) => {
      state.tasks = state.tasks.filter(
        (task) => !task.finished && { ...task, task: task.finished },
      );
    },
  },
});

export const {
  setText,
  setActiveBtn,
  addTask,
  toggleFinished,
  toggleEdit,
  deleteTask,
  editTask,
  clearFinished,
} = todoSlice.actions;

const selectTodoState = (state: RootState) => state.todo;
export const selectTodo = createSelector([selectTodoState], (todo) => ({
  text: todo.text,
  tasks: todo.tasks,
  isAdded: todo.isAdded,
  activeBtn: todo.activeBtn,
  editedTask: todo.editedTask,
}));

export default todoSlice.reducer;
