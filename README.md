# GATE Assistant

A full-stack web application to help students prepare for the GATE (Graduate Aptitude Test in Engineering) exam. The platform provides study materials, mock tests, community forums, and a personalised student dashboard.

## Features

- **Authentication** — Secure signup and login with JWT-based sessions and HTTP-only cookies
- **Student Dashboard** — Centralised hub for all student activity
- **Profile Management** — Students can view and update their profile, college name, and photo
- **Mock Tests** — A GATE CS practice test with scores saved to the database, plus a score history with a trend chart
- **Study Materials** — Basic list of resources
- **Communities** — Front-end prototype (posts are not saved yet; data resets on refresh)

## Future Improvements

- Save community posts through a real backend API
- Add more mock test questions and subjects
- Admin panel for managing content and viewing student progress
- Subject-wise study material links

## Tech Stack

**Frontend**
- React 18
- React Router DOM
- Tailwind CSS
- Axios
- Font Awesome
- Recharts (score trend chart)

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- cookie-parser
- nodemon

## Project Structure

```
gate-assi/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── studentdashboard/   # Dashboard-specific components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Specialties.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── AuthPage.jsx
│   │   │   └── StudentDashboard.jsx
│   │   └── App.jsx
│   └── package.json
└── backend/
    ├── config/
    │   └── mongodb.js
    ├── controllers/
    │   ├── authStudentController.js
    │   └── testResultController.js
    ├── middleware/
    │   └── authMiddleware.js
    ├── models/
    │   ├── studModel.js
    │   ├── profModel.js
    │   └── testResultModel.js
    ├── routes/
    │   ├── authStudentRoutes.js
    │   └── testResultRoutes.js
    ├── server.js
    └── package.json
```

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local) or a MongoDB Atlas connection string

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mishael22b142cs-hub/gate-assi.git
   cd gate-assi
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure environment variables**

   Create `backend/.env`:
   ```env
   MONGODB_URL=mongodb://127.0.0.1:27017
   JWT_SECRET=your_jwt_secret
   PORT=4000
   ```

### Running the App

Start MongoDB, then open two terminals:

**Terminal 1 — Backend**
```bash
cd backend
npm run dev
```

**Terminal 2 — Frontend**
```bash
cd frontend
npm run dev
```

The app will be available at `http://localhost:5173`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/student/auth/signup` | Register a new student |
| POST | `/api/student/auth/login` | Login and receive session cookie |
| POST | `/api/student/auth/logout` | Clear session cookie |
| GET | `/api/student/auth/profile` | Get student profile (protected) |
| PUT | `/api/student/auth/profile` | Update student profile (protected) |
| POST | `/api/student/results` | Save a mock test score (protected) |
| GET | `/api/student/results` | Get the last 10 mock test scores (protected) |

## Author

**Mishael Joseph**
- Email: mishael_22b142cs@gecwyd.ac.in
