// Routes for saving and reading a student's mock-test score history.
import express from "express";
import { saveResult, getMyResults } from "../controllers/testResultController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, saveResult); // 🔴 save a new score, student must be logged in
router.get("/", protect, getMyResults); // 🔴 fetch that student's own score history

export default router;
