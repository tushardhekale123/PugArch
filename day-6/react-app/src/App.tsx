
import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import {
  Users,
  UserCheck,
  Building2,
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  Wallet,
} from "lucide-react";
import "./App.css";

type Department =
  | "Engineering"
  | "HR"
  | "Finance"
  | "Marketing"
  | "Sales"
  | "Operations";

type EmployeeStatus = "Active" | "Inactive";

interface Employee {
  id: number;
  name: string;
  email: string;
  department: Department;
  role: string;
  salary: number;
  status: EmployeeStatus;
}

const STORAGE_KEY = "employeehub-employees";

const initialEmployees: Employee[] = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav@example.com",
    department: "Engineering",
    role: "Frontend Developer",
    salary: 45000,
    status: "Active",
  },
  {
    id: 2,
    name: "Priya Patil",
    email: "priya@example.com",
    department: "HR",
    role: "HR Executive",
    salary: 35000,
    status: "Active",
  },
  {
    id: 3,
    name: "Rohan Deshmukh",
    email: "rohan@example.com",
    department: "Engineering",
    role: "Backend Developer",
    salary: 55000,
    status: "Active",
  },
  {
    id: 4,
    name: "Sneha Kulkarni",
    email: "sneha@example.com",
    department: "Finance",
    role: "Accountant",
    salary: 40000,
    status: "Inactive",
  },
  {
    id: 5,
    name: "Aditya Joshi",
    email: "aditya@example.com",
    department: "Marketing",
    role: "Marketing Executive",
    salary: 38000,
    status: "Active",
  },
  {
    id: 6,
    name: "Neha Shinde",
    email: "neha@example.com",
    department: "Engineering",
    role: "QA Engineer",
    salary: 42000,
    status: "Active",
  },
  {
    id: 7,
    name: "Kunal More",
    email: "kunal@example.com",
    department: "Sales",
    role: "Sales Executive",
    salary: 32000,
    status: "Inactive",
  },
  {
    id: 8,
    name: "Pooja Pawar",
    email: "pooja@example.com",
    department: "HR",
    role: "Recruiter",
    salary: 36000,
    status: "Active",
  },
];

const departments: Department[] = [
  "Engineering",
  "HR",
  "Finance",
  "Marketing",
  "Sales",
  "Operations",
];

const emptyEmployee: Omit<Employee, "id"> = {
  name: "",
  email: "",
  department: "Engineering",
  role: "",
  salary: 0,
  status: "Active",
};

function loadSavedEmployees(): Employee[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved !== null) {
      const parsed: unknown = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        return parsed as Employee[];
      }
    }
  } catch (error) {
    console.error("Unable to load saved employees:", error);
  }

  return initialEmployees;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function App() {
  const [employees, setEmployees] =
    useState<Employee[]>(loadSavedEmployees);

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name-asc");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] =
    useState<Omit<Employee, "id">>(emptyEmployee);

  const [error, setError] = useState("");

  // Save employee data in browser storage.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
    } catch (storageError) {
      console.error("Unable to save employees:", storageError);
    }
  }, [employees]);

  // Search, filter and sort employees.
  const visibleEmployees = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = employees.filter((employee) => {
      const searchableText = [
        employee.name,
        employee.email,
        employee.role,
        employee.department,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(query);

      const matchesDepartment =
        departmentFilter === "All" ||
        employee.department === departmentFilter;

      const matchesStatus =
        statusFilter === "All" ||
        employee.status === statusFilter;

      return matchesSearch && matchesDepartment && matchesStatus;
    });

    return result.sort((a, b) => {
      switch (sortBy) {
        case "name-desc":
          return b.name.localeCompare(a.name);

        case "salary-asc":
          return a.salary - b.salary;

        case "salary-desc":
          return b.salary - a.salary;

        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [employees, search, departmentFilter, statusFilter, sortBy]);

  const activeCount = employees.filter(
    (employee) => employee.status === "Active"
  ).length;

  const averageSalary =
    employees.length > 0
      ? employees.reduce(
          (total, employee) => total + employee.salary,
          0
        ) / employees.length
      : 0;

  const departmentCount = new Set(
    employees.map((employee) => employee.department)
  ).size;

  function openAddForm() {
    setEditingId(null);
    setFormData({ ...emptyEmployee });
    setError("");
    setShowForm(true);
  }

  function openEditForm(employee: Employee) {
    setEditingId(employee.id);

    setFormData({
      name: employee.name,
      email: employee.email,
      department: employee.department,
      role: employee.role,
      salary: employee.salary,
      status: employee.status,
    });

    setError("");
    setShowForm(true);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const role = formData.role.trim();

    if (!name || !email || !role) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (
      !Number.isFinite(formData.salary) ||
      formData.salary < 0
    ) {
      setError("Please enter a valid salary.");
      return;
    }

    const normalizedEmail = email.toLowerCase();

    const duplicateEmail = employees.some(
      (employee) =>
        employee.email.toLowerCase() === normalizedEmail &&
        employee.id !== editingId
    );

    if (duplicateEmail) {
      setError("This email address already exists.");
      return;
    }

    const updatedEmployee = {
      ...formData,
      name,
      email,
      role,
    };

    if (editingId !== null) {
      setEmployees((current) =>
        current.map((employee) =>
          employee.id === editingId
            ? { ...updatedEmployee, id: editingId }
            : employee
        )
      );
    } else {
      const newEmployee: Employee = {
        ...updatedEmployee,
        id:
          Math.max(
            0,
            ...employees.map((employee) => employee.id)
          ) + 1,
      };

      setEmployees((current) => [...current, newEmployee]);
    }

    setShowForm(false);
    setError("");
  }

  function deleteEmployee(employee: Employee) {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${employee.name}?`
    );

    if (!confirmed) return;

    setEmployees((current) =>
      current.filter((item) => item.id !== employee.id)
    );
  }

  function showDetails(employee: Employee) {
    window.alert(
      `Employee Details\n\n` +
        `Name: ${employee.name}\n` +
        `Email: ${employee.email}\n` +
        `Department: ${employee.department}\n` +
        `Role: ${employee.role}\n` +
        `Salary: ${formatCurrency(employee.salary)}\n` +
        `Status: ${employee.status}`
    );
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">EH</div>

          <div>
            <h2>EmployeeHub</h2>
            <p>Management Portal</p>
          </div>
        </div>

        <p className="nav-label">WORKSPACE</p>

        <div className="nav-item active">
          <Building2 size={19} />
          <span>Dashboard</span>
        </div>

        <div className="nav-item">
          <Users size={19} />
          <span>Employees</span>
        </div>

        <div className="nav-item">
          <Wallet size={19} />
          <span>Salary Overview</span>
        </div>

        <div className="sidebar-footer">
          <div className="avatar">A</div>

          <div>
            <strong>Administrator</strong>
            <p>HR Manager</p>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="page-header">
          <div>
            <p className="breadcrumb">Workspace / Dashboard</p>
            <h1>Employee Dashboard</h1>

            <p className="subtitle">
              Manage your team, track employees and view workforce statistics.
            </p>
          </div>

          <button
            className="primary-button"
            onClick={openAddForm}
          >
            <Plus size={18} />
            Add Employee
          </button>
        </header>

        <section className="welcome-banner">
          <div>
            <span className="eyebrow">TEAM OVERVIEW</span>
            <h2>Welcome back, Admin!</h2>

            <p>
              Everything you need to manage your employees in one place.
            </p>
          </div>

          <div className="welcome-icon">
            <Building2 size={66} />
          </div>
        </section>

        <section className="stats-grid">
          <article className="stat-card">
            <div className="stat-top">
              <span>Total Employees</span>
              <div className="stat-icon blue">
                <Users size={21} />
              </div>
            </div>

            <h2>{employees.length}</h2>
            <p>All registered employees</p>
          </article>

          <article className="stat-card">
            <div className="stat-top">
              <span>Active Employees</span>
              <div className="stat-icon green">
                <UserCheck size={21} />
              </div>
            </div>

            <h2>{activeCount}</h2>
            <p>Currently active team members</p>
          </article>

          <article className="stat-card">
            <div className="stat-top">
              <span>Average Salary</span>
              <div className="stat-icon orange">
                <Wallet size={21} />
              </div>
            </div>

            <h2>{formatCurrency(averageSalary)}</h2>
            <p>Average monthly salary</p>
          </article>

          <article className="stat-card">
            <div className="stat-top">
              <span>Departments</span>
              <div className="stat-icon purple">
                <Building2 size={21} />
              </div>
            </div>

            <h2>{departmentCount}</h2>
            <p>Departments represented</p>
          </article>
        </section>

        <section className="employee-panel">
          <div className="panel-heading">
            <div>
              <h2>Employee Directory</h2>
              <p>Search, filter, sort and manage your employees.</p>
            </div>

            <span className="record-count">
              {visibleEmployees.length} records
            </span>
          </div>

          <div className="filters">
            <div className="search-box">
              <Search size={18} />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search name, email or role..."
                aria-label="Search employees"
              />
            </div>

            <select
              value={departmentFilter}
              onChange={(event) =>
                setDepartmentFilter(event.target.value)
              }
              aria-label="Filter by department"
            >
              <option value="All">All Departments</option>

              {departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              aria-label="Filter by status"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              aria-label="Sort employees"
            >
              <option value="name-asc">Name: A–Z</option>
              <option value="name-desc">Name: Z–A</option>
              <option value="salary-asc">Salary: Low–High</option>
              <option value="salary-desc">Salary: High–Low</option>
            </select>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>EMPLOYEE</th>
                  <th>DEPARTMENT</th>
                  <th>ROLE</th>
                  <th>SALARY</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {visibleEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td>
                      <div className="employee-cell">
                        <div className="employee-avatar">
                          {employee.name.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <strong>{employee.name}</strong>
                          <span>{employee.email}</span>
                        </div>
                      </div>
                    </td>

                    <td>{employee.department}</td>
                    <td>{employee.role}</td>

                    <td className="salary">
                      {formatCurrency(employee.salary)}
                    </td>

                    <td>
                      <span
                        className={`status-badge ${
                          employee.status === "Active"
                            ? "status-active"
                            : "status-inactive"
                        }`}
                      >
                        {employee.status}
                      </span>
                    </td>

                    <td>
                      <div className="actions">
                        <button
                          className="icon-button"
                          title="View details"
                          aria-label={`View ${employee.name}`}
                          onClick={() => showDetails(employee)}
                        >
                          <Search size={16} />
                        </button>

                        <button
                          className="icon-button"
                          title="Edit employee"
                          aria-label={`Edit ${employee.name}`}
                          onClick={() => openEditForm(employee)}
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          className="icon-button delete-action"
                          title="Delete employee"
                          aria-label={`Delete ${employee.name}`}
                          onClick={() => deleteEmployee(employee)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {visibleEmployees.length === 0 && (
              <div className="empty-state">
                <Users size={32} />
                <h3>No employees found</h3>
                <p>Try another search or add a new employee.</p>
              </div>
            )}
          </div>
        </section>

        <footer className="page-footer">
          EmployeeHub · Day 6 TypeScript + React Training Project
        </footer>
      </main>

      {showForm && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowForm(false);
            }
          }}
        >
          <section
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="form-title"
          >
            <div className="modal-heading">
              <div>
                <h2 id="form-title">
                  {editingId !== null ? "Edit Employee" : "Add Employee"}
                </h2>

                <p>Enter the employee information below.</p>
              </div>

              <button
                className="icon-button"
                aria-label="Close form"
                onClick={() => setShowForm(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="employee-form"
              noValidate
            >
              <label>
                Full Name
                <input
                  required
                  value={formData.name}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      name: event.target.value,
                    })
                  }
                  placeholder="Enter full name"
                />
              </label>

              <label>
                Email Address
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      email: event.target.value,
                    })
                  }
                  placeholder="name@example.com"
                />
              </label>

              <label>
                Department
                <select
                  value={formData.department}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      department: event.target.value as Department,
                    })
                  }
                >
                  {departments.map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Job Role
                <input
                  required
                  value={formData.role}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      role: event.target.value,
                    })
                  }
                  placeholder="Enter job role"
                />
              </label>

              <label>
                Monthly Salary (₹)
                <input
                  required
                  type="number"
                  min="0"
                  value={formData.salary}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      salary: Number(event.target.value),
                    })
                  }
                />
              </label>

              <label>
                Employment Status
                <select
                  value={formData.status}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      status: event.target.value as EmployeeStatus,
                    })
                  }
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </label>

              {error && <p className="form-error">{error}</p>}

              <div className="form-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="primary-button">
                  {editingId !== null ? "Save Changes" : "Add Employee"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;

