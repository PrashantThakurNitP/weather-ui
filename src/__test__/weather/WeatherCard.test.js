import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { WeatherCard } from "../../components/weather/WeatherCard";

const mockWeatherData = {
  message: "Mock Message",
  icon: "01d",
  description: "Mock Description",
  dailyWeathers: {
    temperature: 25,
    date: "2024-01-21",
    time: "12:00:00",
    windSpeed: 5,
    minTemperature: 20,
    maxTemperature: 30,
    feelsLike: 26,
    humidity: 50,
    pressure: 1010,
    visibility: 10,
  },
  weatherType: "Clear",
};

describe("TemperatureCard", () => {
  test("renders temperature card with weather data", () => {
    render(<WeatherCard weather={mockWeatherData} />);

    expect(screen.getByTestId("weather-card")).toBeInTheDocument();
    expect(screen.getByTestId("weather-card-description")).toHaveTextContent(
      "Mock Description"
    );
    expect(screen.getByTestId("weather-card-date")).toHaveTextContent(
      "Date: 2024-01-21, Time: 12:00 PM"
    );
    expect(screen.getByTestId("weather-card-temperature")).toHaveTextContent(
      "Temperature: 25°C /Feels Like: 26Min: 20°C / Max: 30°C"
    );
    expect(screen.getByTestId("weather-card-wind")).toHaveTextContent(
      "Wind Speed: 5 m/s"
    );
    expect(screen.getByTestId("weather-card-humidity")).toHaveTextContent(
      "Humidity: 50"
    );
    expect(screen.getByTestId("weather-card-visibility")).toHaveTextContent(
      "Visibility: 10"
    );
    expect(screen.getByTestId("weather-card-pressure")).toHaveTextContent(
      "Pressure: 1010"
    );
    expect(screen.getByTestId("weather-card-message")).toHaveTextContent(
      "Mock Message"
    );
  });
});
