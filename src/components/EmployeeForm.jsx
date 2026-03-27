import { useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { employeeSchema } from '../utils/validation';
import ImagePicker from './ImagePicker';

export default function EmployeeForm({ initialValues, onSubmit, onClose }) {
  const employees = useSelector((state) => state.employees.items);
  const schema = useMemo(() => employeeSchema(employees, initialValues?.id), [employees, initialValues?.id]);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: initialValues?.name || '',
      position: initialValues?.position || '',
      email: initialValues?.email || '',
      image: initialValues?.image || '',
    },
  });

  return (
    <form className="form-grid" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label>Name</label>
        <input {...register('name')} placeholder="Enter employee name" />
        <span className="error-text">{errors.name?.message}</span>
      </div>
      <div className="form-group">
        <label>Position</label>
        <input {...register('position')} placeholder="Enter position" />
        <span className="error-text">{errors.position?.message}</span>
      </div>
      <div className="form-group full-width">
        <label>Official Email</label>
        <input {...register('email')} placeholder="Enter official email" />
        <span className="error-text">{errors.email?.message}</span>
      </div>
      <div className="full-width">
        <Controller
          control={control}
          name="image"
          render={({ field }) => <ImagePicker label="Profile image" value={field.value} onChange={field.onChange} />}
        />
        <span className="error-text">{errors.image?.message}</span>
      </div>
      <div className="form-actions full-width">
        <button type="button" className="secondary-button" onClick={onClose}>Cancel</button>
        <button type="submit" className="primary-button" disabled={isSubmitting}>Save Employee</button>
      </div>
    </form>
  );
}
