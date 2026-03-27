import { createSlice } from '@reduxjs/toolkit';
import { demoEmployees } from '../utils/demoData';

const employeeSlice = createSlice({
  name: 'employees',
  initialState: { items: [] },
  reducers: {
    addEmployee: (state, action) => {
      state.items.push(action.payload);
    },
    updateEmployee: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },
    deleteEmployee: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setEmployees: (state, action) => {
      state.items = action.payload;
    },
    loadDemoEmployees: (state) => {
      state.items = demoEmployees;
    },
  },
});

export const { addEmployee, updateEmployee, deleteEmployee, setEmployees, loadDemoEmployees } = employeeSlice.actions;
export default employeeSlice.reducer;
