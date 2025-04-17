// index.js (Entry Point)
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import cron from "node-cron";
import weatherTask from "./utils/WeatherTask.js";
import cors from "cors";

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
app.use(express.json());

// Connect to MongoDB
app.use(cors()); // Allow all origins by default
connectDB();
console.log("mongo connected successfully");
cron.schedule("15 5 * * *", weatherTask); // 1:30 AM UTC = 7:00 AM IST

app.use("/api/user/", userRoutes);

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
  console.log("🌦️ Weather email logic ran at", new Date().toISOString());
});
