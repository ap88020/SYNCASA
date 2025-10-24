SyncCasa - Household Management System
<div align="center">
https://img.shields.io/badge/SyncCasa-Household%2520Management-blue?style=for-the-badge&logo=home
https://img.shields.io/badge/MERN-Full%2520Stack-green?style=for-the-badge&logo=mongodb

Simplify Shared Living, One Task at a Time

https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react
https://img.shields.io/badge/Node.js-16.x-339933?style=flat&logo=nodedotjs
https://img.shields.io/badge/MongoDB-5.0-47A248?style=flat&logo=mongodb
https://img.shields.io/badge/Express.js-4.18-000000?style=flat&logo=express

</div>
📖 Table of Contents
Overview

Features

Tech Stack

Screenshots

Installation

Project Structure

API Documentation

Contributing

License

🏠 Overview
SyncCasa is a modern web application designed to simplify shared living experiences. Whether you're living with roommates, family, or in a shared apartment, SyncCasa provides all the tools you need to manage household tasks, expenses, schedules, and communication in one centralized platform.

Why SyncCasa?
🎯 Streamline household management

💰 Eliminate financial conflicts

📅 Coordinate schedules effortlessly

💬 Improve communication

✅ Track responsibilities fairly

✨ Features
Core Features
Feature	Description	Status
🏠 Household Management	Create and manage multiple households with unique invite codes	✅ Implemented
👥 Member Management	Invite members with admin/member roles and permissions	✅ Implemented
✅ Task Management	Assign, track, and complete household chores and responsibilities	✅ Implemented
💵 Bill Splitting	Track expenses and split bills fairly among household members	✅ Implemented
📅 Event Calendar	Coordinate schedules, events, and important dates	✅ Implemented
💬 Group Chat	Real-time messaging within households	✅ Implemented
🛒 Shopping Lists	Collaborative shopping lists and inventory management	✅ Implemented
Advanced Features
🔐 Secure Authentication with JWT

🌙 Dark/Light Theme toggle

📱 Fully Responsive design

🔔 Real-time Notifications

🎨 Modern UI/UX with Tailwind CSS

⚡ Fast Performance with React 18

🛠 Tech Stack
Frontend
React 18 - Modern React with hooks and functional components

React Router DOM - Client-side routing

Redux Toolkit - State management

Tailwind CSS - Utility-first CSS framework

Lucide React - Modern icon library

React Hot Toast - Notification system

Backend
Node.js - Runtime environment

Express.js - Web application framework

MongoDB - NoSQL database

Mongoose - MongoDB object modeling

JWT - JSON Web Tokens for authentication

Bcrypt.js - Password hashing

CORS - Cross-origin resource sharing

Development Tools
Vite - Fast build tool and dev server

ESLint - Code linting

Prettier - Code formatting

📸 Screenshots
<div align="center">
Dashboard
https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Dashboard+Preview

Task Management
https://via.placeholder.com/800x400/10B981/FFFFFF?text=Task+Management

Mobile View
https://via.placeholder.com/400x800/8B5CF6/FFFFFF?text=Mobile+Responsive

</div>
🚀 Installation
Prerequisites
Node.js (v16 or higher)

MongoDB (local installation or MongoDB Atlas)

npm or yarn package manager

Quick Start
Clone the repository

bash
git clone https://github.com/your-username/sync-casa.git
cd sync-casa
Backend Setup

bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration
Frontend Setup

bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
Environment Configuration

Backend (.env)

env
MONGODB_URI=mongodb://localhost:27017/synccasa
JWT_SECRET=your_super_secret_jwt_key
PORT=5000
NODE_ENV=development
Frontend (.env)

env
VITE_API_URL=http://localhost:5000/api
Run the Application

Start Backend Server

bash
cd server
npm run dev
Start Frontend Development Server

bash
cd client
npm run dev
The application will be available at:

Frontend: http://localhost:5173

Backend API: http://localhost:5000

📁 Project Structure
text
sync-casa/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI Components
│   │   │   ├── ui/         # Basic UI components
│   │   │   ├── layout/     # Layout components
│   │   │   └── features/   # Feature-specific components
│   │   ├── pages/          # Page Components
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── ...
│   │   ├── feature/        # Redux State Management
│   │   │   ├── auth/       # Authentication slice
│   │   │   ├── house/      # Household management
│   │   │   └── tasks/      # Task management
│   │   ├── assets/         # Static Assets
│   │   │   ├── images/
│   │   │   └── data.js     # Mock data and constants
│   │   ├── context/        # React Context
│   │   ├── utils/          # Utility Functions
│   │   └── App.jsx         # Main App Component
│   ├── public/             # Public Assets
│   └── package.json
├── server/                 # Express Backend
│   ├── controllers/        # Route Controllers
│   │   ├── authController.js
│   │   ├── houseController.js
│   │   └── taskController.js
│   ├── models/             # MongoDB Models
│   │   ├── User.js
│   │   ├── Household.js
│   │   └── Task.js
│   ├── routes/             # API Routes
│   │   ├── auth.js
│   │   ├── houses.js
│   │   └── tasks.js
│   ├── middleware/         # Custom Middleware
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── config/             # Configuration
│   │   └── database.js
│   ├── utils/              # Utility Functions
│   └── server.js           # Server Entry Point
└── README.md
📡 API Documentation
Authentication Endpoints
Method	Endpoint	Description
POST	/api/auth/register	User registration
POST	/api/auth/login	User login
GET	/api/auth/profile	Get user profile
PUT	/api/auth/profile	Update user profile
Household Endpoints
Method	Endpoint	Description
GET	/api/houses	Get user's households
POST	/api/houses	Create new household
GET	/api/houses/:id	Get household details
PUT	/api/houses/:id	Update household
POST	/api/houses/join	Join household with code
Task Endpoints
Method	Endpoint	Description
GET	/api/tasks	Get household tasks
POST	/api/tasks	Create new task
PUT	/api/tasks/:id	Update task
DELETE	/api/tasks/:id	Delete task
🤝 Contributing
We love your input! We want to make contributing to SyncCasa as easy and transparent as possible.

Development Process
Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add some amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

Code Style
Use Prettier for code formatting

Follow ESLint rules

Write meaningful commit messages

Add comments for complex logic

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

👥 Team
Your Name - GitHub - Project Lead & Full Stack Developer

🆘 Support
If you have any questions or need help with setup:

📧 Email: your-email@example.com

🐛 Open an Issue

💬 Discussions

<div align="center">
Made with ❤️ and ☕ by the SyncCasa Team

https://img.shields.io/github/stars/your-username/sync-casa?style=social
https://img.shields.io/github/forks/your-username/sync-casa?style=social

</div>
