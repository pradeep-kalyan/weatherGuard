// index.js (Entry Point)
import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import cron from "node-cron";
import weatherTask from "./utils.js/WeatherTask.js";

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
app.use(express.json());

// Connect to MongoDB
connectToDatabase();
cron.schedule("0 7 * * *", weatherTask); // Runs at 7:00 AM every day

// Define Routes
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
app.use("/api/user/", userRoutes);

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
