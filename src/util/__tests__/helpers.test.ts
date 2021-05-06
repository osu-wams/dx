import { Helpers } from '@osu-wams/utils';

const {
  titleCase,
  formatTime,
  format,
  formatDollars,
  singularPlural,
  formatPhone,
  arrayIncludes,
  commaList,
  removeDuplicates,
} = Helpers;

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
  const academicCalendar = 'Thu, 28 Nov 2019 19:00:00 -0800';
  test.each`
    input               | expected
    ${'2018-12-31'}     | ${'December 31, 2018'}
    ${'2018-09-06'}     | ${'September 6, 2018'}
    ${academicCalendar} | ${'November 28, 2019'}
    ${eventCalendar}    | ${'November 26, 2019'}
    ${undefined}        | ${''}
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
    ${null}            | ${null}
  `(
    'transform phones from various countries into clear, national formats with country code if outside US',
    ({ input, expected }) => {
      expect(formatPhone(input)).toBe(expected);
    }
  );
});

describe('arrayIncludes', () => {
  test.each`
    input                           | expected
    ${{ array: ['a'], value: 'A' }} | ${true}
    ${{ array: ['a'], value: 'b' }} | ${false}
    ${{ array: ['A'], value: 'a' }} | ${true}
  `('finds case-insensitive array inclusion', ({ input, expected }) => {
    expect(arrayIncludes(input.array, input.value)).toBe(expected);
  });
});

describe('commaList', () => {
  const array1 = ['car'];
  const array2 = ['car', 'boat'];
  const array0 = [];
  const string = 'car';

  // optional empty parameter
  const empty = 'empty';

  it('Array with 1 item, returns no comma', () => {
    expect(commaList(array1)).toBe('car');
    expect(commaList(array1, empty)).toBe('car');
  });

  it('Array with 2 items, returns comma separated string', () => {
    expect(commaList(array2)).toBe('car, boat');
    expect(commaList(array2, empty)).toBe('car, boat');
  });

  it('If a string is entered it returns the string', () => {
    expect(commaList(string)).toBe('car');
    expect(commaList(string, empty)).toBe('car');
  });

  it('If an empty array returns empty string or the optional parameter', () => {
    expect(commaList(array0)).toBe('');
    expect(commaList(array0, empty)).toBe(empty);
  });

  it('If false or null is passed', () => {
    expect(commaList(false)).toBe('');
    expect(commaList(null)).toBe('');
    expect(commaList(undefined)).toBe('');
    expect(commaList(null, empty)).toBe(empty);
    expect(commaList(false, empty)).toBe(empty);
  });
});

describe('removeDuplicates', () => {
  const array1 = [
    { id: 1, color: 'red' },
    { id: 2, color: 'purple' },
    { id: 3, color: 'red' },
    { id: 4, color: 'red' },
  ];
  const result1 = [
    { id: 1, color: 'red' },
    { id: 2, color: 'purple' },
  ];
  const array2 = [
    { id: 1, color: 'red' },
    { id: 2, color: 'purple' },
    { id: 3, color: 'red' },
    { id: 4, color: 'purple' },
    { id: 5, color: 'black' },
    { id: 6, color: 'purple' },
    { id: 7, color: 'purple' },
  ];
  const result2 = [
    { id: 1, color: 'red' },
    { id: 2, color: 'purple' },
    { id: 5, color: 'black' },
  ];
  // Array of nested object
  const array3 = [
    { id: 1, color: { dark: 'red' } },
    { id: 2, color: { dark: 'purple' } },
    { id: 3, color: { dark: 'red' } },
    { id: 2, color: { dark: 'purple' } },
  ];
  const result3 = [
    { id: 1, color: { dark: 'red' } },
    { id: 2, color: { dark: 'purple' } },
  ];

  it('filters by object property any duplicates', () => {
    expect(removeDuplicates(array1, 'color')).toStrictEqual(result1);
    expect(removeDuplicates(array2, 'color')).toStrictEqual(result2);
  });

  it('filters by nested object property', () => {
    expect(removeDuplicates(array3, 'color', 'dark')).toStrictEqual(result3);
  });
});
