# React Project Management Dashboard

A full React + Vite project management dashboard with:

- React Router based routing
- Redux Toolkit global state
- React Hook Form + Yup validation
- Dynamic CRUD for employees, projects, and tasks
- Kanban dashboard with drag-and-drop status changes
- localStorage persistence
- Load Demo Data button
- Responsive modern UI

## Routes

- `/` Dashboard / Kanban board
- `/employees` Employee Management
- `/projects` Project Management
- `/projects/:id` Project Detail
- `/tasks` Task Management

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Notes

- Demo data is fully editable because it is stored in Redux state and persisted in localStorage.
- Task assignee dropdown is filtered by the selected project employees.
- Dragging a task across dashboard columns updates its status in Redux state.
