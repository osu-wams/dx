import format from 'date-fns/format';

// Format any WORDS SENTENCE/word sentence/wOrD sEnTenCe to Title Case: Word Sentence
export const titleCase = phrase =>
  phrase
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

// Format API time values to human friendly 12 hour am/pm format
export function formatTime(hours) {
  let result = 'Unexpected time format';

  // Expected time format from API
  const expectedFormat = /^\s*([01]?\d|2[0-3]):?([0-5]\d):?([0-5]\d)\s*$/;
  const matches = hours.match(expectedFormat);

  // Expected format matches user input, so we transform it
  if (matches) {
    const hourEnd = hours.indexOf(':');
    const H = hours.substr(0, hourEnd);
    const h = H % 12 || 12;
    const suffix = H < 12 ? 'am' : 'pm';
    result = h + hours.substr(hourEnd, 3) + suffix;
  }
  return result;
}

/* Format our day and time into preferred format
using the npm package date-fns. We change number dates to:
"December 09, 2018" format. */
export function formatDate(date, type = 'long') {
  // Compact format returns 10/20/19
  if (type === 'compact') {
    return format(date, 'MM/DD/YY');
  }
  return format(date, 'MMMM DD, YYYY');
}

/* Preferred Money format for simple strings to dollars
@input 2600.50 output $2,600.50  */
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2
});

export function formatDollars(amount) {
  let result = formatter.format(amount);

  // More userfriendly text if we the return is NaN
  if (result === ('$NaN' || NaN)) {
    result = 'Not a dollar amount';
  }

  return result;
}
