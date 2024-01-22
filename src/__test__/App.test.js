import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";
import { getSelectedRecord } from "../service/getSelectedRecord";
jest.mock("../service/getSelectedRecord");
import { getWeatherReport } from "../service/getWeatherReport";
jest.mock("../service/getWeatherReport");
import { v4 as uuidv4 } from "uuid";

const mockCurrentWeather = { id: "1", temperature: 20, description: "Sunny" };
const mockWeatherApiResponse = [
  {
    dailyWeathers: {
      date: "2023-01-21",
      time: "12:00:00",
    },
  },
  {
    dailyWeathers: {
      date: "2023-01-21",
      time: "18:00:00",
    },
  },
];

describe("App Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("renders the component", () => {
    render(<App />);
    expect(screen.getByText("Weather App")).toBeInTheDocument();
  });
  it("handles city submission and get selecetd Record", async () => {
    getSelectedRecord.mockReturnValueOnce(mockCurrentWeather);
    getWeatherReport.mockReturnValueOnce(mockWeatherApiResponse);

    const { getByPlaceholderText, getByText } = render(<App />);

    const inputElement = getByPlaceholderText("Enter city name");
    fireEvent.change(inputElement, { target: { value: "London" } });
    fireEvent.click(getByText("Submit"));

    await waitFor(() => {
      expect(getSelectedRecord).toHaveBeenCalled();
      expect(getWeatherReport).toHaveBeenCalled();
    });
  });

  it("handles invalid city and clears weather stats", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ message: "City not found" }),
    });

    render(
      <App
        key={uuidv4()}
        weather={mockCurrentWeather}
        onClickCard={jest.fn()}
      />
    );

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
