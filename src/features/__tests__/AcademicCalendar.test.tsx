import React from 'react';
import { waitForElement } from '@testing-library/react';
import { render } from '../../util/test-utils';
import { academicCalendar3, academicCalendar6 } from '../../api/__mocks__/academicCalendar.data';
import AcademicCalendar from '../AcademicCalendar';

const mockGetAcademicCalendar = jest.fn();

jest.mock('../../api/events', () => ({
  getAcademicCalendarEvents: () => mockGetAcademicCalendar()
}));

describe('<AcademicCalendar />', () => {
  // Set mock function result before running any tests
  beforeAll(() => {
    mockGetAcademicCalendar.mockResolvedValue(Promise.resolve(academicCalendar6));
  });

  it('should find the "Testo Event" as a title', async () => {
    const { getByText } = render(<AcademicCalendar />);
    const eventTitle = await waitForElement(() => getByText('Testo Event'));
    expect(eventTitle).toBeInTheDocument();
  });

  it('should have "3" as a value when only 3 calendar events are present', async () => {
    mockGetAcademicCalendar.mockResolvedValue(Promise.resolve(academicCalendar3));
    const { getAllByText } = render(<AcademicCalendar />);
    await waitForElement(() => getAllByText('3'));
  });

  it('should return "No Calendar Events" when no events are loaded', async () => {
    mockGetAcademicCalendar.mockResolvedValue(Promise.resolve({}));
    const { getByText } = render(<AcademicCalendar />);
    await waitForElement(() => getByText('No Calendar Events'));
  });
});

describe('with an InfoButton in the CardFooter', () => {
  const validIinfoButtonId = 'CHANGE-ME';

  test('does not display the button when the infoButtonData is missing it', async () => {
    const { queryByTestId } = render(<AcademicCalendar />, {
      appContext: {
        infoButtonData: [{ id: 'invalid-id', content: 'content', title: 'title' }]
      }
    });

    const element = queryByTestId(validIinfoButtonId);
    expect(element).not.toBeInTheDocument();
  });

  test('displays the button when the infoButtonData is included', async () => {
    const { getByTestId } = render(<AcademicCalendar />, {
      appContext: {
        infoButtonData: [{ id: validIinfoButtonId, content: 'content', title: 'title' }]
      }
    });

    const element = await waitForElement(() => getByTestId(validIinfoButtonId));
    expect(element).toBeInTheDocument();
  });
});
