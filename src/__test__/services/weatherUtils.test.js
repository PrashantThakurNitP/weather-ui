import { getSelectedRecord } from "./../../service/getSelectedRecord";

describe("getSelectedRecord", () => {
  test("filters records based on time criterion", () => {
    const records = [
      {
        dailyWeathers: {
          date: "2024-01-22",
          time: "12:00:00",
        },
      },
    ];

    // Mock the current time to a specific value for testing
    const originalDateNow = Date.now;
    Date.now = jest.fn(() => new Date("2024-01-22T12:15:00").getTime());

    const result = getSelectedRecord(records);

    // Restore the original Date.now implementation
    Date.now = originalDateNow;

    // Assert the result based on your expectations
    expect(result).toEqual;
  });

  it("returns undefined when no records are within the tolerance", () => {
    const currentUnixTime = new Date().getTime() / 1000;
    const records = [
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

    const result = getSelectedRecord(records);

    expect(result).toBeUndefined();
  });
});
