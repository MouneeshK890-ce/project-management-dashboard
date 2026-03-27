import { formatDateTime } from '../utils/helpers';

export default function TaskDetails({
  task,
  projectName,
  employeeName,
}) {
  return (
    <div className="task-details">
      <div className="task-details-grid">
        <div className="task-detail-item full-width">
          <span className="task-detail-label">Title</span>
          <p className="task-detail-value">{task.title}</p>
        </div>

        <div className="task-detail-item full-width">
          <span className="task-detail-label">Description</span>
          <p className="task-detail-value">{task.description || '—'}</p>
        </div>

        <div className="task-detail-item">
          <span className="task-detail-label">Project</span>
          <p className="task-detail-value">{projectName}</p>
        </div>

        <div className="task-detail-item">
          <span className="task-detail-label">Assigned Employee</span>
          <p className="task-detail-value">{employeeName}</p>
        </div>

        <div className="task-detail-item">
          <span className="task-detail-label">ETA</span>
          <p className="task-detail-value">{formatDateTime(task.eta)}</p>
        </div>

        <div className="task-detail-item">
          <span className="task-detail-label">Status</span>
          <p className="task-detail-value">
            <span className="status-pill">{task.status}</span>
          </p>
        </div>

        <div className="task-detail-item full-width">
          <span className="task-detail-label">Reference Images</span>

          {task.referenceImages?.length ? (
            <div className="task-image-grid">
              {task.referenceImages.map((image, index) => (
                <img
                  key={`${image}-${index}`}
                  src={image}
                  alt={`Reference ${index + 1}`}
                  className="task-detail-image"
                />
              ))}
            </div>
          ) : (
            <p className="task-detail-value">—</p>
          )}
        </div>
      </div>
    </div>
  );
}