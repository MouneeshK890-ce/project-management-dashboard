import { Mail } from 'lucide-react';

export default function EmployeeDetail({
  employee,
  projects,
}) {
  const assignedProjects = projects.filter((project) =>
    project.employeeIds?.includes(employee.id)
  );

  return (
    <div className="employee-details-modal">
      <div className="employee-details-header">
        <img
          src={employee.image}
          alt={employee.name}
          className="employee-details-avatar"
        />

        <div className="employee-details-main">
          <h2>{employee.name}</h2>
          <p className="employee-details-position">{employee.position}</p>
        </div>
      </div>

      <div className="employee-details-grid">
        <div className="employee-detail-card full-width">
          <span className="employee-detail-label">Official Email</span>
          <div className="employee-detail-value with-icon">
            <Mail size={16} />
            <span>{employee.email}</span>
          </div>
        </div>

        <div className="employee-detail-card full-width">
          <span className="employee-detail-label">Project List</span>

          {assignedProjects.length ? (
            <div className="employee-project-tags">
              {assignedProjects.map((project) => (
                <span key={project.id} className="employee-project-tag">
                  {project.title}
                </span>
              ))}
            </div>
          ) : (
            <p className="employee-empty-text">No assigned projects</p>
          )}
        </div>
      </div>
    </div>
  );
}