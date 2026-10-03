import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

import connectDB from "./config/mongodb.js"; // MongoDB connection (cached)
import authStudentRouter from "./routes/authStudentRoutes.js"; // Student auth routes
import testResultRouter from "./routes/testResultRoutes.js"; // Student mock test results

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS is only needed when the frontend is served from a different origin
// (local dev: Vite on :5173). In production the frontend and this API share
// the same Vercel domain, so requests are same-origin.
const allowedOrigins = (process.env.CLIENT_URLS || "http://localhost:5173,http://localhost:5174")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(cors({ origin: allowedOrigins, credentials: true }));

// Ensure the database is connected before handling any API request.
// On serverless the connection is cached between invocations.
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error("Database connection failed:", error.message);
        res.status(503).json({ success: false, message: "Database unavailable, please try again" });
    }
});

// API Endpoints
app.get("/", (req, res) => res.send("API Working"));
app.get("/api", (req, res) => res.json({ success: true, message: "API Working" }));
app.use("/api/student/auth", authStudentRouter); // All student auth routes
app.use("/api/student/results", testResultRouter); // Mock test score history

export default app;
