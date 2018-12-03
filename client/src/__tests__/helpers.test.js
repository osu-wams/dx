import { titleCase, formatTime, formatDate } from '../util/helpers';

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
  `('converts dates from API from numbers to human readabele', ({ input, expected }) => {
    expect(formatDate(input)).toBe(expected);
  });
});
