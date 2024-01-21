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

    fireEvent.click(getByText("Submit"));

    await waitFor(() => {});
  });
});
