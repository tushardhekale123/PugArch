# Day 9 — Angular + TypeScript + API Integration

## Objective

Build an Angular application demonstrating Angular, TypeScript, and REST API integration skills for future Ionic mobile development.

## Project

Facility Inspection Dashboard

## Technologies Used

* Angular
* TypeScript
* HTML
* CSS
* REST API
* RxJS
* LocalStorage

## Features

* Dashboard metrics
* Facility listing
* Search and status filtering
* REST API integration using Angular HTTP Client
* Loading indicator and error handling
* Facility inspection form
* Inspection history stored in browser LocalStorage
* TypeScript interfaces and models
* Responsive dashboard layout

## How to Run

1. Open the `angular-app` directory.

2. Install dependencies:

   `npm install`

3. Start the development server:

   `npm start`

4. Open `http://localhost:4200` or the port displayed in the terminal.

## API Information

The project uses JSONPlaceholder as a public demo API. The response is transformed into sample facility records for demonstration purposes.

## Storage

Inspection history is stored in browser LocalStorage. It is not saved to a backend database.

## Project Structure

```text
day-9/
├── angular-app/
├── api-integration/
└── README.md
```

## Future Improvements

* Connect a dedicated facility management API.
* Store inspection records in a backend database.
* Add authentication and role-based access.
* Add inspection history filters and reports.
