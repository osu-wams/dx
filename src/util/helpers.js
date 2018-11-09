import format from 'date-fns/format';

export const titleCase = phrase =>
  phrase
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export function formatTime(hours) {
  const hourEnd = hours.indexOf(':');
  const H = hours.substr(0, hourEnd);
  const h = H % 12 || 12;
  const suffix = H < 12 ? 'am' : 'pm';
  return h + hours.substr(hourEnd, 3) + suffix;
}

export function formatDate(date) {
  return format(date, 'MMMM DD, YYYY');
}
