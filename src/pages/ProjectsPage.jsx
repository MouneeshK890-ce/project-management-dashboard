import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../components/Modal';
import EmptyState from '../components/EmptyState';
import ProjectForm from '../components/ProjectForm';
import { addProject, deleteProject, updateProject } from '../slices/projectSlice';
import { deleteTasksByProject } from '../slices/taskSlice';
import { generateId, formatDateTime } from '../utils/helpers';

export default function ProjectsPage() {
  const projects = useSelector((state) => state.projects.items);
  const employees = useSelector((state) => state.employees.items);
  const tasks = useSelector((state) => state.tasks.items);

  const dispatch = useDispatch();
  const [editing, setEditing] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const getEmployeeNames = (employeeIds) => employees.filter((employee) => employeeIds.includes(employee.id)).map((employee) => employee.name);

  const handleSave = (values) => {
  if (editing) {
    const previousEmployeeIds = editing.employeeIds || [];
    const nextEmployeeIds = values.employeeIds || [];

    const removedEmployeeIds = previousEmployeeIds.filter(
      (id) => !nextEmployeeIds.includes(id)
    );

    const blockedEmployee = removedEmployeeIds.find((employeeId) =>
      tasks.some(
        (task) => task.projectId === editing.id && task.employeeId === employeeId
      )
    );

    if (blockedEmployee) {
      alert('This employee still has tasks in this project. Please transfer or remove those tasks before unassigning.');
      setEditing({...editing})
      return;
    }

    dispatch(updateProject({ ...editing, ...values }));
  } else {
    dispatch(addProject({ id: generateId('proj'), ...values }));
  }

  setIsOpen(false);
  setEditing(null);
};

  const handleDelete = (project) => {
    const confirmDelete = window.confirm(
      `Delete "${project.title}"? This is will remove all related tasks`
    );
    if(confirmDelete){
    dispatch(deleteProject(project.id));
    dispatch(deleteTasksByProject(project.id));
  }
  else{
    return;
  }
  };

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Project Management</h1>
          <p>Manage projects, schedules, and assigned employees.</p>
        </div>
        <button className="primary-button" onClick={() => setIsOpen(true)}>Add Project</button>
      </div>

      {!projects.length ? (
        <EmptyState title="No projects yet" description="Create a project and assign team members to get started." />
      ) : (
        <div className="card-grid two-cols">
          {projects.map((project) => {
            const memberNames = getEmployeeNames(project.employeeIds);
            return (
              <article className="info-card" key={project.id}>
                <div className="project-card-top">
                  <img src={project.logo} alt={project.title} className="project-logo" />
                  <div>
                    <h3>{project.title}</h3>
                  </div>
                </div>
                    <p>{project.description}</p>
                <div className="meta-grid">
                  <span><strong>Start:</strong> {formatDateTime(project.startDate)}</span>
                  <span><strong>End:</strong> {formatDateTime(project.endDate)}</span>
                  <span><strong>Employees:</strong> {memberNames.length}</span>
                </div>
                <p className="muted-text">{memberNames.join(', ')}</p>
                <div className="inline-actions wrap-actions">
                  <button className="secondary-button" onClick={() => { setEditing(project); setIsOpen(true); }}>Edit</button>
                  <button className="danger-button" onClick={() => handleDelete(project)}>Delete</button>
                  <Link className="link-button" to={`/projects/${project.id}`}>View Details</Link>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {isOpen && (
        <Modal title={editing ? 'Edit Project' : 'Add Project'} onClose={() => { setIsOpen(false); setEditing(null); }}>
          <ProjectForm initialValues={editing} onSubmit={handleSave} onClose={() => { setIsOpen(false); setEditing(null); }} />
        </Modal>
      )}
    </section>
  );
}
