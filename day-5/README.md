# Day 5 — JavaScript Employee Dashboard

## Objective

Learn modern JavaScript and understand asynchronous programming and APIs.

## Project Overview

The Employee Management Dashboard is a web application built using HTML, CSS, and modern JavaScript. It loads employee records from a JSON file and provides tools to search, filter, sort, view, add, edit, and delete employees.

## Features

* Display employee records in a table.
* Search by employee name, email, role, or department.
* Filter employees by department.
* Sort by name and salary.
* View employee details.
* Add new employees.
* Edit existing employee information.
* Delete employees after confirmation.
* Display employee and department statistics.

## Technologies Used

* HTML5
* CSS3
* JavaScript (ES6+)
* JSON
* Fetch API
* Async/await
* DOM manipulation

## Project Structure

```text
day-5/
├── javascript/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── employee-dashboard/
│   └── employees.json
└── README.md
```

## How to Run

1. Open the `day-5` folder in VS Code.
2. Open `javascript/index.html`.
3. Run the file using the VS Code Live Server extension.
4. Search, filter, sort, and manage the sample employee records.

## Learning Outcomes

* Modern JavaScript syntax and functions.
* Array methods and sorting.
* DOM manipulation and event handling.
* Fetch API and asynchronous JavaScript.
* Working with JSON data.
* Form validation and CRUD-style UI operations.

## Limitations

Employee additions, edits, and deletions currently exist only in browser memory. They reset when the page is refreshed. Persistent storage or a backend API would be needed to save changes permanently.

## Conclusion

This project demonstrates modern JavaScript concepts through an interactive employee dashboard that loads JSON data and supports common employee-management operations.
