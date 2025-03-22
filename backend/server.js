import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

import connectDB from "./config/mongodb.js"; // MongoDB connection
import authStudentRouter from "./routes/authStudentRoutes.js"; // Student auth routes

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

const allowedOrigins = ["http://localhost:5173"]; // Change this if needed

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// API Endpoints
app.get("/", (req, res) => res.send("API Working"));
app.use("/api/student/auth", authStudentRouter); // All student auth routes

// Start Server
app.listen(port, () => console.log(`Server started on PORT:${port}`));
