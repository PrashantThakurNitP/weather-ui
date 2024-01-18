import axios from "axios";

export const getWeatherReport = async (city) => {
  const apiUrl = "http://weather-service-k8s:8080/v1/weather";

  try {
    const response = await axios.get(apiUrl, { params: { cityName: city } });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
