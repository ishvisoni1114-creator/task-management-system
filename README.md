# Task Management System

A full-stack **Task Management System** developed as part of an internship assignment. The application enables users to manage tasks efficiently with secure authentication, role-based access, and CRUD operations.

## Tech Stack

### Frontend
- Angular
- TypeScript
- Angular Router
- Angular HTTP Client
- Route Guards
- HTTP Interceptors

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

---

# Project Structure

```
task-management-system/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── angular.json
│   ├── package.json
│   └── ...
│
└── README.md
```

---

# Features

## Authentication
- User Registration
- User Login
- Secure Authentication
- Role-Based Authorization

## Task Management
- Create Tasks
- View Tasks
- Update Tasks
- Delete Tasks
- Task Details

## User Management
- User Profile
- Admin User Management

## Security
- Authentication Middleware
- Route Guards
- HTTP Interceptors

---

# Installation

## Clone the repository

```bash
git clone https://github.com/ishvisoni1114-creator/task-management-system.git
cd task-management-system
```

---

# Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder.

Example:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend:

```bash
npm start
```

Backend runs on:

```
http://localhost:3000
```

---

# Frontend Setup

```bash
cd frontend
npm install
ng serve
```

Frontend runs on:

```
http://localhost:4200
```

---

# Database

This project uses **MongoDB** as the primary database.

The backend connects to MongoDB using **Mongoose**.

---

# Current Status

This project was developed as part of an internship assignment.

Implemented:

- User Authentication
- Task CRUD Operations
- User Management
- Role-Based Authorization
- Angular Frontend Structure
- Express Backend APIs
- MongoDB Integration

Some components may require additional refinement and testing before production deployment.

---

# Repository

GitHub Repository

https://github.com/ishvisoni1114-creator/task-management-system

---

---

## Author

**Ishvi Soni**

- 📧 Email: ishvisoni1114@gmail.com
- 🐙 GitHub: https://github.com/ishvisoni1114

---

## License

This project is intended solely for internship evaluation purposes.
---

# Notes for Reviewers

- Developed as part of an internship assignment.
- Demonstrates full-stack application architecture.
- Includes Angular frontend and Node.js backend.
- Implements authentication, route protection, CRUD operations, and MongoDB integration.
- The project is submitted in its current working state for evaluation.

---

# License

This project is submitted solely for internship evaluation purposes.