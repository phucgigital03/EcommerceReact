
export const isRangeValidTime = (fromDate, toDate, maxDays = 120) => {
  const diffInMs = toDate - fromDate;
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  return diffInDays <= maxDays;
};
