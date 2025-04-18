import { User } from "../models/userModel.js";
import { send_mail } from "../mailer.js";
import axios from "axios";

const weatherCodeMap = {
  0: "☀️ Clear sky",
  1: "🌤️ Mainly clear",
  2: "⛅ Partly cloudy",
  3: "☁️ Overcast",
  45: "🌫️ Fog",
  48: "❄️🌫️ Depositing rime fog",
  51: "🌦️ Light drizzle",
  53: "🌧️ Moderate drizzle",
  55: "🌧️ Dense drizzle",
  56: "🧊🌧️ Light freezing drizzle",
  57: "🧊🌧️ Dense freezing drizzle",
  61: "🌦️ Slight rain",
  63: "🌧️ Moderate rain",
  65: "🌧️🌧️ Heavy rain",
  66: "🧊🌧️ Light freezing rain",
  67: "🧊🌧️🌧️ Heavy freezing rain",
  71: "🌨️ Slight snow fall",
  73: "🌨️❄️ Moderate snow fall",
  75: "🌨️❄️❄️ Heavy snow fall",
  77: "❄️🌾 Snow grains",
  80: "🌦️ Rain showers (slight)",
  81: "🌧️ Rain showers (moderate)",
  82: "🌧️🌧️ Rain showers (violent)",
  85: "🌨️ Snow showers (slight)",
  86: "🌨️🌨️ Snow showers (heavy)",
  95: "⛈️ Thunderstorm (slight or moderate)",
  96: "⛈️🌨️ Thunderstorm with slight hail",
  99: "⛈️🌨️🌨️ Thunderstorm with heavy hail",
};

const weatherTask = async () => {
  console.log("✅ Weather task started");

  const users = await User.find();
  if (!users.length) {
    console.log("No users found.");
    return;
  }

  for (const user of users) {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${user.lat}&longitude=${user.lon}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,weather_code,apparent_temperature_max,apparent_temperature_min,wind_speed_10m_max&timezone=auto&forecast_days=1`;
      const { data } = await axios.get(url);

      const daily = data.daily;

      const weatherCode = daily.weather_code[0];
      const description =
        weatherCodeMap[weatherCode] || "🌈 Weather info not available";

      const tempMax = daily.temperature_2m_max[0];
      const tempMin = daily.temperature_2m_min[0];
      const feelsMax = daily.apparent_temperature_max[0];
      const feelsMin = daily.apparent_temperature_min[0];
      const windSpeed = daily.wind_speed_10m_max[0];
      const sunrise = daily.sunrise[0];
      const sunset = daily.sunset[0];

      const mailSubject = `🌦️ Weather Update for ${user.name}`;
      const mailText = `
Hello ${user.name},

📍 Weather forecast for your location:

- Condition: ${description}
- Temperature: ${tempMin}°C (min) to ${tempMax}°C (max)
- Feels like: ${feelsMin}°C to ${feelsMax}°C
- Wind Speed: ${windSpeed} km/h
- 🌅 Sunrise: ${sunrise}
- 🌇 Sunset: ${sunset}

Stay safe and have a great day!  
~ WeatherGuard ☁️`;

      await send_mail(user.email, mailSubject, mailText.trim());
      console.log(`📧 Weather alert sent to ${user.email}`);
    } catch (err) {
      console.error(`❌ Error sending weather to ${user.email}:`, err.message);
      continue;
    }
  }
};

export default weatherTask;
