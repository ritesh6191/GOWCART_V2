import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

async function dbConnect() {
    const DB_URI = process.env.MONGO_URI;
    
    if (!DB_URI) {
        console.error("❌ MongoDB URI not found in .env file!");
        return;
    }

    try {
        await mongoose.connect(DB_URI);
        console.log("✅ MongoDB Connected Successfully");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
    }
}

export default dbConnect;
