import React from 'react';
import { render } from 'src/util/test-utils';
import AcademicsDashboard from '../Academics/AcademicsDashboard';
import { screen } from '@testing-library/react';
import { academicAnnouncementResult } from 'src/mocks/handlers';
import { mockInitialState } from 'src/setupTests';
import { announcementState } from 'src/state';
import { ANNOUNCEMENT_PAGES } from 'src/state/announcements';
import { Events } from '@osu-wams/hooks';

const { academicCalendar6 } = Events.mockEvents;
const mockUseAcademicCalendarEvents = jest.fn();

jest.mock('@osu-wams/hooks', () => {
  return {
    // @ts-ignore spread error on object only
    ...jest.requireActual('@osu-wams/hooks'),
    useAcademicCalendarEvents: () => mockUseAcademicCalendarEvents(),
  };
});

describe('<AcademicsDashboard />', () => {
  beforeEach(() => {
    mockInitialState.mockReturnValueOnce([
      {
        state: announcementState(ANNOUNCEMENT_PAGES.academics),
        value: {
          isLoading: false,
          isError: false,
          isSuccess: true,
          data: academicAnnouncementResult.data,
        },
      },
    ]);
    mockUseAcademicCalendarEvents.mockReturnValue(academicCalendar6);
  });

  it('renders without errors', async () => {
    render(<AcademicsDashboard />, { initialStates: mockInitialState() });
    screen.getByTestId('academics-dashboard');
  });

  it('should render Announcements and event cards when at least one event is present', async () => {
    render(<AcademicsDashboard />, { initialStates: mockInitialState() });
    expect(screen.getByTestId('academics-announcements')).toBeInTheDocument();
    expect(screen.getAllByTestId('eventcard')).toHaveLength(2);
  });
});

describe('with no events', () => {
  it('should not render Announcements with no events', async () => {
    mockInitialState.mockReturnValueOnce([
      {
        state: announcementState(ANNOUNCEMENT_PAGES.academics),
        value: {
          isLoading: false,
          isError: false,
          isSuccess: true,
          data: [],
        },
      },
    ]);
    mockUseAcademicCalendarEvents.mockReturnValue(academicCalendar6);

    render(<AcademicsDashboard />, { initialStates: mockInitialState() });

    // Finds Academic Calendar Events
    expect(screen.getByText(/Week Zero Summer Session Ends/i)).toBeInTheDocument();

    // Does not render Academic Announcements
    expect(screen.queryByTestId('academics-announcements')).not.toBeInTheDocument();
  });
});
