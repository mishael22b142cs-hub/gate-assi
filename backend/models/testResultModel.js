// Stores one mock-test attempt (score out of total) for a student.
import mongoose from "mongoose";

const testResultSchema = new mongoose.Schema(
    {
        student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true }, // 🔴 links this result to the logged-in student
        score: { type: Number, required: true },
        total: { type: Number, required: true },
    },
    { timestamps: true } // 🔴 auto-adds createdAt, used to show "newest first" history
);

export default mongoose.model("TestResult", testResultSchema);
