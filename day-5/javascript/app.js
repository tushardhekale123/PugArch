
const DATA_URL = "../employee-dashboard/employees.json";

const tableBody = document.getElementById("employeeTableBody");
const searchInput = document.getElementById("searchInput");
const departmentFilter = document.getElementById("departmentFilter");
const sortSelect = document.getElementById("sortSelect");
const message = document.getElementById("message");

const dialog = document.getElementById("employeeDialog");
const form = document.getElementById("employeeForm");

let employees = [];
let nextId = 1;

async function loadEmployees() {
    message.textContent = "Loading employees...";

    try {
        const response = await fetch(DATA_URL);

        if (!response.ok) {
            throw new Error(`Could not load employee data (${response.status})`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error("Employee JSON must contain an array.");
        }

        employees = data;
        nextId = Math.max(0, ...employees.map(employee => Number(employee.id) || 0)) + 1;

        populateDepartments();
        renderEmployees();
    } catch (error) {
        console.error(error);
        message.textContent =
            "Unable to load employees. Run this project using VS Code Live Server and check the JSON file path.";
    }
}

function populateDepartments() {
    const currentValue = departmentFilter.value;

    const departments = [...new Set(
        employees.map(employee => employee.department).filter(Boolean)
    )].sort();

    departmentFilter.replaceChildren(new Option("All Departments", ""));

    departments.forEach(department => {
        departmentFilter.add(new Option(department, department));
    });

    departmentFilter.value = currentValue;
}

function updateStats() {
    document.getElementById("totalEmployees").textContent = employees.length;

    document.getElementById("activeEmployees").textContent =
        employees.filter(employee => employee.status === "Active").length;

    document.getElementById("totalDepartments").textContent =
        new Set(employees.map(employee => employee.department)).size;
}

function getVisibleEmployees() {
    const query = searchInput.value.trim().toLowerCase();
    const department = departmentFilter.value;

    let result = employees.filter(employee => {
        const searchable = [
            employee.name,
            employee.email,
            employee.role,
            employee.department
        ].join(" ").toLowerCase();

        return searchable.includes(query) &&
            (!department || employee.department === department);
    });

    const sortBy = sortSelect.value;

    result.sort((a, b) => {
        if (sortBy === "name-asc") {
            return a.name.localeCompare(b.name);
        }

        if (sortBy === "name-desc") {
            return b.name.localeCompare(a.name);
        }

        if (sortBy === "salary-asc") {
            return Number(a.salary) - Number(b.salary);
        }

        if (sortBy === "salary-desc") {
            return Number(b.salary) - Number(a.salary);
        }

        return 0;
    });

    return result;
}

function createCell(text) {
    const cell = document.createElement("td");
    cell.textContent = text ?? "";
    return cell;
}

function renderEmployees() {
    updateStats();
    tableBody.replaceChildren();

    const visibleEmployees = getVisibleEmployees();

    if (visibleEmployees.length === 0) {
        const row = document.createElement("tr");
        const cell = createCell("No employees found.");
        cell.colSpan = 6;
        row.appendChild(cell);
        tableBody.appendChild(row);
        message.textContent = "Try changing your search or filter.";
        return;
    }

    visibleEmployees.forEach(employee => {
        const row = document.createElement("tr");

        const employeeCell = document.createElement("td");
        const name = document.createElement("span");
        name.className = "employee-name";
        name.textContent = employee.name;

        const email = document.createElement("span");
        email.className = "employee-email";
        email.textContent = employee.email;

        employeeCell.append(name, email);
        row.appendChild(employeeCell);

        row.appendChild(createCell(employee.department));
        row.appendChild(createCell(employee.role));
        row.appendChild(createCell(
            `₹${Number(employee.salary).toLocaleString("en-IN")}`
        ));

        const statusCell = document.createElement("td");
        const badge = document.createElement("span");
        badge.className = `badge ${
            employee.status === "Active" ? "active" : "inactive"
        }`;
        badge.textContent = employee.status;
        statusCell.appendChild(badge);
        row.appendChild(statusCell);

        const actionsCell = document.createElement("td");

        const detailsButton = document.createElement("button");
        detailsButton.className = "action-btn";
        detailsButton.textContent = "Details";
        detailsButton.addEventListener("click", () => showDetails(employee));

        const editButton = document.createElement("button");
        editButton.className = "action-btn";
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => openEditDialog(employee));

        const deleteButton = document.createElement("button");
        deleteButton.className = "action-btn delete-btn";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteEmployee(employee.id));

        actionsCell.append(detailsButton, editButton, deleteButton);
        row.appendChild(actionsCell);

        tableBody.appendChild(row);
    });

    message.textContent = `Showing ${visibleEmployees.length} of ${employees.length} employees.`;
}

function showDetails(employee) {
    alert(
        `Employee Details\n\n` +
        `Name: ${employee.name}\n` +
        `Email: ${employee.email}\n` +
        `Department: ${employee.department}\n` +
        `Role: ${employee.role}\n` +
        `Salary: ₹${Number(employee.salary).toLocaleString("en-IN")}\n` +
        `Status: ${employee.status}`
    );
}

function openAddDialog() {
    form.reset();
    document.getElementById("employeeId").value = "";
    document.getElementById("dialogTitle").textContent = "Add Employee";
    dialog.showModal();
}

function openEditDialog(employee) {
    document.getElementById("employeeId").value = employee.id;
    document.getElementById("name").value = employee.name;
    document.getElementById("email").value = employee.email;
    document.getElementById("department").value = employee.department;
    document.getElementById("role").value = employee.role;
    document.getElementById("salary").value = employee.salary;
    document.getElementById("status").value = employee.status;

    document.getElementById("dialogTitle").textContent = "Edit Employee";
    dialog.showModal();
}

function deleteEmployee(id) {
    const employee = employees.find(item => item.id === id);
    if (!employee) return;

    if (!confirm(`Delete ${employee.name}?`)) return;

    employees = employees.filter(item => item.id !== id);
    populateDepartments();
    renderEmployees();
}

form.addEventListener("submit", event => {
    event.preventDefault();

    const idValue = document.getElementById("employeeId").value;

    const employeeData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        department: document.getElementById("department").value,
        role: document.getElementById("role").value.trim(),
        salary: Number(document.getElementById("salary").value),
        status: document.getElementById("status").value
    };

    if (!employeeData.name || !employeeData.email || !employeeData.role) {
        alert("Please fill in all required fields.");
        return;
    }

    if (!Number.isFinite(employeeData.salary) || employeeData.salary < 0) {
        alert("Please enter a valid salary.");
        return;
    }

    if (idValue) {
        const index = employees.findIndex(
            employee => String(employee.id) === idValue
        );

        if (index !== -1) {
            employees[index] = {
                ...employees[index],
                ...employeeData
            };
        }
    } else {
        employees.push({
            id: nextId++,
            ...employeeData
        });
    }

    dialog.close();
    populateDepartments();
    renderEmployees();
});

document.getElementById("addEmployeeBtn")
    .addEventListener("click", openAddDialog);

document.getElementById("closeDialogBtn")
    .addEventListener("click", () => dialog.close());

searchInput.addEventListener("input", renderEmployees);
departmentFilter.addEventListener("change", renderEmployees);
sortSelect.addEventListener("change", renderEmployees);

loadEmployees();

