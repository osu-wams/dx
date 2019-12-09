import { isNullOrUndefined } from 'util';
import { format as fns, parseISO, isValid } from 'date-fns';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

// Format any WORDS SENTENCE/word sentence/wOrD sEnTenCe to Title Case: Word Sentence
export const titleCase = (phrase: string) => {
  return phrase.toLowerCase().replace(/(\b[a-z](?!\s))/g, match => match.toUpperCase());
};

// Format API time values to human friendly 12 hour am/pm format
export function formatTime(hours: string) {
  let result = 'Unexpected time format';

  // Expected time format from API
  const expectedFormat = /^\s*([01]?\d|2[0-3]):?([0-5]\d):?([0-5]\d)\s*$/;
  const matches = hours.match(expectedFormat);

  // Expected format matches user input, so we transform it
  if (matches) {
    const hourEnd = hours.indexOf(':');
    const H = Number(hours.substr(0, hourEnd));
    const h = H % 12 || 12;
    const suffix = H < 12 ? 'am' : 'pm';
    result = h + hours.substr(hourEnd, 3) + suffix;
  }
  return result;
}

/*
 * Wrapper around format from date-fns
 * Deals with strings and numbers and Dates
 * Default format returned: November 06, 2019
 */
export const format = (date: Date | string | number, type: string = 'MMMM d, yyyy') => {
  if (type === 'dueAt') {
    type = "MMM do 'at' h:mm";
  }

  if (typeof date === 'string') {
    // if parseISO understands the date as valid we use it
    if (isValid(parseISO(date))) {
      date = parseISO(date);
    } else {
      date = new Date(Date.parse(date));
    }
  }

  return fns(date, type);
};

/* Preferred Money format for simple strings to dollars
@input 2600.50 output $2,600.50  */
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2
});

export function formatDollars(amount: number | undefined) {
  if (isNullOrUndefined(amount)) {
    return undefined;
  }
  let result = formatter.format(amount);

  // More user-friendly text if the return is NaN
  if (result === 'NaN' || result === '$NaN') {
    result = 'Not a dollar amount';
  }

  return result;
}

// Simple function to change between singular and plural by adding an s
export function singularPlural(quantity: number, word: string) {
  return quantity !== 1 ? word + 's' : word;
}

// Formats phones with Google library. International numbers get full string. US numbers just national format
export const formatPhone = (phone: string | null) => {
  if (phone) {
    const phoneNumber = parsePhoneNumberFromString(phone);
    if (phoneNumber && phoneNumber.countryCallingCode) {
      if (phoneNumber.country !== 'US') {
        // Return Internation Format
        return phoneNumber.formatInternational();
      }
      // US Number
      return phoneNumber.formatNational();
    } else {
      // We can't tell what this phone is, so we pass the numbers as is
      return phone;
    }
  }
};
