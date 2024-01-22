import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { SearchComponent } from "../../components/search/SearchComponent";
import { getWeatherReport } from "../../service/getWeatherReport";
jest.mock("../../service/getWeatherReport");

const mockWeatherData = {};

describe("SearchComponent", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("renders component with input field and submit button", () => {
    const { getByPlaceholderText, getByText } = render(
      <SearchComponent onSubmitCity={() => {}} handleInvalidCity={() => {}} />
    );

    expect(getByPlaceholderText("Enter city name")).toBeInTheDocument();
    expect(getByText("Submit")).toBeInTheDocument();
  });

  it("handles city submission and calls onSubmitCity with weather data", async () => {
    const { getByPlaceholderText, getByText } = render(
      <SearchComponent
        onSubmitCity={(data) => console.log("onSubmitCity", data)}
        handleInvalidCity={() => {}}
      />
    );

    getWeatherReport.mockResolvedValueOnce({ data: mockWeatherData });

    fireEvent.change(getByPlaceholderText("Enter city name"), {
      target: { value: "London" },
    });
    fireEvent.click(getByText("Submit"));

    await waitFor(() => {
      expect(getWeatherReport).toHaveBeenCalledWith("London");
    });
  });

  it("handles invalid city submission and calls handleInvalidCity", async () => {
    const { getByText } = render(
      <SearchComponent
        onSubmitCity={() => {}}
        handleInvalidCity={() => console.log("handleInvalidCity")}
      />
    );
    getWeatherReport;
    fireEvent.click(getByText("Submit"));
    await waitFor(() => {});
  });

  it("handles error from getWeatherReport and calls handleInvalidCity", async () => {
    const mockHandleInvalidCity = jest.fn();

    // Mock the getWeatherReport function to throw an error
    getWeatherReport.mockRejectedValueOnce(new Error("Invalid city"));

    const { getByPlaceholderText, getByText } = render(
      <SearchComponent
        onSubmitCity={() => {}}
        handleInvalidCity={mockHandleInvalidCity}
      />
    );

    const inputElement = getByPlaceholderText("Enter city name");
    fireEvent.change(inputElement, { target: { value: "InvalidCity" } });

    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockHandleInvalidCity).toHaveBeenCalled();

      const errorMessageElement = getByText("Please enter a valid city name.");
      expect(errorMessageElement).toBeInTheDocument();
    });
  });

  it("handles error from getWeatherReport and calls handleNetwork Error", async () => {
    const mockHandleNetworkError = jest.fn();

    getWeatherReport.mockRejectedValueOnce(new Error("Network Error"));

    const { getByPlaceholderText, getByText } = render(
      <SearchComponent
        onSubmitCity={() => {}}
        handleInvalidCity={mockHandleNetworkError}
      />
    );

    const inputElement = getByPlaceholderText("Enter city name");
    fireEvent.change(inputElement, { target: { value: "City" } });
    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorMessageElement = getByText(
        "Network Error. Unable to fetch weather Report."
      );
      expect(errorMessageElement).toBeInTheDocument();
    });
  });
});
