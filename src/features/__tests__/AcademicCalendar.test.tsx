import React from 'react';
import { render, mockAppContext } from 'src/util/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AcademicCalendar from '../AcademicCalendar';
import { Events } from '@osu-wams/hooks';
import { mockGAEvent } from 'src/setupTests';

const { academicCalendar6, academicCalendar3 } = Events.mockEvents;
const mockUseAcademicCalendarEvents = jest.fn();

jest.mock('@osu-wams/hooks', () => ({
  ...jest.requireActual('@osu-wams/hooks'),
  useAcademicCalendarEvents: () => mockUseAcademicCalendarEvents(),
}));

describe('<AcademicCalendar />', () => {
  // Set mock function result before running any tests
  beforeEach(() => {
    mockUseAcademicCalendarEvents.mockReturnValue(academicCalendar6);
  });

  it('should find the "Testo Event" as a title', async () => {
    render(<AcademicCalendar />);
    const eventTitle = screen.getByText('Testo Event');
    expect(eventTitle).toBeInTheDocument();
  });

  it('can click on footer and event to send data to analytics', async () => {
    render(<AcademicCalendar />);
    const eventTitle = await screen.findByText('Testo Event');
    userEvent.click(eventTitle);

    const viewCalendar = await screen.findByText('View more in the academic calendar');
    userEvent.click(viewCalendar);
    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });

  it('should have "3" as a value when only 3 calendar events are present', async () => {
    mockUseAcademicCalendarEvents.mockReturnValue(academicCalendar3);
    render(<AcademicCalendar />);
    const eventCounter = await screen.findByTestId('icon-counter');
    expect(eventCounter).toHaveTextContent('3');
  });

  it('should return "No Calendar Events" when no events are loaded', async () => {
    mockUseAcademicCalendarEvents.mockReturnValue({ data: [], loading: false, error: false });
    render(<AcademicCalendar />);
    expect(screen.getByText('No Calendar Events')).toBeInTheDocument();
  });
});

describe('with an InfoButton in the CardFooter', () => {
  const validIinfoButtonId = 'academic-calendar';
  beforeEach(() => {
    mockUseAcademicCalendarEvents.mockReturnValue(academicCalendar6);
  });

  test('does not display the button when the infoButtonData is missing it', async () => {
    render(<AcademicCalendar />, {
      appContext: {
        ...mockAppContext,
        infoButtonData: [{ id: 'invalid-id', content: 'content', title: 'title' }],
      },
    });

    const element = screen.queryByTestId(validIinfoButtonId);
    expect(element).not.toBeInTheDocument();
  });

  test('displays the button when the infoButtonData is included', async () => {
    render(<AcademicCalendar />, {
      appContext: {
        ...mockAppContext,
        infoButtonData: [{ id: validIinfoButtonId, content: 'content', title: 'title' }],
      },
    });

    const element = screen.getByTestId(validIinfoButtonId);
    expect(element).toBeInTheDocument();
  });
});
