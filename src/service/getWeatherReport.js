import axios from "axios";

export const getWeatherReport = async (city) => {
  const apiUrl = "http://weather-service-k8s:80/v1/weather";

  try {
    const response = await axios.get(apiUrl, { params: { cityName: city } });
    //if (response.ok) {
    // const data = await response.json();

    return response;
    // } else {
    //   throw new Error("Failed to fetch data");
    // }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
