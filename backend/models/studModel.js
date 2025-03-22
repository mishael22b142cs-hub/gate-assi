import mongoose from "mongoose";

const studSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneno: { type: String, required: true },
    profilePhoto: { type: String, default: "" }, // URL of the uploaded profile picture
    collegeName: { type: String, default: "" }   // College Name
});
export default mongoose.model("Student", studSchema);
