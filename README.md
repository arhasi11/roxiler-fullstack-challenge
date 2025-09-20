<div align="center">

Roxiler Full-Stack Coding Challenge
A modern, production-ready web application built with Node.js, Express, PostgreSQL, and React. This project features a secure multi-role authentication system, interactive dashboards, and a clean, responsive user interface.

</div>

<div align="center">

</div>

✨ Features
Multi-Role Authentication: Secure login system for Admin, Store Owner, and Normal User roles using JWT.

Admin Dashboard: A comprehensive dashboard with statistics, sortable/filterable user and store lists, and user creation capabilities.

Owner Dashboard: A personalized view for store owners to see their stores' average ratings and detailed user feedback.

User Store View: A responsive, searchable list of all stores where users can submit and update their ratings.

Secure & Performant: Implements best practices for security (password hashing, environment variables) and performance (optimized database queries).

Modern UI/UX: A clean, responsive, and intuitive user interface built with React and Tailwind CSS.

📸 Screenshots
Login Page

Admin Dashboard

User Stores View







🛠️ Tech Stack
Backend: Node.js, Express.js, PostgreSQL, Sequelize (ORM)

Frontend: React, Vite, Tailwind CSS

Authentication: JSON Web Tokens (JWT), bcryptjs

Validation: express-validator (Backend)

🚀 Getting Started
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

# Run the database migrations to create the tables
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
# No changes are needed for local development
cp .env.example .env

# Start the frontend development server
npm run dev

The frontend will be running on http://localhost:5173.

👤 Initial Admin User
To access the admin dashboard, you need to create an initial admin user. The recommended way is to temporarily modify the auth.controller.js signup function, and then change it back.

Open backend/src/controllers/auth.controller.js.

In the signup function, temporarily change role: 'user' to role: 'admin'.

Register a new user through the frontend signup page. This user will now be an admin.

IMPORTANT: Change the line back to role: 'user' to ensure regular users cannot register as admins.

📂 Project Structure
roxiler-project/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── migrations/
│   │   ├── models/
│   │   └── routes/
│   └── ...
└── frontend/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── pages/
    │   └── utils/
    └── ...
