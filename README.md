# GATE Assistant

A full-stack web application to help students prepare for the GATE (Graduate Aptitude Test in Engineering) exam. The platform provides study materials, mock tests, community forums, and a personalised student dashboard.

## Features

- **Authentication** — Secure signup and login with JWT-based sessions and HTTP-only cookies
- **Student Dashboard** — Centralised hub for all student activity
- **Mock Tests** — Practice tests to simulate the GATE exam environment
- **Study Materials** — Curated resources organised by subject
- **Communities** — Discussion boards where students can post and interact
- **Profile Management** — Students can update their profile, college name, and photo
- **Admin Dashboard** — Separate panel for administrative control

## Tech Stack

**Frontend**
- React 18
- React Router DOM
- Tailwind CSS
- Axios
- Font Awesome

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
│   │   │   ├── StudentDashboard.jsx
│   │   │   └── AdminDashboard.jsx
│   │   └── App.jsx
│   └── package.json
└── backend/
    ├── config/
    │   └── mongodb.js
    ├── controllers/
    │   └── authStudentController.js
    ├── middleware/
    │   └── authMiddleware.js
    ├── models/
    │   ├── studModel.js
    │   └── profModel.js
    ├── routes/
    │   └── authStudentRoutes.js
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

## Author

**Mishael Joseph**
- Email: mishael_22b142cs@gecwyd.ac.in
