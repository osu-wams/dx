import {
  titleCase,
  formatTime,
  format,
  formatDollars,
  singularPlural,
  formatPhone
} from '../helpers';

describe('titleCase', () => {
  it('should transform UPPERCASE', () => {
    const input = 'WHAT IS GOING ON HERE';
    const expected = 'What Is Going On Here';
    expect(titleCase(input)).toBe(expected);
  });
  it('should ignore random characters to start', () => {
    const input = '*WHAT IS GOING ON HERE';
    const expected = '*What Is Going On Here';
    expect(titleCase(input)).toBe(expected);
  });
  it('should allow contractions', () => {
    const input = `WHAT'S GOING ON HERE`;
    const expected = `What's Going On Here`;
    expect(titleCase(input)).toBe(expected);
  });
});

describe('formatTime', () => {
  test.each`
    input                | expected
    ${'13:50:00'}        | ${'1:50pm'}
    ${'12:00:00'}        | ${'12:00pm'}
    ${'09:30:00'}        | ${'9:30am'}
    ${'21:15:00'}        | ${'9:15pm'}
    ${'Something bogus'} | ${'Unexpected time format'}
    ${'435345:1'}        | ${'Unexpected time format'}
  `('transform 24 hour time to simple 12 hour with am pm', ({ input, expected }) => {
    expect(formatTime(input)).toBe(expected);
  });
});

// TODO: Fix these on Github Actions consistent failures
xdescribe('format dates', () => {
  // Localist Event Calendar format, and academicCalendar format
  const eventCalendar = '2019-11-26T19:30:00-08:00';
  const academicCalendar = 'Thu, 28 Nov 2019 00:00:00 -0800';
  test.each`
    input               | expected
    ${'2018-12-31'}     | ${'December 31, 2018'}
    ${'2018-09-06'}     | ${'September 6, 2018'}
    ${academicCalendar} | ${'November 28, 2019'}
    ${eventCalendar}    | ${'November 26, 2019'}
  `('converts dates from API to human readable', ({ input, expected }) => {
    expect(format(input)).toBe(expected);
  });
});

describe('formatDollars', () => {
  test.each`
    input                   | expected
    ${'2560'}               | ${'$2,560.00'}
    ${'400'}                | ${'$400.00'}
    ${'75'}                 | ${'$75.00'}
    ${'00'}                 | ${'$0.00'}
    ${'12450'}              | ${'$12,450.00'}
    ${'50.50'}              | ${'$50.50'}
    ${'Bogus not a number'} | ${'Not a dollar amount'}
    ${'24.24.43'}           | ${'Not a dollar amount'}
  `(
    'transform long integers to dollar amounts with appropriate formatting',
    ({ input, expected }) => {
      expect(formatDollars(input)).toBe(expected);
    }
  );
});

describe('singularPlural', () => {
  const input = 'student';
  it('should return singular student', () => {
    expect(singularPlural(1, input)).toBe('student');
  });
  it('should return plural students', () => {
    const input = 'student';
    expect(singularPlural(5, input)).toBe('students');
  });
});

describe('formatPhone', () => {
  test.each`
    input              | expected
    ${'+15417312345'}  | ${'(541) 731-2345'}
    ${'5417312345'}    | ${'5417312345'}
    ${'+5721234567'}   | ${'+57 2 1234567'}
    ${'+861012345678'} | ${'+86 10 1234 5678'}
    ${null}            | ${undefined}
  `(
    'transform phones from various countries into clear, national formats with country code if outside US',
    ({ input, expected }) => {
      expect(formatPhone(input)).toBe(expected);
    }
  );
});
