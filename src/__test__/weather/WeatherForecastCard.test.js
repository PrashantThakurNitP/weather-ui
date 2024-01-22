import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { WeatherForecastCard } from "../../components/weather/WeatherForecastCard";

const mockWeatherData = {
  message: "Mock Weather",
  icon: "01d",
  description: "Clear Sky",
  dailyWeathers: {
    temperature: 25,
    date: "2024-01-22",
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

const mockOnClickCard = jest.fn();

describe("TemperatureForecastCard", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("renders component with weather data", () => {
    const { getByTestId, getByText } = render(
      <WeatherForecastCard
        weather={mockWeatherData}
        onClickCard={mockOnClickCard}
      />
    );
    expect(getByTestId("forecast-card")).toBeInTheDocument();
    expect(getByTestId("forecast-card-description")).toHaveTextContent(
      "Clear Sky"
    );
    expect(getByTestId("forecast-card-img")).toBeInTheDocument();
    expect(getByText("Date: 2024-01-22, Time: 12:00 PM")).toBeInTheDocument();
    expect(getByTestId("forecast-card-temperature")).toHaveTextContent(
      "Temperature: 25°CMin: 20°C / Max: 30°C"
    );
    expect(getByTestId("forecast-card-wind")).toHaveTextContent(
      "Wind Speed: 5 m/s"
    );
  });

  it("calls onClickCard when the card is clicked", () => {
    const { getByTestId } = render(
      <WeatherForecastCard
        weather={mockWeatherData}
        onClickCard={mockOnClickCard}
      />
    );
    fireEvent.click(getByTestId("forecast-card"));
    expect(mockOnClickCard).toHaveBeenCalledWith(mockWeatherData);
  });
});
