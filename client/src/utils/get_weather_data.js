import axios from "axios";
import { useState } from "react";

export const get_weather_data = async ({ lat, lon }) => {
  const api_key = "ad76597c6ab9f7e5c5f8bc6a60ca5883";
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
