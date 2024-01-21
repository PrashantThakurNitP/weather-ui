export const getSelectedRecord = (records) => {
  const currentUnixTime = new Date().getTime() / 1000;

  const filteredRecords = records.find((record) => {
    const recordTime =
      new Date(
        `${record.dailyWeathers.date}T${record.dailyWeathers.time}`
      ).getTime() / 1000;
    return Math.abs(recordTime - currentUnixTime) < 5400; // Assuming a tolerance of 30 minutes (1800 seconds)
  });

  return filteredRecords;
};
