import React from 'react';
import { render } from 'src/util/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AcademicCalendar from '../AcademicCalendar';
import { Events } from '@osu-wams/hooks';
import { mockGAEvent } from 'src/setupTests';
import { infoButtonState } from 'src/state/application';

const { academicCalendar6, academicCalendar3 } = Events.mockEvents;
const mockUseAcademicCalendarEvents = jest.fn();
const mockInitialState = jest.fn();

jest.mock('@osu-wams/hooks', () => ({
  // @ts-ignore spread object
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
  beforeEach(() => {
    mockUseAcademicCalendarEvents.mockReturnValue(academicCalendar6);
  });

  test('does not display the button when the infoButtonData is missing it', async () => {
    mockInitialState.mockReturnValue([
      {
        state: infoButtonState,
        value: [{ content: '...', id: 'some-other-id', title: '...' }],
      },
    ]);
    render(<AcademicCalendar />, {
      initialStates: mockInitialState(),
    });

    const element = screen.queryByTestId('academic-calendar');
    expect(element).not.toBeInTheDocument();
  });

  test('displays the button when the infoButtonData is included', async () => {
    mockInitialState.mockReturnValue([
      {
        state: infoButtonState,
        value: [
          { content: 'Info Button Content', id: 'academic-calendar', title: 'Info Button Title' },
        ],
      },
    ]);
    render(<AcademicCalendar />, {
      initialStates: mockInitialState(),
    });

    const element = screen.getByTestId('academic-calendar');
    expect(element).toBeInTheDocument();
  });
});
