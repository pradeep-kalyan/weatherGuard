import axios from "axios";
import { useState } from "react";

export const get_weather_data = async ({ lat, lon }) => {
  const api_key = "";
  console.log(lat, lon);

  await axios
    .get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude={part}&appid=${api_key}&cnt=6`
    )
    .then((data) => {
      console.log(data);
    })
    .catch((e) => console.error(e));
};
