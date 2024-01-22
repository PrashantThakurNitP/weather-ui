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

    const result = getSelectedRecord(records);

    expect(result).toEqual(records[0]);
  });

  it("returns undefined when no records are within the tolerance", () => {
    const records = [];

    const result = getSelectedRecord(records);

    expect(result).toBeNull;
  });
});
