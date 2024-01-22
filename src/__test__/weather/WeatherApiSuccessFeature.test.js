import { defineFeature, loadFeature } from "jest-cucumber";
import { getWeatherReport } from "../../service/getWeatherReport";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";

const feature = loadFeature(
  "src/__test__/features/WeatherSuccessResponse.feature"
);

defineFeature(feature, (test) => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  let city;
  let response;

  test("Show weather report", ({ given, when, then }) => {
    given(/^the city is (.*)$/, (givenCity) => {
      city = givenCity;
    });

    when(/User clicks on Submit/, async () => {
      axios.get = jest.fn(() => {
        return Promise.resolve({
          data: [
            {
              message: "Cold Outside",
              icon: "01n",
              description: "clear sky",
            },
          ],
          status: 200,
        });
      });

      // Assuming getWeatherReport fetches weather data using Axios
      response = await getWeatherReport(city);
    });

    then(/^the weather report should contain (.*)$/, (expectedBody) => {
      const expectedData = JSON.parse(expectedBody);

      expect(response.data).toHaveLength(1);
      Object.entries(expectedData).forEach(([key, value]) => {
        expect(response.data[0]).toHaveProperty(key, value);
      });
    });
  });
});
