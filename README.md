# TaskFlow - Modern Task Management System

![TaskFlow Demo](https://via.placeholder.com/800x400.png?text=TaskFlow+Demo) 
*Replace with actual screenshot/demo link*

A full-stack task management application with real-time synchronization, drag-and-drop functionality, and secure user authentication.

## Features

### Core Functionality
- 🔐 Firebase Authentication (Google Sign-in)
- 📋 Create/Edit/Delete tasks with titles & descriptions
- 🗂️ Three categories: To-Do, In Progress, Done
- 🖱️ Drag-and-drop task management
- 📅 Due dates with color-coded urgency indicators
- 📜 Activity log tracking task changes
- 📱 Fully responsive design

### Advanced Features
- ⚡ Real-time updates using MongoDB Change Streams
- 🔄 Optimistic UI updates for smooth interactions
- 🎨 Minimalist UI with dark/light mode support
- 📊 Persistent task ordering with database sync
- 🔔 Visual feedback for overdue tasks
- 📈 Activity history tracking

## Technologies

### Frontend
- React.js (Vite)
- react-beautiful-dnd (Drag & Drop)
- Tailwind CSS + DaisyUI
- Firebase Authentication
- Axios (HTTP Client)
- react-icons

### Backend
- Node.js + Express.js
- MongoDB (with Mongoose ODM)
- MongoDB Change Streams
- JWT Authentication
- CORS & Helmet (Security)

### DevOps
- MongoDB Atlas (Cloud Database)
- Vercel/Netlify (Frontend Hosting)
- Render/Railway (Backend Hosting)
- Postman (API Testing)

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Firebase project
- Git

### Installation

1. **Clone Repository**
```bash
git clone https://github.com/yourusername/taskflow.git
cd taskflow
Frontend Setup

bash
Copy
cd client
npm install
Backend Setup

bash
Copy
cd ../server
npm install
Configuration
Frontend (.env)

env
Copy
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_API_BASE_URL=http://localhost:5000
Backend (.env)

env
Copy
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
FIREBASE_PROJECT_ID=your_firebase_id
PORT=5000
Running Locally
Start Backend:

bash
Copy
cd server && npm run dev
Start Frontend:

bash
Copy
cd client && npm run dev
Visit: http://localhost:5173
