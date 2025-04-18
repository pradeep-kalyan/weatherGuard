// routes/userRoutes.js
import express from "express";
import { User } from "../models/userModel.js";
import { send_mail } from "../mailer.js";

const router = express.Router();
// Get all users

router.post("/create/", async (req, res) => {
  const { name, email, lat, lon } = req.body;
  try {
    const user = await User.create({ name, email, lat, lon });
    await send_mail(
      email,
      "Welcome to WeatherGuard",
      `Hello ${name},\n\nThank you for signing up for WeatherGuard!
We’ll be sending you daily weather alerts tailored to your location and preferences — every day at 7:00 AM sharp.

All alerts will be sent to the email address you provided.
Please note that the emails will come from ungaldeveloper@gmail.com — make sure to check your inbox (and spam folder just in case!).

If you have any questions or need assistance, feel free to reach out to us at ungaldeveloper@gmail.com.
We’re here to help!

Stay safe,
The WeatherGuard Team`
    );
    console.log(`Email sent to ${email}`);

    res.status(201).json(user);
  } catch (error) {
    console.error("User creation error:", error.message);
    res.status(400).json({ message: error.message });
  }
});

export default router;
