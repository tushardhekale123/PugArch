
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Temporary employee data
let employees = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    department: "IT",
    salary: 30000,
  },
  {
    id: 2,
    name: "Priya Patil",
    email: "priya@example.com",
    department: "HR",
    salary: 35000,
  },
  {
    id: 3,
    name: "Amit Verma",
    email: "amit@example.com",
    department: "Finance",
    salary: 40000,
  },
];

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Day 7 Employee API is running!" });
});

// GET all employees
app.get("/api/employees", (req, res) => {
  res.json(employees);
});

// GET employee by ID
app.get("/api/employees/:id", (req, res) => {
  const employee = employees.find(
    (item) => item.id === Number(req.params.id)
  );

  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }

  res.json(employee);
});

// POST create employee
app.post("/api/employees", (req, res) => {
  const { name, email, department, salary } = req.body;

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof email !== "string" ||
    !email.includes("@") ||
    typeof department !== "string" ||
    !department.trim() ||
    !Number.isFinite(Number(salary)) ||
    Number(salary) <= 0
  ) {
    return res.status(400).json({
      message: "Enter valid name, email, department and salary",
    });
  }

  const employee = {
    id: Date.now(),
    name: name.trim(),
    email: email.trim(),
    department: department.trim(),
    salary: Number(salary),
  };

  employees.push(employee);
  res.status(201).json(employee);
});

// PUT update employee
app.put("/api/employees/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = employees.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Employee not found" });
  }

  const { name, email, department, salary } = req.body;

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof email !== "string" ||
    !email.includes("@") ||
    typeof department !== "string" ||
    !department.trim() ||
    !Number.isFinite(Number(salary)) ||
    Number(salary) <= 0
  ) {
    return res.status(400).json({
      message: "Enter valid employee details",
    });
  }

  employees[index] = {
    id,
    name: name.trim(),
    email: email.trim(),
    department: department.trim(),
    salary: Number(salary),
  };

  res.json(employees[index]);
});

// DELETE employee
app.delete("/api/employees/:id", (req, res) => {
  const id = Number(req.params.id);
  const exists = employees.some((item) => item.id === id);

  if (!exists) {
    return res.status(404).json({ message: "Employee not found" });
  }

  employees = employees.filter((item) => item.id !== id);

  res.json({ message: "Employee deleted successfully" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// General error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Employee API running at http://localhost:${PORT}`);
});

