import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { formatDateTimeForInput } from '../utils/helpers';
import { projectSchema } from '../utils/validation';
import ImagePicker from './ImagePicker';

export default function ProjectForm({ initialValues, onSubmit, onClose }) {
  const employees = useSelector((state) => state.employees.items);
  const schema = useMemo(() => projectSchema, []);

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
      logo: '',
      startDate: '',
      endDate: '',
      employeeIds: [],
    },
  });

  useEffect(() => {
  reset({
    title: initialValues?.title || '',
    description: initialValues?.description || '',
    logo: initialValues?.logo || '',
    startDate: formatDateTimeForInput(initialValues?.startDate),
    endDate: formatDateTimeForInput(initialValues?.endDate),
    employeeIds: initialValues?.employeeIds || [],
  });
}, [initialValues, reset]);

  return (
    <form className="form-grid" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group full-width">
        <label>Title</label>
        <input {...register('title')} placeholder="Project title" />
        <span className="error-text">{errors.title?.message}</span>
      </div>

      <div className="form-group">
        <label>Start date & Time</label>
        <input type="datetime-local" {...register('startDate')} />
        <span className="error-text">{errors.startDate?.message}</span>
      </div>

      <div className="form-group">
        <label>End date & Time</label>
        <input type="datetime-local" {...register('endDate')} />
        <span className="error-text">{errors.endDate?.message}</span>
      </div>

      <div className="form-group full-width">
        <label>Description</label>
        <textarea
          rows="4"
          {...register('description')}
          placeholder="Project description"
        />
        <span className="error-text">{errors.description?.message}</span>
      </div>

      <div className="full-width">
        <Controller
          control={control}
          name="logo"
          render={({ field }) => (
            <ImagePicker
              label="Project logo"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <span className="error-text">{errors.logo?.message}</span>
      </div>

      <div className="form-group full-width">
        <label>Assign Employees</label>

        <Controller
          control={control}
          name="employeeIds"
          render={({ field }) => {
            const selectedIds = field.value || [];

            const handleCheckboxChange = (employeeId) => {
              if (selectedIds.includes(employeeId)) {
                field.onChange(selectedIds.filter((id) => id !== employeeId));
              } else {
                field.onChange([...selectedIds, employeeId]);
              }
            };

            return (
              <div className="employee-checkbox-list">
                {employees.map((employee) => (
                  <label key={employee.id} className="employee-checkbox-item">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(employee.id)}
                      onChange={() => handleCheckboxChange(employee.id)}
                    />

                    <span className="employee-checkbox-custom" />

                    <span className="employee-checkbox-text">
                      <span className="employee-name">{employee.name}</span>
                      <span className="employee-position">
                        ({employee.position})
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            );
          }}
        />

        <span className="error-text">{errors.employeeIds?.message}</span>
      </div>

      <div className="form-actions full-width">
        <button
          type="button"
          className="secondary-button"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="primary-button"
          disabled={isSubmitting}
        >
          Save Project
        </button>
      </div>
    </form>
  );
}