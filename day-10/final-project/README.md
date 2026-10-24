# FacilityCare — Smart Facility Management Dashboard

## 1. Project Overview

FacilityCare is a web-based facility management application developed to monitor facility safety, manage inspections, and maintain inspection history.

The application provides a dashboard with facility statistics, safety scores, search and filtering functionality, and inspection records stored in a MySQL database.

## 2. Problem Statement

Managing facility safety manually makes it difficult to monitor safety scores, track inspections, and maintain organized records.

FacilityCare provides a centralized application for managing facilities and their safety inspections through a dashboard and REST API.

## 3. Features

* Facility safety dashboard.
* Total facilities and safety statistics.
* Facility search by name and location.
* Filter facilities by safety status.
* View facility details and safety scores.
* Create and manage inspection records through the API.
* Inspection history.
* Complaint management API.
* MySQL database integration.
* REST API with JSON responses.
* Form validation and error handling.
* Responsive user interface.

## 4. Technology Stack

### Frontend

* React.js
* JavaScript
* CSS
* Vite
* Lucide React icons

### Backend

* Node.js
* Express.js
* MySQL2
* REST API
* CORS
* dotenv

### Database

* MySQL
* MySQL Workbench

### Development Tools

* Visual Studio Code
* Git
* GitHub
* npm

## 5. Project Structure

```text
final-project/
├── backend/
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   └── .env
│
├── database/
│   ├── schema.sql
│   └── .gitkeep
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

*Note: The `.env` file contains local database credentials and must not be committed to GitHub.*

## 6. Database Design

Database name: `facility_management`

### Facilities Table

Stores information about registered facilities.

| Column       | Description                |
| ------------ | -------------------------- |
| id           | Unique facility ID         |
| name         | Facility name              |
| location     | Facility location          |
| status       | Safety status              |
| safety_score | Safety score from 0 to 100 |
| created_at   | Record creation timestamp  |

### Inspections Table

Stores facility inspection records.

| Column          | Description               |
| --------------- | ------------------------- |
| id              | Unique inspection ID      |
| facility_id     | Related facility ID       |
| inspector_name  | Name of the inspector     |
| inspection_date | Inspection date           |
| safety_score    | Inspection safety score   |
| notes           | Inspection notes          |
| status          | Inspection result         |
| created_at      | Record creation timestamp |

### Complaints Table

Stores facility-related complaints.

| Column      | Description                    |
| ----------- | ------------------------------ |
| id          | Unique complaint ID            |
| facility_id | Related facility ID            |
| title       | Complaint title                |
| description | Complaint description          |
| priority    | Low, Medium, or High           |
| status      | Open, In Progress, or Resolved |
| created_at  | Record creation timestamp      |

### Relationships

* One facility can have multiple inspections.
* One facility can have multiple complaints.
* Foreign keys connect inspections and complaints to facilities.
* Deleting a facility also deletes its related inspections and complaints.

## 7. Database Setup

1. Open MySQL Workbench.
2. Connect to your local MySQL server.
3. Open a new SQL query tab.
4. Execute the SQL statements from `database/schema.sql`.
5. Confirm that the following tables exist:

   * `facilities`
   * `inspections`
   * `complaints`

The backend initializes the required tables and inserts four sample facilities when the facilities table is empty.

## 8. Environment Variables

Create a `.env` file inside the `backend` directory.

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=facility_management
PORT=5001
```

Replace `YOUR_MYSQL_PASSWORD` with your local MySQL password.

Do not upload actual credentials to GitHub.

## 9. Installation

### Backend

Open a terminal in the backend directory.

```bash
cd backend
npm install
npm install mysql2 dotenv
```

### Frontend

Open another terminal in the frontend directory.

```bash
cd frontend
npm install
npm install lucide-react
```

## 10. How to Run

### Start the Backend

From the `backend` directory, run:

```bash
npm run dev
```

The API runs at:

```text
http://localhost:5001
```

### Start the Frontend

From the `frontend` directory, run:

```bash
npm run dev
```

Open the local URL displayed by Vite, usually:

```text
http://localhost:5173
```

Keep both terminals running while using the application.

## 11. REST API Documentation

Base URL:

```text
http://localhost:5001/api
```

### Health Check

| Method | Endpoint  | Purpose                             |
| ------ | --------- | ----------------------------------- |
| GET    | `/health` | Check API and database connectivity |

### Facilities

| Method | Endpoint          | Purpose                 |
| ------ | ----------------- | ----------------------- |
| GET    | `/facilities`     | Retrieve all facilities |
| GET    | `/facilities/:id` | Retrieve one facility   |
| POST   | `/facilities`     | Create a facility       |
| PUT    | `/facilities/:id` | Update a facility       |
| DELETE | `/facilities/:id` | Delete a facility       |

Example facility request:

```json
{
  "name": "Training Center",
  "location": "Amravati",
  "status": "Safe",
  "score": 90
}
```

### Inspections

| Method | Endpoint       | Purpose                     |
| ------ | -------------- | --------------------------- |
| GET    | `/inspections` | Retrieve inspection history |
| POST   | `/inspections` | Create an inspection        |

Example inspection request:

```json
{
  "facility_id": 1,
  "inspector_name": "Tushar",
  "inspection_date": "2026-10-25",
  "safety_score": 85,
  "notes": "Routine safety inspection"
}
```

### Complaints

| Method | Endpoint                 | Purpose                 |
| ------ | ------------------------ | ----------------------- |
| GET    | `/complaints`            | Retrieve complaints     |
| POST   | `/complaints`            | Create a complaint      |
| PATCH  | `/complaints/:id/status` | Update complaint status |

Example complaint request:

```json
{
  "facility_id": 1,
  "title": "Fire extinguisher inspection required",
  "description": "Schedule a safety equipment inspection.",
  "priority": "High"
}
```

## 12. Validation and Error Handling

The backend includes validation for:

* Required facility name and location.
* Valid facility status.
* Safety scores between 0 and 100.
* Required inspection information.
* Valid complaint priority and status.
* Facility existence before creating related records.
* Database operation errors.

The API returns appropriate HTTP status codes for successful requests and errors.

## 13. Testing Checklist

Test the following before submitting the project:

* [ ] MySQL connection succeeds.
* [ ] Health endpoint reports successful database connectivity.
* [ ] Four sample facilities appear in the dashboard.
* [ ] Facility search works.
* [ ] Facility status filtering works.
* [ ] New inspection form opens.
* [ ] Inspection records can be saved.
* [ ] Inspection history loads from the API.
* [ ] Complaints endpoints respond correctly.
* [ ] Frontend production build succeeds.
* [ ] Backend syntax check succeeds.

## 14. Screenshots

Add screenshots of the following features before submission:

1. Main dashboard.
2. Facility overview and search.
3. Inspection form.
4. Inspection history.
5. MySQL tables in MySQL Workbench.
6. Successful API health check.

Store screenshots in a `screenshots/` directory if required.

## 15. Installation Commands Summary

Backend:

```bash
cd backend
npm install
npm run dev
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Production build:

```bash
cd frontend
npm run build
```

Backend syntax check:

```bash
cd backend
node --check index.js
```

## 16. Challenges Faced

* Connecting the frontend to a REST API.
* Configuring the Node.js backend.
* Setting up MySQL tables and relationships.
* Handling API connection errors.
* Managing inspection records.
* Configuring environment variables.

## 17. Solutions

* Used Express.js to implement REST API endpoints.
* Used MySQL2 to connect Node.js to MySQL.
* Used foreign keys to associate inspections and complaints with facilities.
* Used environment variables for database configuration.
* Added validation and error handling to API requests.
* Used React state and API calls to display dashboard data.

## 18. Future Improvements

* Add authentication and role-based access.
* Add complete facility management screens for creating, editing, and deleting records.
* Add a dedicated complaints management interface.
* Add inspection reports and downloadable PDFs.
* Add charts and advanced analytics.
* Add pagination and advanced filtering.
* Deploy the application to production hosting.
* Add automated tests.

## 19. Conclusion

FacilityCare demonstrates the development of a facility safety management application using React.js, Node.js, Express.js, REST APIs, and MySQL.

The project provides a foundation for managing facility information, recording inspections, and tracking complaints through a centralized system.

---

**Project:** FacilityCare — Smart Facility Management Dashboard
**Program:** 10-Day Intern Technical Training & Domain Assessment
**Day:** 10 — Final Project

```


### Ab jaldi se ye 3 kaam karo

1. README ko `day-10/final-project/README.md` mein save karo.
2. `backend/.env` ko GitHub par upload **mat** karna. `.gitignore` mein `.env` add hona chahiye.
3. Frontend aur backend ke tests successful hone ke baad GitHub par push karna.

**Important:** README mein API endpoints aur features document kiye gaye hain; jo features abhi UI mein nahi bane hain, unhe complete implemented features ke roop mein claim mat karna.
```
