/**
 * Convert seconds to MM:SS format. We'll never have values with hours, so just MM:SS is ok
 * @param {int} s is the seconds we convert
 * @return {string} the resulting value
 */
const formatSeconds = sec => {
  let minutes = Math.floor(sec / 60);
  let seconds = sec % 60;

  if (minutes < 10) minutes = '0' + minutes;
  if (seconds < 10) seconds = '0' + seconds;

  return `${minutes}:${seconds}`;
};

/**
 * Based on the input value, return the string version of the month.
 * @param {int} month should be a value between 0..11
 * @return {string} the full month
 */
const getMonthName = month => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  return months[month];
};

/**
 * Format the DateTime date in "YYYY, m d" format.
 * @param {string} date in datetime format
 * @return {string} the date in the format we want
 */
const formatDateYMD = date => {
  const dateObj = new Date(date);

  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();
  const day = dateObj.getDate();

  return `${year} - ${getMonthName(month)} ${day}`;
};

module.exports = {
  formatDateYMD,
  formatSeconds
};
