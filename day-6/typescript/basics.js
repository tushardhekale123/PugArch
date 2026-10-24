"use strict";
// Day 6: TypeScript Basics
// 1. Variables and Data Types
let name = "Tushar";
let age = 22;
let isStudent = true;
console.log("Name:", name);
console.log("Age:", age);
console.log("Student:", isStudent);
// 2. Array
let skills = ["TypeScript", "React", "JavaScript"];
console.log("Skills:", skills);
// 4. Create an Employee Object
let employee = {
    id: 101,
    name: "Rahul",
    department: "IT",
    salary: 30000
};
console.log("Employee Details:", employee);
// 5. Function with Types
function add(a, b) {
    return a + b;
}
console.log("Addition:", add(10, 20));
// 6. Union Type
let status = "Active";
console.log("Employee Status:", status);
// 7. Function with Interface
function displayEmployee(emp) {
    console.log("ID:", emp.id);
    console.log("Name:", emp.name);
    console.log("Department:", emp.department);
    console.log("Salary:", emp.salary);
}
displayEmployee(employee);
