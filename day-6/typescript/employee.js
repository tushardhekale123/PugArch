"use strict";
// Day 6: Employee Management using TypeScript
// Employee data
const employees = [
    {
        id: 1,
        name: "Rahul",
        department: "IT",
        salary: 30000,
        isActive: true
    },
    {
        id: 2,
        name: "Priya",
        department: "HR",
        salary: 35000,
        isActive: true
    },
    {
        id: 3,
        name: "Amit",
        department: "Finance",
        salary: 28000,
        isActive: false
    }
];
// Display all employees
function displayEmployees(list) {
    console.log("\n--- Employee List ---");
    list.forEach((employee) => {
        console.log(`ID: ${employee.id} | Name: ${employee.name} | Department: ${employee.department} | Salary: ₹${employee.salary}`);
    });
}
// Search employee by name
function searchEmployee(name) {
    return employees.filter((employee) => employee.name.toLowerCase().includes(name.toLowerCase()));
}
// Calculate average salary
function calculateAverageSalary(list) {
    if (list.length === 0) {
        return 0;
    }
    const totalSalary = list.reduce((total, employee) => total + employee.salary, 0);
    return totalSalary / list.length;
}
// Display active employees
function displayActiveEmployees() {
    const activeEmployees = employees.filter((employee) => employee.isActive);
    console.log("\n--- Active Employees ---");
    displayEmployees(activeEmployees);
}
// Run program
displayEmployees(employees);
console.log("\n--- Search Result: Rahul ---");
console.log(searchEmployee("Rahul"));
console.log("\nAverage Salary: ₹", calculateAverageSalary(employees));
displayActiveEmployees();
