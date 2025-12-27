# Task Management App



## Features

### Admin Features
- Create new users and assign tasks to developers
- View all tasks in the system
- Delete tasks
- Manage task assignments

### Developer Features
- View tasks assigned to them
- Mark tasks as completed
- Filter tasks by status (pending/completed)
- View task statistics

## Tech Stack

### Frontend
- **React.js** - UI library
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Joi** - Validation
- **bcryptjs** - Password hashing

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Open `.env` file in the backend directory
   - Update `MONGO_URI` with your MongoDB connection string
   - Update `JWT_SECRET` with a secure random string

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5001`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

