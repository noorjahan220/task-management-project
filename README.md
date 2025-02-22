Task Management Application

This is a full-stack Task Management Application where users can easily add, edit, delete, and reorder tasks in real-time. The tasks are categorized into three sections: To-Do, In Progress, and Done. The app ensures that changes are instantly saved to the database to maintain persistence and offers a seamless experience across both desktop and mobile devices.

Key Features:

Authentication with Firebase (Google sign-in)
Real-time task updates with MongoDB and Express.js
Drag-and-drop functionality to manage task categories and order
Responsive UI using React and Tailwind CSS
Task categorization into To-Do, In Progress, and Done
Live Links
Frontend: Link to the Frontend
Backend: Link to the Backend
App: Live Application Link
Features
Authentication:

Firebase Authentication for Google sign-in
Stores user details in the database after the first login
Task Management System:

Add, edit, delete, and reorder tasks
Tasks categorized into To-Do, In Progress, and Done
Supports drag-and-drop between categories
Instant updates to the database
Database & Persistence:

MongoDB used to store tasks
Real-time updates with MongoDB Change Streams or WebSockets
Tasks persist even after refreshing or reopening the app
Frontend UI:

Built with Vite.js + React
Clean, minimalistic design using Tailwind CSS
Drag-and-drop functionality with react-beautiful-dnd or similar libraries
Fully responsive for desktop and mobile users

Backend API:

Express.js API to handle CRUD operations


Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/yourusername/task-management-app.git
Install the dependencies for the backend:

bash
Copy
Edit
cd backend
npm install
Install the dependencies for the frontend:

bash
Copy
Edit
cd frontend
npm install
Set up your environment variables (e.g., Firebase credentials, MongoDB URI) in .env files for both the frontend and backend.

Start the backend server:

bash
Copy
Edit
cd backend
npm start
Start the frontend development server:

bash
Copy
Edit
cd frontend
npm run dev
Open your browser and visit http://localhost:3000 to view the app.

Technologies Used
Frontend:

React
Tailwind CSS
Vite.js
React Beautiful DnD (or similar drag-and-drop library)
Backend:

Express.js
MongoDB
Firebase Authentication


Contributing
Feel free to fork the repository, submit pull requests, or open issues. Please follow the code style and best practices, and ensure all changes are well-documented.


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
