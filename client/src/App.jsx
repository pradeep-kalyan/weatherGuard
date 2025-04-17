import { useState } from "react";
import axios from "axios";
import Input from "./components/Input";
// import { get_weather_data } from "./utils/get_weather_data";
// import { set_user_details } from "./utils/set_user_details";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertTime, setAlertTime] = useState("");

  const fetchCoordinates = async (location) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${location}&format=json`
      );
      const { lat, lon } = response.data[0];
      setLat(lat);
      setLon(lon);
      return { lat, lon };
    } catch (err) {
      console.error("Error fetching coordinates:", err);
      setError("Failed to fetch location data");
      return null;
    }
  };

  const handleRegistration = async () => {
    console.log(name, email, location, alertTime);
    setLoading(true);
    const coords = await fetchCoordinates(location);
    if (coords) {
      // set_user_details(name, email, location, alertTime, coords.lat, coords.lon);
      console.log("Registration Successful with coordinates:", coords);
    }
    setLoading(false);
  };

  const inputs = [
    {
      type: "text",
      placeholder: "Enter your Name",
      value: name,
      valfxn: setName,
    },
    {
      type: "email",
      placeholder: "Enter your Email",
      value: email,
      valfxn: setEmail,
    },
    {
      type: "text",
      placeholder: "Enter your Location",
      value: location,
      valfxn: setLocation,
    },
    // Uncomment below for alert time input
    // {
    //   type: "time",
    //   placeholder: "Preferred Alert Time",
    //   value: alertTime,
    //   valfxn: setAlertTime,
    // },
  ];

  return (
    <div className="flex justify-center items-start w-full min-h-screen bg-sun-gradient p-10">
      <div className="bg-[#d9d9d9]/50 container max-w-5xl mx-auto rounded-2xl border-4 border-stone-700 shadow-lg shadow-red-500/50 hover:shadow-inner p-10 flex justify-center items-center flex-col">
        <h2 className="ly text-5xl text-center">WeatherGuard</h2>
        <p className="cp text-2xl text-center mt-4">
          An Automated Tool for Sending Real-Time Weather Alerts and
          Notifications
        </p>

        <div className="mt-6 text-xl font-[cursive] text-rose-600 flex justify-center items-center flex-col">
          <p>
            About the Weather Alert Automation Tool — In today’s fast-paced
            world, checking the weather manually is easy to forget. This tool
            automates real-time weather alerts and forecasts based on your
            location using OpenWeatherMap.
          </p>
          <ul className="list-disc ml-6 mt-4">
            <li>✅ Hands-Free Automation</li>
            <li>📡 Real-Time & Accurate Data</li>
            <li>📬 Daily Email Alerts</li>
            <li>⏰ Smart Reminders</li>
            <li>🧠 Relevant Weather Insights</li>
            <li>💼 Ideal for Professionals, Students, Travelers</li>
          </ul>
        </div>

        <div className="mt-10 flex flex-col items-center gap-6">
          <h1 className="text-4xl ly text-center">Registration Form</h1>
          <h2 className="text-xl ds text-center">
            Fill the form to register for our service...
          </h2>

          {inputs.map((input, index) => (
            <Input
              key={index}
              type={input.type}
              placeholder={input.placeholder}
              value={input.value}
              valfxn={input.valfxn}
            />
          ))}

          <button
            className="px-10 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-lg"
            onClick={handleRegistration}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

          {error && <p className="text-red-600 mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
