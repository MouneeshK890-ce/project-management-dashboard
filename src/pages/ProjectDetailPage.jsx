import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EmptyState from '../components/EmptyState';
import { formatDateTime } from '../utils/helpers';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const project = useSelector((state) => state.projects.items.find((item) => item.id === id));
  const employees = useSelector((state) => state.employees.items);
  const tasks = useSelector((state) => state.tasks.items.filter((item) => item.projectId === id));

  if (!project) {
    return <EmptyState title="Project not found" description="The project you requested does not exist." />;
  }

  const assignedEmployees = employees.filter((employee) => project.employeeIds.includes(employee.id));

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </div>
        <Link to="/projects" className="secondary-button proj-back">Back to Projects</Link>
      </div>

      <div className="detail-grid">
        <article className="info-card">
          <img src={project.logo} alt={project.title} className="detail-hero" />
          <div className="meta-grid top-gap">
            <span><strong>Start:</strong> {formatDateTime(project.startDate)}</span>
            <span><strong>End:</strong> {formatDateTime(project.endDate)}</span>
            <span><strong>Assigned:</strong> {assignedEmployees.length} employees</span>
          </div>
        </article>

        <article className="info-card">
          <h3>Assigned Employees</h3>
          {!assignedEmployees.length ? (
            <p className="muted-text">No employees assigned.</p>
          ) : (
            <div className="stack-list">
              {assignedEmployees.map((employee) => (
                <div key={employee.id} className="list-row">
                  <div className="employee-head">
                    <img src={employee.image} alt={employee.name} className="avatar small" />
                    <div>
                      <strong>{employee.name}</strong>
                      <p>{employee.position}</p>
                    </div>
                  </div>
                  <span className="muted-text">{employee.email}</span>
                </div>
              ))}
            </div>
          )}
        </article>
      </div>

      <article className="info-card top-gap">
        <h3>Related Tasks</h3>
        {!tasks.length ? (
          <p className="muted-text">No tasks yet for this project.</p>
        ) : (
          <div className="stack-list">
            {tasks.map((task) => {
              const assigned = employees.find((employee) => employee.id === task.employeeId);
              return (
                <div key={task.id} className="list-row">
                  <div>
                    <strong>{task.title}</strong>
                    <p>{task.description}</p>
                  </div>
                  <div className="align-right">
                    <span className="status-pill">{task.status}</span>
                    <p className="muted-text">{assigned?.name || 'Unassigned'} · {formatDateTime(task.eta)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </article>
    </section>
  );
}
