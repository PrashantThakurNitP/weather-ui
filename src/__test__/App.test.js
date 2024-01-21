import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";
import axios from "axios";

describe("App Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("renders the component", () => {
    render(<App />);
    expect(screen.getByText("Weather App")).toBeInTheDocument();
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
