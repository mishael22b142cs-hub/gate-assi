import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Student from "../models/studModel.js";
import { authCookieOptions, AUTH_COOKIE_MAX_AGE } from "../utils/cookieOptions.js";

// Student Signup
export const studentSignup = async (req, res) => {
    const { name, email, phoneno, password, confirmpassword } = req.body;

    // Check if all fields are provided
    if (!name || !email || !phoneno || !password || !confirmpassword) {
        return res.json({ success: false, message: "All fields are required" });
    }

    // Check if passwords match
    if (password !== confirmpassword) {
        return res.json({ success: false, message: "Passwords do not match" });
    }

    try {
        // Check if student already exists
        const existingUser = await Student.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "Email already in use" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new student (excluding confirmpassword)
        const newStudent = new Student({ name, email, password: hashedPassword, phoneno });

        await newStudent.save();

        // Generate JWT Token
        const token = jwt.sign({ id: newStudent.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // Set cookie with token
        res.cookie("token", token, { ...authCookieOptions(), maxAge: AUTH_COOKIE_MAX_AGE });

        return res.json({ success: true });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Student Login
export const studentLogin = async (req, res) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.json({ success: false, message: "Email and password are required" });
    }

    try {
        // Find student by email
        const student = await Student.findOne({ email });

        if (!student) {
            return res.json({ success: false, message: "Invalid email" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid password" });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: student.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // Set cookie with token
        res.cookie("token", token, { ...authCookieOptions(), maxAge: AUTH_COOKIE_MAX_AGE });

        return res.json({ success: true });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Student logout
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', authCookieOptions())

        return res.json({ success: true, message: "Logged Out" })

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

// Student profile update

export const getOrUpdateStudentProfile = async (req, res) => {
    try {
        if (req.method === "GET") {
            // Fetch Student Data
            const student = await Student.findById(req.user.id).select("-password");

            if (!student) {
                return res.status(404).json({ success: false, message: "Student not found" });
            }

            return res.json({ success: true, student });
        }

        if (req.method === "PUT") {
            const { name, phoneno, collegeName, profilePhoto, branch, yearOfStudy } = req.body;

            // Only update the fields that were actually provided
            const updates = {};
            if (name !== undefined) updates.name = name;
            if (phoneno !== undefined) updates.phoneno = phoneno;
            if (collegeName !== undefined) updates.collegeName = collegeName;
            if (profilePhoto !== undefined) updates.profilePhoto = profilePhoto;
            if (branch !== undefined) updates.branch = branch;
            if (yearOfStudy !== undefined) updates.yearOfStudy = yearOfStudy;

            const updatedStudent = await Student.findByIdAndUpdate(
                req.user.id,
                updates,
                { new: true, runValidators: true }
            ).select("-password");

            if (!updatedStudent) {
                return res.status(404).json({ success: false, message: "Student not found" });
            }

            return res.json({ success: true, message: "Profile updated successfully", student: updatedStudent });
        }

        res.status(405).json({ success: false, message: "Method not allowed" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
};