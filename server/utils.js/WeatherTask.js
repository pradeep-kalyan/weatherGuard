import { axios } from "axios";
import { User } from "../models/userModel";
import { send_mail } from "../mailer";

const weatherTask = async () => {
  const users = await User.find();

  for (const user of users) {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${user.lat}&lon=${user.lon}&appid=${process.env.WEATHER_API_KEY}`
      );

      const weather = data.weather[0].description;
      const temp = data.main.temp;

      const mail_text = `Hello ${user.name},\n\nThe current weather in your area is ${weather} with a temperature of ${temp}°C.\n\nStay safe! from WeatherGuard.`;
      const mail_subject = `Weather Update for ${user.name}`;
      await send_mail(user.email, mail_subject, mail_text);
      console.log(`Weather alert sent to ${user.email}`);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      continue;
    }
  }
};

export default weatherTask;
