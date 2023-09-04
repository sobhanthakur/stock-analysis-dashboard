/**
 * Converts a Date Object to a UNIX timestamp
 * @param {Date} date - The Date Object to be converted
 * @param {number} unixTimestamp The corresponding UNIX timestamp (seconds elapsed since January 1st, 1970 at UTC)
 */
export const convertDateToUnixTimestamp = (date: Date): number => {
  let d = new Date(date);
  d.setHours(0,0,0);
  return Math.floor(d.getTime() / 1000);
};

/**
 * Converts a UNIX timestamp to a Date
 * @param {number} unixTimestamp - UNIX timestamp (seconds elapsed since January 1st, 1970 at UTC)
 * @returns {string} The corresponding Date Object formatted as a string
 */
export const convertUnixTimestampToDate = (unixTimestamp: number): string => {
  const milliseconds = unixTimestamp * 1000;
  return new Date(milliseconds).toLocaleDateString();
};


