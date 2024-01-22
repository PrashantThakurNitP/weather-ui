export const getSelectedRecord = (records) => {
  if (records.length > 0) return records[0];
  return null;
};
