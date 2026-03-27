import { createSlice } from '@reduxjs/toolkit';
import { demoProjects } from '../utils/demoData';

const projectSlice = createSlice({
  name: 'projects',
  initialState: { items: [] },
  reducers: {
    addProject: (state, action) => {
      state.items.push(action.payload);
    },
    updateProject: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },
    deleteProject: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setProjects: (state, action) => {
      state.items = action.payload;
    },
    loadDemoProjects: (state) => {
      state.items = demoProjects;
    },
  },
});

export const { addProject, updateProject, deleteProject, setProjects, loadDemoProjects } = projectSlice.actions;
export default projectSlice.reducer;
