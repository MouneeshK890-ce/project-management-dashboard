import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyState from "../components/EmptyState";
import { STATUSES } from "../utils/demoData";
import { formatDateTime } from "../utils/helpers";
import { updateTaskStatus } from "../slices/taskSlice";
import { CalendarCheck2 } from "lucide-react";

export default function DashboardPage() {
  const tasks = useSelector((state) => state.tasks.items);
  const projects = useSelector((state) => state.projects.items);
  const employees = useSelector((state) => state.employees.items);
  const dispatch = useDispatch();
  const [selectedProject, setSelectedProject] = useState("all");

  const filteredTasks = useMemo(
    () =>
      selectedProject === "all"
        ? tasks
        : tasks.filter((task) => task.projectId === selectedProject),
    [selectedProject, tasks],
  );

  const tasksByStatus = STATUSES.reduce((acc, status) => {
    acc[status] = filteredTasks.filter((task) => task.status === status);
    return acc;
  }, {});

  const getEmployee = (id) => employees.find((employee) => employee.id === id);

  const handleDrop = (status, taskId) => {
    dispatch(updateTaskStatus({ id: taskId, status }));
  };

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>
            Manage tasks using a visual board with project filtering and
            drag-and-drop updates.
          </p>
        </div>
        <select
          className="filter-select"
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
        >
          <option value="all">All projects</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.title}
            </option>
          ))}
        </select>
      </div>

      {!tasks.length ? (
        <EmptyState title="No tasks yet" />
      ) : (
        <div className="dash-grid">
          {STATUSES.map((status) => (
            <div
              className="dash-column"
              key={status}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) =>
                handleDrop(status, e.dataTransfer.getData("taskId"))
              }
            >
              <div className="dash-header">
                <h3>{status}</h3>
                <span>{tasksByStatus[status].length}</span>
              </div>
              {tasksByStatus[status].length ? (
                tasksByStatus[status].map((task) => {
                  const employee = getEmployee(task.employeeId);
                  const project = projects.find(
                    (item) => item.id === task.projectId,
                  );
                  return (
                    <article
                      key={task.id}
                      className="task-card"
                      draggable
                      onDragStart={(e) =>
                        e.dataTransfer.setData("taskId", task.id)
                      }
                    >
                      <h4>{task.title}</h4>
                      <div className="task-meta">
                        <div>
                          {task.referenceImages[0] && (
                            <img
                              src={task.referenceImages[0]}
                              alt={task.title}
                              className="task-image"
                            />
                          )}
                        </div>
                        <div>
                          <span>{employee?.name || "Unassigned"}</span>
                        </div>
                      </div>
                      <div>
                        <span className="dash-eta">
                          <CalendarCheck2 size={12} />{" "}
                          {formatDateTime(task.eta)}
                        </span>
                      </div>
                    </article>
                  );
                })
              ) : (
                <p className="column-empty">No tasks</p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
