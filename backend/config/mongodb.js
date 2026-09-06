import mongoose from "mongoose";

// Cache the connection across serverless invocations so we don't open a new
// pool on every request. `global` survives while the function stays warm.
let cached = global._mongoose;
if (!cached) {
    cached = global._mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        const uri = process.env.MONGODB_URL?.trim();
        if (!uri) {
            throw new Error("MONGODB_URL is not set");
        }

        mongoose.connection.on("connected", () => console.log("Database Connected"));
        mongoose.connection.on("error", (err) => console.error("Database connection error:", err.message));

        cached.promise = mongoose.connect(uri, {
            dbName: "gate-prep",
            serverSelectionTimeoutMS: 10000,
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null; // allow a retry on the next request
        throw error;
    }

    return cached.conn;
};

export default connectDB;
