import React from 'react';
import { waitForElement, fireEvent } from '@testing-library/react';
import { render, mockAppContext } from '../../util/test-utils';
import AcademicCalendar from '../AcademicCalendar';
import { Events } from '@osu-wams/hooks';
import { mockGAEvent } from '../../setupTests';

const { academicCalendar6, academicCalendar3 } = Events.mockEvents;
const mockUseAcademicCalendarEvents = jest.fn();

jest.mock('@osu-wams/hooks', () => ({
  ...jest.requireActual('@osu-wams/hooks'),
  useAcademicCalendarEvents: () => mockUseAcademicCalendarEvents()
}));

describe('<AcademicCalendar />', () => {
  // Set mock function result before running any tests
  beforeEach(() => {
    mockUseAcademicCalendarEvents.mockReturnValue(academicCalendar6);
  });

  it('should find the "Testo Event" as a title', async () => {
    const { getByText } = render(<AcademicCalendar />);
    const eventTitle = await waitForElement(() => getByText('Testo Event'));
    expect(eventTitle).toBeInTheDocument();
  });

  it('can click on footer and event to send data to analytics', async () => {
    const { getByText } = render(<AcademicCalendar />);
    const eventTitle = await waitForElement(() => getByText('Testo Event'));
    fireEvent.click(eventTitle);
    expect(mockGAEvent).toHaveBeenCalled();

    const viewCalendar = await waitForElement(() =>
      getByText('View more in the academic calendar')
    );
    fireEvent.click(viewCalendar);
    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });

  it('should have "3" as a value when only 3 calendar events are present', async () => {
    mockUseAcademicCalendarEvents.mockReturnValue(academicCalendar3);
    const { getAllByText } = render(<AcademicCalendar />);
    await waitForElement(() => getAllByText('3'));
  });

  it('should return "No Calendar Events" when no events are loaded', async () => {
    mockUseAcademicCalendarEvents.mockReturnValue({ data: [], loading: false, error: false });
    const { getByText } = render(<AcademicCalendar />);
    await waitForElement(() => getByText('No Calendar Events'));
  });
});

describe('with an InfoButton in the CardFooter', () => {
  const validIinfoButtonId = 'academic-calendar';
  beforeEach(() => {
    mockUseAcademicCalendarEvents.mockReturnValue(academicCalendar6);
  });

  test('does not display the button when the infoButtonData is missing it', async () => {
    const { queryByTestId } = render(<AcademicCalendar />, {
      appContext: {
        ...mockAppContext,
        infoButtonData: [{ id: 'invalid-id', content: 'content', title: 'title' }]
      }
    });

    const element = queryByTestId(validIinfoButtonId);
    expect(element).not.toBeInTheDocument();
  });

  test('displays the button when the infoButtonData is included', async () => {
    const { getByTestId } = render(<AcademicCalendar />, {
      appContext: {
        ...mockAppContext,
        infoButtonData: [{ id: validIinfoButtonId, content: 'content', title: 'title' }]
      }
    });

    const element = await waitForElement(() => getByTestId(validIinfoButtonId));
    expect(element).toBeInTheDocument();
  });
});
