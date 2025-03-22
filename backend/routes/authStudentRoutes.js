import express from "express";
import { studentSignup, studentLogin, logout, getOrUpdateStudentProfile } from "../controllers/authStudentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route for student signup
router.post("/signup", studentSignup);
router.post("/login", studentLogin);
router.post('/logout', logout);
router.route("/profile").all(protect, getOrUpdateStudentProfile);

export default router;
