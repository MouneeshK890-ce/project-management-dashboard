import * as yup from 'yup';

export const employeeSchema = (employees = [], currentId = null) =>
  yup.object({
    name: yup.string().trim().required('Name is required'),
    position: yup.string().trim().required('Position is required'),
    email: yup
      .string()
      .trim()
      .email('Enter a valid email')
      .required('Email is required')
      .test('unique-email', 'Email already exists', (value) => {
        if (!value) return false;
        return !employees.some((employee) => employee.email.toLowerCase() === value.toLowerCase() && employee.id !== currentId);
      }),
    image: yup.string().trim().required('Profile image is required'),
  });

export const projectSchema = yup.object({
  title: yup.string().trim().required('Title is required'),
  description: yup.string().trim().required('Description is required'),
  logo: yup.string().trim().required('Project logo is required'),
  startDate: yup.string().required('Start date is required'),
  endDate: yup
    .string()
    .required('End date is required')
    .test('date-order', 'Start date must be before end date', function validate(endDate) {
      const { startDate } = this.parent;
      return new Date(startDate) < new Date(endDate);
    }),
  employeeIds: yup.array().min(1, 'Assign at least one employee').required('Assign employees'),
});

export const taskSchema = (projects = []) =>
  yup.object({
    title: yup.string().trim().required('Title is required'),
    description: yup.string().trim().required('Description is required'),
    projectId: yup.string().required('Project is required'),
    employeeId: yup
      .string()
      .required('Assigned employee is required')
      .test('employee-belongs-project', 'Employee must belong to selected project', function validate(employeeId) {
        const project = projects.find((item) => item.id === this.parent.projectId);
        return Boolean(project?.employeeIds?.includes(employeeId));
      }),
    eta: yup.string().required('ETA is required'),
    referenceImages: yup.array().min(1, 'Add at least one image').required(),
    status: yup.string().required('Status is required'),
  });
