import React from 'react';
import { render, waitForElement } from '@testing-library/react';
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
    const { getByText } = render(<AcademicCalendar />);
    await waitForElement(() => getByText('3'));
  });

  it('should return "No Calendar Events" when no events are loaded', async () => {
    mockGetAcademicCalendar.mockResolvedValue(Promise.resolve({}));
    const { getByText } = render(<AcademicCalendar />);
    await waitForElement(() => getByText('No Calendar Events'));
  });
});
