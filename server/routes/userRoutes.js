// routes/userRoutes.js
import express from "express";
import { User } from "../models/userModel.js";
import { send_mail } from "../mailer.js";

const router = express.Router();

router.post("/create/", async (req, res) => {
  const { name, email, lat, lon } = req.body;

  try {
    const user = await User.create({ name, email, lat, lon });

    await send_mail(
      email,
      "Welcome to WeatherGuard",
      "Thank you for signing up for WeatherGuard. We will send you weather alerts based on your location and preferences."
    );
    console.log(`Email sent to ${email}`);

    res.status(201).json(user);
  } catch (error) {
    console.error("User creation error:", error.message);
    res.status(400).json({ message: error.message });
  }
});

export default router;
