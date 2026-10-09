const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const getCurrentWeather = async () => {
  const lat = 22.5726;
  const lon = 88.3639;

  const url =
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  console.log("Weather API URL:", url);

  const response = await fetch(url);

  if (!response.ok) {
    const error = await response.json();
    console.log(error);
    throw new Error(error.message);
  }

  return response.json();
};