import { useMemo, useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { STATUSES } from '../utils/demoData';
import { formatDateTimeForInput } from '../utils/helpers';
import { taskSchema } from '../utils/validation';
import ImagePicker from './ImagePicker';

export default function TaskForm({ initialValues, onSubmit, onClose }) {
  const projects = useSelector((state) => state.projects.items);
  const employees = useSelector((state) => state.employees.items);
  const schema = useMemo(() => taskSchema(projects), [projects]);
  const {
  register,
  control,
  handleSubmit,
  reset,
  formState: { errors, isSubmitting },
} = useForm({
  resolver: yupResolver(schema),
  defaultValues: {
    title: '',
    description: '',
    projectId: '',
    employeeId: '',
    eta: '',
    referenceImages: [],
    status: STATUSES[0],
  },
});

useEffect(() => {
  reset({
    title: initialValues?.title || '',
    description: initialValues?.description || '',
    projectId: initialValues?.projectId || '',
    employeeId: initialValues?.employeeId || '',
    eta: formatDateTimeForInput(initialValues?.eta),
    referenceImages: initialValues?.referenceImages || [],
    status: initialValues?.status || STATUSES[0],
  });
}, [initialValues, reset]);

  const selectedProjectId = useWatch({ control, name: 'projectId' });
  const selectedProject = projects.find((project) => project.id === selectedProjectId);
  const filteredEmployees = employees.filter((employee) => selectedProject?.employeeIds?.includes(employee.id));

  return (
    <form className="form-grid" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group full-width">
        <label>Title</label>
        <input {...register('title')} placeholder="Task title" />
        <span className="error-text">{errors.title?.message}</span>
      </div>
      <div className="form-group full-width">
        <label>Description</label>
        <textarea rows="4" {...register('description')} placeholder="Task description" />
        <span className="error-text">{errors.description?.message}</span>
      </div>
      <div className="form-group">
        <label>Project</label>
        <select {...register('projectId')}>
          <option value="">Select project</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>{project.title}</option>
          ))}
        </select>
        <span className="error-text">{errors.projectId?.message}</span>
      </div>
      <div className="form-group">
  <label>Assigned employee</label>

  <Controller
    control={control}
    name="employeeId"
    render={({ field }) => (
      <select value={field.value || ''} onChange={field.onChange}>
        <option value="">Select employee</option>
        {filteredEmployees.map((employee) => (
          <option key={employee.id} value={employee.id}>
            {employee.name}
          </option>
        ))}
      </select>
    )}
  />

  <span className="error-text">{errors.employeeId?.message}</span>
</div>
      <div className="form-group">
        <label>Status</label>
        <select {...register('status')}>
          {STATUSES.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        <span className="error-text">{errors.status?.message}</span>
      </div>
      <div className="form-group">
        <label>ETA</label>
        <input type="datetime-local" {...register('eta')} />
        <span className="error-text">{errors.eta?.message}</span>
      </div>
      <div className="full-width">
        <Controller
          control={control}
          name="referenceImages"
          render={({ field }) => <ImagePicker label="Reference images" value={field.value} onChange={field.onChange} multiple />}
        />
        <span className="error-text">{errors.referenceImages?.message}</span>
      </div>
      <div className="form-actions full-width">
        <button type="button" className="secondary-button" onClick={onClose}>Cancel</button>
        <button type="submit" className="primary-button" disabled={isSubmitting}>Save Task</button>
      </div>
    </form>
  );
}
