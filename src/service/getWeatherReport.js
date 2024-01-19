import axios from "axios";

export const getWeatherReport = async (city) => {
  const apiUrl = "http://localhost:8088/v1/weather";

  try {
    const response1 = await axios.get(apiUrl, { params: { cityName: city } });
    console.log(response1);

    // const response2 = await axios.get("http://localhost:8086/v1/weather", {
    //   params: { cityName: city },
    // });
    // console.log(response2);

    return response1;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
