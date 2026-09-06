import jwt from "jsonwebtoken";
import Student from "../models/studModel.js";

export const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ success: false, message: "Not authorized, no token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await Student.findById(decoded.id).select("-password");

        if (!req.user) {
            return res.status(401).json({ success: false, message: "Not authorized, user not found" });
        }

        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Token verification failed", error });
    }
};
