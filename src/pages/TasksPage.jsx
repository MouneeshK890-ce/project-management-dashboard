import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Modal";
import EmptyState from "../components/EmptyState";
import TaskForm from "../components/TaskForm";
import TaskDetails from "../components/TaskDetails";
import { addTask, deleteTask, updateTask } from "../slices/taskSlice";
import { generateId, formatDateTime } from "../utils/helpers";
import { Pencil, Trash2 } from "lucide-react";

export default function TasksPage() {
  const tasks = useSelector((state) => state.tasks.items);
  const projects = useSelector((state) => state.projects.items);
  const employees = useSelector((state) => state.employees.items);
  const dispatch = useDispatch();

  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const getProjectName = (projectId) =>
    projects.find((project) => project.id === projectId)?.title ||
    "Unknown project";

  const getEmployeeName = (employeeId) =>
    employees.find((employee) => employee.id === employeeId)?.name ||
    "Unassigned";

  const handleSave = (values) => {
    if (editing) {
      dispatch(updateTask({ ...editing, ...values }));
    } else {
      dispatch(addTask({ id: generateId("task"), ...values }));
    }

    setIsFormOpen(false);
    setEditing(null);
  };

  const handleAddTask = () => {
    setEditing(null);
    setIsFormOpen(true);
  };

  const handleEditTask = (task) => {
    setEditing(task);
    setIsFormOpen(true);
  };

  const handleDelete = (task) => {
    const confirmDelete = window.confirm(
      `Delete "${task.title}"? This action cannot be undone.`
    );
    if(confirmDelete){
      dispatch(deleteTask(task.id));
    }
    else{
      return;
    }
  }

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditing(null);
  };

  const handleViewTask = (task) => {
    setViewing(task);
  };

  const handleCloseView = () => {
    setViewing(null);
  };

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Task Management</h1>
          <p>Create tasks, assign team members, and track progress.</p>
        </div>

        <button
          className="primary-button"
          onClick={handleAddTask}
          disabled={!projects.length || !employees.length}
        >
          Add Task
        </button>
      </div>

      {!tasks.length ? (
        <EmptyState
          title="No tasks yet"
          description="Create a project and add employees before creating tasks."
        />
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Status</th>
                <th className="task-col-emp">Assigned</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>
                    <strong>{task.title}</strong>
                    <p className="table-subtext">
                      {getProjectName(task.projectId)}
                    </p>
                  </td>

                  <td>
                    <span className="status-pill">{task.status}</span>
                  </td>

                  <td className="task-col-emp">{getEmployeeName(task.employeeId)}</td>

                  <td>
                    <div className="task-actions">
                      <button
                        className="action-icon edit"
                        onClick={() => handleEditTask(task)}
                      >
                        <Pencil size={14} />
                      </button>

                      <button
                        className="action-icon delete"
                        onClick={() => handleDelete(task)}
                      >
                        <Trash2 size={14} />
                      </button>

                      <button
                        className="action-view"
                        onClick={() => handleViewTask(task)}
                      >
                        View Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isFormOpen && (
        <Modal
          title={editing ? "Edit Task" : "Add Task"}
          onClose={handleCloseForm}
        >
          <TaskForm
            initialValues={editing}
            onSubmit={handleSave}
            onClose={handleCloseForm}
          />
        </Modal>
      )}

      {viewing && (
        <Modal title="Task Details" onClose={handleCloseView}>
          <TaskDetails
            task={viewing}
            projectName={getProjectName(viewing.projectId)}
            employeeName={getEmployeeName(viewing.employeeId)}
            onClose={handleCloseView}
          />
        </Modal>
      )}
    </section>
  );
}
