# Threadly

Threadly is a full-stack community forum web application inspired by platforms like Reddit. It allows users to create and participate in communities, share posts, and interact with discussions.

The project is being built as a learning-focused full-stack application while exploring modern frontend development, REST APIs, backend architecture, and MongoDB.

## Tech Stack

### Frontend
- React.js
- React Router
- CSS Modules
- React Icons

### Backend
- Node.js
- Express.js
- RESTful APIs
- MongoDB
- MongoDB Node.js Driver

## Current Features

- Community-based forum structure
- Create, view, and delete posts
- Individual post pages
- Create and manage communities
- MongoDB-based data persistence
- REST API architecture
- Separate frontend service layer for API requests
- Backend error-handling middleware
- Dynamic routing with React Router

## Project Structure

```text
Threadly/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   └── ...
│
└── backend/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── utils/
    └── app.js

## Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* MongoDB or MongoDB Atlas

### Clone the Repository

Clone the repository and navigate into the project directory:

```bash
git clone <your-repository-url>
cd Threadly
```

### Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install the dependencies:

```bash
npm install
```

Create a `.env` file in the `backend` directory and add your MongoDB connection string:

```env
MONGODB_URI=your_mongodb_connection_string
```

Start the backend server:

```bash
npm start
```

The backend will be available at:

```text
http://localhost:3000
```

### Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

## Project Status

🚧 **Threadly is currently under active development.**

The core post, community, and MongoDB data flows are being implemented first. Authentication, user functionality, community moderation, and additional social features will be added as development continues.

## Future Plans

* User authentication and authorization
* User profiles
* Community membership
* Community administration
* Voting system
* Comments and replies
* Notifications
* Image uploads
* Personalized feeds based on user interests
* Improved validation and security
* Pagination and performance improvements

## Learning Goals

This project is being developed to gain practical experience with:

* React component architecture
* React Router
* RESTful API design
* Node.js and Express.js
* MongoDB data modeling
* Frontend–backend communication
* Authentication and authorization
* Error handling
* Full-stack application architecture
