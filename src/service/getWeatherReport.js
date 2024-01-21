import axios from "axios";

export const getWeatherReport = async (city) => {
  const apiUrl = "http://localhost:8080/v1/weather";

  try {
    const response1 = await axios.get(apiUrl, {
      params: { cityName: city, days: 3 },
    });
    console.log(response1);

    return response1;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
