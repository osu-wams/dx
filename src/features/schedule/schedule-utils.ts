import { addDays, eachDay, format } from 'date-fns';

/**
 * Utility functions
 */
const getNextFiveDays = () => {
  let rangeStart = new Date();
  let rangeEnd = addDays(rangeStart, 4);
  let nextFiveDays = eachDay(rangeStart, rangeEnd);

  return nextFiveDays;
};

const getDayShortcode = (date: Date) => {
  let twoLetterShortcodes = ['Th', 'Sa', 'Su'];

  let shortcode = format(date, 'dddd').substr(0, 2);
  shortcode = twoLetterShortcodes.includes(shortcode) ? shortcode : shortcode.substr(0, 1);
  return shortcode;
};

export {getNextFiveDays, getDayShortcode}
