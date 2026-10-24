
// Day 6: TypeScript Generics

// 1. Generic Function
function getValue<T>(value: T): T {
  return value;
}

console.log("String:", getValue<string>("Hello TypeScript"));
console.log("Number:", getValue<number>(100));
console.log("Boolean:", getValue<boolean>(true));

// 2. Generic Array Function
function displayItems<T>(items: T[]): void {
  items.forEach((item) => {
    console.log(item);
  });
}

console.log("\nEmployee Names:");
displayItems<string>(["Rahul", "Priya", "Amit"]);

console.log("\nEmployee IDs:");
displayItems<number>([101, 102, 103]);

// 3. Generic Interface
interface ApiResponse<T> {
  success: boolean;
  data: T;
}

const employeeResponse: ApiResponse<string[]> = {
  success: true,
  data: ["Rahul", "Priya", "Amit"]
};

console.log("\nAPI Response:");
console.log(employeeResponse);

// 4. Generic Class
class Box<T> {
  constructor(public value: T) {}

  getValue(): T {
    return this.value;
  }
}

const nameBox = new Box<string>("Tushar");
const salaryBox = new Box<number>(30000);

console.log("\nName Box:", nameBox.getValue());
console.log("Salary Box:", salaryBox.getValue());

