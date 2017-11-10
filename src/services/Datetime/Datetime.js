/**
 * Various helper functions for handling dates and times.
 */


/**
 * Convert seconds to MM:SS format. We'll never have values with hours, so just MM:SS is ok
 * @param {int} s is the seconds we convert
 * @return {string} the resulting value
 */
export function formatSeconds(s) {
    let minutes = Math.floor(s / 60);
    let seconds = s % 60;

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return (minutes + ":" + seconds);
}

/**
 * Based on the input value, return the string version of the month.
 * @param {int} month should be a value between 0..11
 * @return {string} the full month
 */
function getMonthName(month) {
    let months = new Array(12);
    months[0] = "January";
    months[1] = "February";
    months[2] = "March";
    months[3] = "April";
    months[4] = "May";
    months[5] = "June";
    months[6] = "July";
    months[7] = "August";
    months[8] = "September";
    months[9] = "October";
    months[10] = "November";
    months[11] = "December";

    return months[month];
}

/**
 * Format the DateTime date in "YYYY, m d" format.
 * @param {string} date in datetime format
 * @return {string} the date in the format we want
 */
export function formatDateYMD(d) {
    let dateObj = new Date(d);

    let year = dateObj.getFullYear();
    let month = dateObj.getMonth();
    let day = dateObj.getDate();

    return year + " - " + getMonthName(month) + " " + day;
}
