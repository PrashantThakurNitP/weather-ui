import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./../App";

describe("App Component", () => {
  it("renders the component", () => {
    render(<App />);
    expect(screen.getByText("Weather App")).toBeInTheDocument();
  });

  it("handles city submission and updates weather stats", async () => {
    const mockWeatherStats = [
      {
        message: "Cold Outside",
        icon: "01n",
        description: "clear sky",
        dailyWeathers: {
          minTemperature: 10,
          maxTemperature: 11,
          feelsLike: 9,
          humidity: 54,
          pressure: 1018,
          temperature: 11,
          date: "2024-01-21",
          time: "18:00:00",
          windSpeed: 2.35,
          visibility: 10000,
        },
        weatherType: "Clear",
      },
      {
        message: "Chilling Outside!",
        icon: "04n",
        description: "broken clouds",
        dailyWeathers: {
          minTemperature: 8,
          maxTemperature: 9,
          feelsLike: 9,
          humidity: 58,
          pressure: 1018,
          temperature: 9,
          date: "2024-01-21",
          time: "21:00:00",
          windSpeed: 1.93,
          visibility: 10000,
        },
        weatherType: "Clouds",
      },
      {
        message: "Chilling Outside!",
        icon: "03n",
        description: "scattered clouds",
        dailyWeathers: {
          minTemperature: 7,
          maxTemperature: 7,
          feelsLike: 6,
          humidity: 65,
          pressure: 1018,
          temperature: 7,
          date: "2024-01-22",
          time: "00:00:00",
          windSpeed: 1.59,
          visibility: 10000,
        },
        weatherType: "Clouds",
      },
      {
        message: "Cold Outside",
        icon: "01d",
        description: "clear sky",
        dailyWeathers: {
          minTemperature: 12,
          maxTemperature: 12,
          feelsLike: 11,
          humidity: 51,
          pressure: 1020,
          temperature: 12,
          date: "2024-01-22",
          time: "03:00:00",
          windSpeed: 0.98,
          visibility: 10000,
        },
        weatherType: "Clear",
      },
      {
        message: "Nice Weather",
        icon: "01d",
        description: "clear sky",
        dailyWeathers: {
          minTemperature: 19,
          maxTemperature: 19,
          feelsLike: 18,
          humidity: 35,
          pressure: 1020,
          temperature: 19,
          date: "2024-01-22",
          time: "06:00:00",
          windSpeed: 0.82,
          visibility: 10000,
        },
        weatherType: "Clear",
      },
      {
        message: "Nice Weather",
        icon: "01d",
        description: "clear sky",
        dailyWeathers: {
          minTemperature: 21,
          maxTemperature: 21,
          feelsLike: 20,
          humidity: 29,
          pressure: 1017,
          temperature: 21,
          date: "2024-01-22",
          time: "09:00:00",
          windSpeed: 1.96,
          visibility: 10000,
        },
        weatherType: "Clear",
      },
      {
        message: "Nice Weather",
        icon: "01n",
        description: "clear sky",
        dailyWeathers: {
          minTemperature: 15,
          maxTemperature: 15,
          feelsLike: 14,
          humidity: 44,
          pressure: 1016,
          temperature: 15,
          date: "2024-01-22",
          time: "12:00:00",
          windSpeed: 1.41,
          visibility: 10000,
        },
        weatherType: "Clear",
      },
      {
        message: "Cold Outside",
        icon: "03n",
        description: "scattered clouds",
        dailyWeathers: {
          minTemperature: 13,
          maxTemperature: 13,
          feelsLike: 11,
          humidity: 51,
          pressure: 1018,
          temperature: 13,
          date: "2024-01-22",
          time: "15:00:00",
          windSpeed: 1.73,
          visibility: 10000,
        },
        weatherType: "Clouds",
      },
    ];

    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(mockWeatherStats),
    });

    render(<App />);

    fireEvent.change(screen.getByPlaceholderText("Enter city name"), {
      target: { value: "London" },
    });
    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      const card = screen.getByTestId("weather-card");
      expect(card).toBeInTheDocument();
      const description = screen.getByTestId("weather-card-description");
      expect(description).toBeInTheDocument();
      const img = screen.getByTestId("weather-card-img");
      expect(img).toBeInTheDocument();

      const date = screen.getByTestId("weather-card-date");
      expect(date).toBeInTheDocument();

      const temperature = screen.getByTestId("weather-card-temperature");
      expect(temperature).toBeInTheDocument();

      const wind = screen.getByTestId("weather-card-wind");
      expect(wind).toBeInTheDocument();

      const humididty = screen.getByTestId("weather-card-humidity");
      expect(humididty).toBeInTheDocument();

      const visibility = screen.getByTestId("weather-card-visibility");
      expect(visibility).toBeInTheDocument();

      const pressure = screen.getByTestId("weather-card-pressure");
      expect(pressure).toBeInTheDocument();

      const message = screen.getByTestId("weather-card-message");
      expect(message).toBeInTheDocument();
    });
  });

  it("handles invalid city and clears weather stats", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ message: "City not found" }),
    });

    render(<App />);

    fireEvent.change(screen.getByPlaceholderText("Enter city name"), {
      target: { value: "InvalidCity" },
    });
    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() =>
      expect(screen.queryByText("Current Temperature")).not.toBeInTheDocument()
    );

    expect(screen.queryByText("InvalidCity")).not.toBeInTheDocument();
  });
});
