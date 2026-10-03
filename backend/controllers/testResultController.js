// Handles saving a mock-test score and fetching a student's recent score history.
import TestResult from "../models/testResultModel.js";

// Save a mock test result
export const saveResult = async (req, res) => {
    const { score, total } = req.body;

    if (score === undefined || total === undefined) {
        return res.json({ success: false, message: "Score and total are required" });
    }

    try {
        const result = await TestResult.create({ student: req.user.id, score, total }); // 🔴 writes the attempt tied to the logged-in student

        return res.json({ success: true, result });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Get the logged-in student's last 10 results, newest first
export const getMyResults = async (req, res) => {
    try {
        const results = await TestResult.find({ student: req.user.id }) // 🔴 only this student's own results
            .sort({ createdAt: -1 }) // 🔴 newest first
            .limit(10); // 🔴 cap history to the last 10 attempts

        return res.json({ success: true, results });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};
