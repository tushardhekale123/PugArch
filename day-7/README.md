# Day 7 — Next.js + Node.js Employee Management System

## 1. Project Overview

This project demonstrates modern React application development using Next.js and backend API development using Node.js and Express.js.

The application provides an Employee Management Dashboard where users can view, search, add, edit, and delete employee records through REST APIs.

## 2. Objectives

* Understand Next.js App Router.
* Learn pages, layouts, and dynamic routing.
* Build REST APIs using Node.js and Express.js.
* Implement GET, POST, PUT, and DELETE endpoints.
* Understand controllers, services, models, and middleware.
* Implement basic input validation and error handling.
* Prepare the application for deployment.

## 3. Technologies Used

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* HTML

### Backend

* Node.js
* Express.js
* JavaScript
* REST APIs
* CORS
* Environment variables

## 4. Project Structure

```text
day-7/
├── nextjs-app/
│   ├── public/
│   ├── src/
│   │   └── app/
│   │       ├── page.tsx
│   │       ├── layout.tsx
│   │       └── globals.css
│   ├── package.json
│   ├── next.config.ts
│   └── tsconfig.json
│
├── node-api/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## 5. Features

* Employee dashboard
* Display total employee count
* Display department count
* Calculate total employee salary
* Search employees by name, email, or department
* Add new employees
* Edit employee details
* Delete employee records
* REST API integration
* Basic input validation
* Error messages for failed requests

## 6. REST API Endpoints

| Method | Endpoint             | Description                |
| ------ | -------------------- | -------------------------- |
| GET    | `/api/employees`     | Retrieve all employees     |
| GET    | `/api/employees/:id` | Retrieve an employee by ID |
| POST   | `/api/employees`     | Create an employee         |
| PUT    | `/api/employees/:id` | Update an employee         |
| DELETE | `/api/employees/:id` | Delete an employee         |

## 7. Installation and Setup

### Prerequisites

* Node.js
* npm
* Visual Studio Code

### Start the Backend

Open a terminal and navigate to the backend directory:

```bash
cd node-api
npm install
npm run dev
```

The backend runs at:

`http://localhost:5000`

Test the employee API:

`http://localhost:5000/api/employees`

### Start the Frontend

Open a separate terminal and navigate to the frontend directory:

```bash
cd nextjs-app
npm install
npm run dev
```

Open the application at:

`http://localhost:3000`

## 8. Environment Variables

The frontend uses the `NEXT_PUBLIC_API_URL` environment variable to configure the employee API endpoint.

For local development, create a `.env.local` file inside `nextjs-app/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/employees
```

For production deployment, set this variable to the deployed backend API URL in the hosting platform's environment settings.

Do not commit private credentials or secret environment files to GitHub.

## 9. Testing

The following checks should be performed:

* Start the backend server.
* Verify that the employee API returns JSON data.
* Start the Next.js frontend.
* Verify that the dashboard loads.
* Test employee search.
* Test adding an employee.
* Test editing an employee.
* Test deleting an employee.
* Run the production build:

```bash
npm run build
```

## 10. Deployment Plan

The frontend is designed to be deployed on Vercel.

Before production deployment:

* Deploy the backend to a suitable Node.js hosting platform or configure a compatible serverless architecture.
* Configure the frontend API URL.
* Configure CORS for the deployed frontend origin.
* Use a persistent database for employee records.
* Test all CRUD operations on the deployed application.

## 11. Current Limitations

* Employee records are currently stored in server memory.
* Data changes may be lost when the backend restarts.
* A persistent database is not yet configured.
* Production API hosting and environment variables must be configured before deployment.

## 12. Learning Outcomes

This project provides practical experience with Next.js, TypeScript, Express.js, REST API development, CRUD operations, input validation, error handling, and deployment preparation.

## 13. Conclusion

The Day 7 project demonstrates the integration of a Next.js frontend with a Node.js and Express.js backend for employee management. It provides a foundation for further improvements, including persistent database integration and production deployment.
