
"use client";

import { useEffect, useState } from "react";

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  salary: number;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://pugarch-day-7-api.onrender.com/api/employees";

export default function Home() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("IT");
  const [salary, setSalary] = useState("");

  async function loadEmployees() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Employees load nahi hue.");
      }

      const data = await response.json();
      setEmployees(Array.isArray(data) ? data : data.employees ?? []);
    } catch {
      setError("Backend connect nahi hua. Port 5000 check karo.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadEmployees();
  }, []);

  async function addEmployee(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setError("");

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          department,
          salary: Number(salary),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Employee add nahi hua.");
      }

      setName("");
      setEmail("");
      setDepartment("IT");
      setSalary("");

      await loadEmployees();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error occurred.");
    }
  }

  async function editEmployee(employee: Employee) {
    const newName = window.prompt("Employee name:", employee.name);
    if (newName === null) return;

    const newEmail = window.prompt("Email:", employee.email);
    if (newEmail === null) return;

    const newDepartment = window.prompt("Department:", employee.department);
    if (newDepartment === null) return;

    const newSalary = window.prompt("Salary:", String(employee.salary));
    if (newSalary === null) return;

    try {
      setError("");

      const response = await fetch(API_URL + "/" + employee.id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName,
          email: newEmail,
          department: newDepartment,
          salary: Number(newSalary),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Employee update nahi hua.");
      }

      await loadEmployees();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed.");
    }
  }

  async function deleteEmployee(id: number) {
    if (!window.confirm("Delete this employee?")) return;

    try {
      setError("");

      const response = await fetch(API_URL + "/" + id, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Delete failed.");
      }

      await loadEmployees();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed.");
    }
  }

  const filteredEmployees = employees.filter((employee) => {
    const query = search.toLowerCase();

    return (
      employee.name.toLowerCase().includes(query) ||
      employee.email.toLowerCase().includes(query) ||
      employee.department.toLowerCase().includes(query)
    );
  });

  const totalSalary = employees.reduce(
    (total, employee) => total + Number(employee.salary),
    0
  );

  return (
    <main className="min-h-screen bg-slate-100 p-6 text-slate-900 sm:p-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-bold tracking-widest text-blue-600">
              DAY 7 · NEXT.JS + NODE.JS
            </p>
            <h1 className="mt-2 text-4xl font-bold">EmployeeHub</h1>
            <p className="mt-2 text-slate-600">
              Employee Management Dashboard
            </p>
          </div>

          <button
            onClick={() => void loadEmployees()}
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white"
          >
            Refresh Data
          </button>
        </header>

        <section className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-slate-500">Total Employees</p>
            <h2 className="mt-2 text-3xl font-bold">{employees.length}</h2>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-slate-500">Departments</p>
            <h2 className="mt-2 text-3xl font-bold">
              {new Set(employees.map((e) => e.department)).size}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-slate-500">Total Salary</p>
            <h2 className="mt-2 text-3xl font-bold">
              ₹{totalSalary.toLocaleString("en-IN")}
            </h2>
          </div>
        </section>

        {error && (
          <div className="mb-5 rounded-lg bg-red-100 p-4 text-red-700">
            {error}
          </div>
        )}

        <section className="mb-6 rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-bold">Add New Employee</h2>

          <form onSubmit={addEmployee} className="grid gap-4 md:grid-cols-2">
            <input
              className="rounded-lg border p-3"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              className="rounded-lg border p-3"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <select
              className="rounded-lg border p-3"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option>IT</option>
              <option>HR</option>
              <option>Finance</option>
              <option>Marketing</option>
              <option>Sales</option>
            </select>

            <input
              className="rounded-lg border p-3"
              type="number"
              min="1"
              placeholder="Salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
            />

            <button
              type="submit"
              className="rounded-lg bg-blue-600 p-3 font-semibold text-white md:col-span-2"
            >
              + Add Employee
            </button>
          </form>
        </section>

        <section className="rounded-xl bg-white p-6 shadow">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-xl font-bold">Employee Directory</h2>

            <input
              className="rounded-lg border p-3"
              placeholder="Search employees..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading ? (
            <p>Loading employees...</p>
          ) : filteredEmployees.length === 0 ? (
            <p className="py-6 text-slate-500">No employees found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b bg-slate-50">
                    <th className="p-3">Employee</th>
                    <th className="p-3">Department</th>
                    <th className="p-3">Salary</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredEmployees.map((employee) => (
                    <tr key={employee.id} className="border-b">
                      <td className="p-3">
                        <div className="font-semibold">{employee.name}</div>
                        <div className="text-slate-500">{employee.email}</div>
                      </td>
                      <td className="p-3">{employee.department}</td>
                      <td className="p-3">
                        ₹{Number(employee.salary).toLocaleString("en-IN")}
                      </td>
                      <td className="p-3">
                        <div className="flex gap-3">
                          <button
                            className="font-semibold text-blue-600"
                            onClick={() => void editEmployee(employee)}
                          >
                            Edit
                          </button>
                          <button
                            className="font-semibold text-red-600"
                            onClick={() => void deleteEmployee(employee.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <p className="mt-4 text-sm text-slate-500">
            Showing {filteredEmployees.length} of {employees.length} employees
          </p>
        </section>
      </div>
    </main>
  );
}

