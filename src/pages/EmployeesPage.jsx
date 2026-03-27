import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Modal";
import EmptyState from "../components/EmptyState";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeDetails from "../components/EmployeeDetails";
import {
  addEmployee,
  deleteEmployee,
  updateEmployee,
} from "../slices/employeeSlice";
import { generateId } from "../utils/helpers";
import { deleteTasksByEmployee } from "../slices/taskSlice";
import { Pen, Trash2 } from "lucide-react";

export default function EmployeesPage() {
  const employees = useSelector((state) => state.employees.items);
  const projects = useSelector((state) => state.projects.items);

  const dispatch = useDispatch();

  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = (values) => {
    if (editing) {
      dispatch(updateEmployee({ ...editing, ...values }));
    } else {
      dispatch(addEmployee({ id: generateId("emp"), ...values }));
    }
    setIsOpen(false);
    setEditing(null);
  };

  const handleDelete = (employee) => {
    const confirmDelete = window.confirm(
      `Delete "${employee.name}"? This will remove related tasks.`,
    );

    if (confirmDelete){
    dispatch(deleteTasksByEmployee(employee.id));
    dispatch(deleteEmployee(employee.id));
    }
    else{
      return;
    }
  };

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Employee Management</h1>
          <p>Create, update, and manage employee records.</p>
        </div>
        <button className="primary-button" onClick={() => setIsOpen(true)}>
          Add Employee
        </button>
      </div>

      {!employees.length ? (
        <EmptyState
          title="No employees yet"
          description="Add employees to start assigning them to projects and tasks."
        />
      ) : (
        <div className="card-grid two-cols">
          {employees.map((employee) => (
            <article className="info-card" key={employee.id}>
              <div className="employee-head">
                <img
                  src={employee.image}
                  alt={employee.name}
                  className="avatar"
                />
                <div>
                  <h3>{employee.name}</h3>
                  <p>{employee.position}</p>
                </div>
              </div>
              <div className="inline-actions">
                <button
                  className="secondary-button"
                  onClick={() => {
                    setEditing(employee);
                    setIsOpen(true);
                  }}
                >
                  <Pen size={14} />
                </button>
                <button
                  className="danger-button"
                  onClick={() => handleDelete(employee)}
                >
                  <Trash2 size={14} />
                </button>
                <button
                  className="secondary-button"
                  onClick={() => setViewing(employee)}
                >
                  View
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {isOpen && (
        <Modal
          title={editing ? "Edit Employee" : "Add Employee"}
          onClose={() => {
            setIsOpen(false);
            setEditing(null);
          }}
        >
          <EmployeeForm
            initialValues={editing}
            onSubmit={handleSave}
            onClose={() => {
              setIsOpen(false);
              setEditing(null);
            }}
          />
        </Modal>
      )}

      {viewing && (
        <Modal title="Employee Details" onClose={() => setViewing(null)}>
          <EmployeeDetails employee={viewing} projects={projects} />
        </Modal>
      )}
    </section>
  );
}
