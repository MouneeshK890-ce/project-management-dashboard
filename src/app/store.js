import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "../slices/employeeSlice";
import projectReducer from "../slices/projectSlice";
import taskReducer from "../slices/taskSlice";
import { loadState, saveState } from "../utils/storage";
import {demoEmployees, demoProjects, demoTasks} from "../utils/demoData";

const persisted = loadState();

const preloadedState = persisted || {
  employees: { items: demoEmployees },
  projects: { items: demoProjects },
  tasks: { items: demoTasks },
};

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
    projects: projectReducer,
    tasks: taskReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});
