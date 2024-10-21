import axios from "axios";

export const getWeatherReport = async (city) => {
  const apiUrl = `${process.env.REACT_APP_WEATHER_SERVICE_API_URL}${process.env.REACT_APP_WEATHER_SERVICE_GET_WEATHER_ENDPOINT}`;
  console.log("Url", apiUrl);
  try {
    const response = await axios.get(apiUrl, {
      params: { cityName: city, days: 3 },
    });
    return response;
  } catch (error) {
    if (!navigator.onLine)
      console.log("Offline: Displaying cached data or offline message");
    throw error;
  }
};
