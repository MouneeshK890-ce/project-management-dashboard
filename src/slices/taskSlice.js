import { createSlice } from '@reduxjs/toolkit';
import { demoTasks } from '../utils/demoData';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: { items: [] },
  reducers: {
    addTask: (state, action) => {
      state.items.push(action.payload);
    },
    updateTask: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateTaskStatus: (state, action) => {
      const task = state.items.find((item) => item.id === action.payload.id);
      if (task) task.status = action.payload.status;
    },
    deleteTasksByProject: (state, action) => {
      state.items = state.items.filter((item) => item.projectId !== action.payload);
    },
    deleteTasksByEmployee: (state, action) => {
      state.items = state.items.filter((item) => item.employeeId !== action.payload);
    },
    removeEmployeeAssignments: (state, action) => {
      state.items = state.items.map((item) => (item.employeeId === action.payload ? { ...item, employeeId: '' } : item));
    },
    setTasks: (state, action) => {
      state.items = action.payload;
    },
    loadDemoTasks: (state) => {
      state.items = demoTasks;
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  deleteTasksByProject,
  deleteTasksByEmployee,
  removeEmployeeAssignments,
  setTasks,
  loadDemoTasks,
} = taskSlice.actions;
export default taskSlice.reducer;
