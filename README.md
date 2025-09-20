<div align="center">

Roxiler Full-Stack Coding Challenge
A modern, production-ready web application built with Node.js, Express, PostgreSQL, and React, featuring a multi-role authentication system and interactive dashboards.

</div>

✨ Core Features
Multi-Role Authentication: Secure login for Admins, Store Owners, and Users using JWT.

Interactive Dashboards: Role-specific dashboards with statistics and data management.

Store Rating System: Users can find, rate, and update ratings for stores.

Secure & Performant: Built with security best practices and optimized database queries.

🛠️ Tech Stack
Backend: Node.js, Express.js, PostgreSQL, Sequelize

Frontend: React, Vite, Tailwind CSS

Authentication: JWT, bcryptjs

🚀 Quick Start
Prerequisites
Node.js (v18+)

PostgreSQL

Git

1. Clone & Setup
# Clone the repository
git clone [https://github.com/your-username/your-repository-name.git](https://github.com/your-username/your-repository-name.git)
cd your-repository-name

2. Run the Backend
# Navigate to the backend folder
cd backend

# Install dependencies
npm install

# Copy .env.example to .env and fill in your database details
cp .env.example .env

# Run database migrations
npx sequelize-cli db:migrate

# Start the server
npm run dev
# Backend is now running on http://localhost:4000

3. Run the Frontend
# In a new terminal, navigate to the frontend folder
cd frontend

# Install dependencies
npm install

# Start the client
npm run dev
# Frontend is now running on http://localhost:5173

👤 Create an Admin User
Open backend/src/controllers/auth.controller.js.

In the signup function, temporarily change role: 'user' to role: 'admin'.

Register a new user via the signup page. This user is now an admin.

Important: Revert the change back to role: 'user'.
