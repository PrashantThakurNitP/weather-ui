import { defineFeature, loadFeature } from "jest-cucumber";
import { getWeatherReport } from "../../service/getWeatherReport";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";

const feature = loadFeature("src/__test__/features/WeatherApiError.feature");

defineFeature(feature, (test) => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  let city;
  let response;

  test("Give Error for weather api call", ({ given, when, then }) => {
    given(/^the city is (.*)$/, (givenCity) => {
      city = givenCity;
    });

    when(/User clicks on Submit/, async () => {
      axios.get = jest.fn(() => {
        return Promise.reject('{"error": "NOT FOUND"}');
      });

      try {
        response = await getWeatherReport(city);
      } catch (err) {
        response = err;
      }
    });

    then(/^the Error should be returned (.*)$/, (expectedError) => {
      expect(expectedError).toEqual('{"error": "NOT FOUND"}');
    });
  });
});
