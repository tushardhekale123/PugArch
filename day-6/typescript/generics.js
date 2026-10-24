"use strict";
// Day 6: TypeScript Generics
// 1. Generic Function
function getValue(value) {
    return value;
}
console.log("String:", getValue("Hello TypeScript"));
console.log("Number:", getValue(100));
console.log("Boolean:", getValue(true));
// 2. Generic Array Function
function displayItems(items) {
    items.forEach((item) => {
        console.log(item);
    });
}
console.log("\nEmployee Names:");
displayItems(["Rahul", "Priya", "Amit"]);
console.log("\nEmployee IDs:");
displayItems([101, 102, 103]);
const employeeResponse = {
    success: true,
    data: ["Rahul", "Priya", "Amit"]
};
console.log("\nAPI Response:");
console.log(employeeResponse);
// 4. Generic Class
class Box {
    value;
    constructor(value) {
        this.value = value;
    }
    getValue() {
        return this.value;
    }
}
const nameBox = new Box("Tushar");
const salaryBox = new Box(30000);
console.log("\nName Box:", nameBox.getValue());
console.log("Salary Box:", salaryBox.getValue());
