import axios from "axios";

export const getWeatherReport = async (city) => {
  const apiUrl = "http://localhost:8080/v1/weather";

  try {
    const response = await axios.get(apiUrl, {
      params: { cityName: city, days: 3 },
    });
    return response;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};
