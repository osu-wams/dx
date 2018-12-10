import { titleCase, formatTime, formatDate, formatDollars } from '../helpers';

describe('titleCase', () => {
  it('should transform sentences to title case', () => {
    const input = 'WHAT IS GOING ON HERE';
    const expected = 'What Is Going On Here';
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

describe('formatDate', () => {
  test.each`
    input           | expected
    ${'2018-12-06'} | ${'December 06, 2018'}
    ${'2018-09-26'} | ${'September 26, 2018'}
    ${'2018-01-11'} | ${'January 11, 2018'}
  `('converts dates from API to human readable', ({ input, expected }) => {
    expect(formatDate(input)).toBe(expected);
  });

  test.each`
    input           | expected
    ${'2018-12-06'} | ${'12/06/18'}
    ${'2018-09-26'} | ${'09/26/18'}
    ${'2018-01-11'} | ${'01/11/18'}
  `('converts dates from API to compact human readable', ({ input, expected }) => {
    expect(formatDate(input, 'compact')).toBe(expected);
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
