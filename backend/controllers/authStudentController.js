import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Student from "../models/studModel.js";

// Student Signup
export const studentSignup = async (req, res) => {
    const { name, email, phoneno, password, confirmpassword } = req.body;

    // Check if all fields are provided
    if (!name || !email || !phoneno || !password || !confirmpassword) {
        return res.json({ success: false, message: "All fields are required" });
    }

    try {
        // Check if student already exists
        const existingUser = await Student.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "Email already in use" });
        }

        // Check if passwords match
        if (password !== confirmpassword) {
            return res.json({ success: false, message: "Passwords do not match" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new student (excluding confirmpassword)
        const newStudent = new Student({ name, email, password: hashedPassword, phoneno });

        await newStudent.save();

        // Generate JWT Token
        const token = jwt.sign({ id: newStudent.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // Set cookie with token
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

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
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.json({ success: true, message: token });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Student logout
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        })

        return res.json({ success: true, message: "Logged Out" })

    } catch (error) {
        return res.json({ success: false, menubar: error.message });
    }
}

export const collectData = async (req, res) => {
    const { } = req.body;
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
            const { name, phoneno, collegeName, profilePhoto } = req.body;

            const updatedStudent = await Student.findByIdAndUpdate(
                req.user.id,
                { name, phoneno, collegeName, profilePhoto },
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