Roxiler Full-Stack Coding Challenge
This repository contains the complete solution for the Roxiler Full-Stack Intern coding challenge. It is a modern, production-ready web application built with a Node.js backend and a React frontend.

Live Demo (Optional)
[Link to your deployed application, if you have one]

Features
Multi-Role Authentication: Secure login system for Admin, Store Owner, and Normal User roles using JWT.

Admin Dashboard: A comprehensive dashboard with statistics, sortable/filterable user and store lists, and user creation capabilities.

Owner Dashboard: A personalized view for store owners to see their stores' average ratings and detailed user feedback.

User Store View: A responsive, searchable list of all stores where users can submit and update their ratings.

Secure & Performant: Implements best practices for security (password hashing, environment variables) and performance (optimized database queries).

Modern UI/UX: A clean, responsive, and intuitive user interface built with React and Tailwind CSS.

Tech Stack
Backend: Node.js, Express.js, PostgreSQL, Sequelize (ORM)

Frontend: React, Vite, Tailwind CSS

Authentication: JSON Web Tokens (JWT), bcryptjs

Validation: express-validator (Backend)

Getting Started
Prerequisites
Node.js (v18 or later)

PostgreSQL

Git

1. Clone the Repository
git clone [https://github.com/your-username/your-repository-name.git](https://github.com/your-username/your-repository-name.git)
cd your-repository-name

2. Backend Setup
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create the .env file (copy from .env.example)
cp .env.example .env

# --- IMPORTANT ---
# Edit the .env file with your PostgreSQL database credentials.

# Run the database migrations
npx sequelize-cli db:migrate

# Start the backend server
npm run dev

The backend will be running on http://localhost:4000.

3. Frontend Setup
# Open a new terminal and navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Create the .env file (copy from .env.example)
cp .env.example .env
# (No changes are needed in the .env file for local development)

# Start the frontend development server
npm run dev

The frontend will be running on http://localhost:5173.

Initial Admin User
To access the admin dashboard, you need to create an initial admin user. After setting up the database, you can do this by running a SQL query directly:

-- Replace with your own details. The password 'AdminPassword123!' will be hashed.
INSERT INTO "Users" (name, email, password, role, "createdAt", "updatedAt")
VALUES ('Your Admin Name', 'admin@example.com', '$2a$10$YourHashedPasswordHere', 'admin', NOW(), NOW());

Note: You will need to generate a bcrypt hash for your password to insert it.
