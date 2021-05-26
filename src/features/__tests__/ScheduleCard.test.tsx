/* eslint-disable testing-library/no-node-access */
import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithAllContexts as render, authUser } from 'src/util/test-utils';
import { State, Events, Student } from '@osu-wams/hooks';
import ScheduleCard from '../ScheduleCard';
import { mockGAEvent, mockInitialState } from 'src/setupTests';
import { getDayShortcode } from '../schedule/schedule-utils';
import { Helpers } from '@osu-wams/utils';
import { mockCourseSchedule } from 'src/mocks/handlers';

const { courseState, plannerItemState } = State;
const mockPlannerItems = Student.PlannerItems.mockPlannerItems;
const mockSimpleSchedule = Student.CourseSchedule.mockCourseSchedule.simpleSchedule;
const getThisDate = (): number => {
  return Date.now();
};
const mockGetStartDate = jest.fn();
const { academicCalendar3 } = Events.mockEvents;
const mockUseAcademicCalendarEvents = jest.fn();
const mockNoData = { data: [], loading: false, error: false };
const mockUser = jest.fn();

jest.mock('@osu-wams/hooks', () => {
  return {
    // @ts-ignore spread error on object only
    ...jest.requireActual('@osu-wams/hooks'),
    useAcademicCalendarEvents: () => mockUseAcademicCalendarEvents(),
    usePlannerItems: () => jest.fn(),
  };
});

jest.mock('../schedule/schedule-utils', () => ({
  // @ts-ignore spread error on object only
  ...jest.requireActual('../schedule/schedule-utils'),
  startDate: () => mockGetStartDate(),
}));

describe('<ScheduleCard /> with data and canvas authorized user', () => {
  // Set mock function result before running any tests
  beforeEach(() => {
    mockGetStartDate.mockReturnValue(getThisDate());
    mockUseAcademicCalendarEvents.mockReturnValue(academicCalendar3);
    mockInitialState.mockReturnValue([
      {
        state: plannerItemState,
        value: {
          data: mockPlannerItems.data,
          isLoading: false,
          isSuccess: true,
          error: null,
        },
      },
      {
        state: courseState,
        value: {
          isLoading: false,
          isError: false,
          isSuccess: true,
          data: mockCourseSchedule,
        },
      },
    ]);
  });

  it('should find the card header even though it is visually hidden', async () => {
    render(<ScheduleCard />, { initialStates: mockInitialState() });
    expect(screen.getByTestId('scheduleCardHeader')).toBeInTheDocument();
  });

  it('should find current and not past course in schedule', async () => {
    render(<ScheduleCard />, { initialStates: mockInitialState() });

    const todayCourse = screen.getByText(/Every Day Test/);
    expect(todayCourse).toBeInTheDocument();
    expect(screen.queryByText('Joyce Collin Furman Hall Old')).not.toBeInTheDocument();
  });

  it('should find a course with a clickable map link', async () => {
    render(<ScheduleCard />, { initialStates: mockInitialState() });

    const mapLink = screen.getByText(/View PH 222 location/);
    userEvent.click(mapLink);
    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });

  it('should find a course without a clickable map link because it is in Bend', async () => {
    render(<ScheduleCard />, { initialStates: mockInitialState() });
    const courses = screen.getAllByTestId('course-list-item-header');
    expect(courses[0]).toHaveTextContent('WR214');

    expect(screen.queryByText('View WR 214 location on map')).not.toBeInTheDocument();
  });

  it('should find a course without a clickable map link because it is a remote learning course', async () => {
    render(<ScheduleCard />, { initialStates: mockInitialState() });
    const courses = screen.getAllByTestId('course-list-item-header');
    expect(courses[2]).toHaveTextContent('RL100');

    expect(screen.queryByText('View RL 100 location on map')).not.toBeInTheDocument();
  });

  it('should find a course without a clickable map link because it is a group event', async () => {
    render(<ScheduleCard />, { initialStates: mockInitialState() });
    const courses = screen.getAllByTestId('course-list-item-header');
    expect(courses[3]).toHaveTextContent('GP100');

    expect(screen.queryByText('View GP 100 location on map')).not.toBeInTheDocument();
  });

  it('should find a course but no MID term associated', async () => {
    render(<ScheduleCard />, { initialStates: mockInitialState() });
    screen.getAllByText(/PH 212/);

    // Mid terms are currently excluded due to inconsistent data source
    expect(screen.queryByText(/MID Group Events/)).not.toBeInTheDocument();
  });

  it('should find Testo Physics, open modal and find the final exam for that course', async () => {
    render(<ScheduleCard />, { initialStates: mockInitialState() });
    const course = screen.getAllByText(/Lecture Testo/);

    userEvent.click(course[0]);
    const courseDialog = screen.getByTestId('course-dialog');
    expect(courseDialog).toHaveTextContent(/TESTO Physics/i);
    expect(courseDialog).toHaveTextContent(/Final Exam/i);
  });

  it('should find "Testo Planner Discussion" PlannerItem in card and click it to track analytics', async () => {
    const duePartialText = `Due ${Helpers.format(new Date(), 'dueAt')}`.slice(0, -5);
    render(<ScheduleCard />, { initialStates: mockInitialState() });

    const todayPlannerItem = screen.getByText(/Testo Planner Discussion/);
    expect(todayPlannerItem).toBeInTheDocument();
    // Check the planner item description element to see if it has the due date text like 'Due Oct 11 at 12:`
    expect(todayPlannerItem.nextElementSibling).toHaveTextContent(duePartialText);
    userEvent.click(todayPlannerItem);
    expect(mockGAEvent).toHaveBeenCalled();
  });

  it('should not associate a due date with a "Planner Announcement Test" PlannerItem in card', async () => {
    render(<ScheduleCard />, { initialStates: mockInitialState() });

    const todayPlannerAnnouncement = screen.getByText(/Planner Announcement Test/);

    // Select the text of description "Due today at ..."
    const dueAt =
      todayPlannerAnnouncement && todayPlannerAnnouncement.nextSibling
        ? todayPlannerAnnouncement.nextSibling.textContent
        : 'something went wrong';
    // Should be empty since Announcements have no due dates
    expect(dueAt).toEqual('');
  });

  it('should find "Testo Event" Academic Calendar Event in card', async () => {
    render(<ScheduleCard />, { initialStates: mockInitialState() });

    const todayCalEvent = screen.getByText(/Testo Event/);
    expect(todayCalEvent).toBeInTheDocument();
    userEvent.click(todayCalEvent);
    expect(mockGAEvent).toHaveBeenCalledTimes(1);
  });
});

describe('<ScheduleCard /> accessibility checks', () => {
  // Set mock function result before running any tests
  beforeEach(() => {
    mockUseAcademicCalendarEvents.mockReturnValue(academicCalendar3);
    mockGetStartDate.mockReturnValue(getThisDate());
    mockInitialState.mockReturnValue([
      {
        state: plannerItemState,
        value: {
          data: mockPlannerItems.data,
          isLoading: false,
          isSuccess: true,
          error: null,
        },
      },
      {
        state: courseState,
        value: {
          isLoading: false,
          isError: false,
          isSuccess: true,
          data: mockCourseSchedule,
        },
      },
    ]);
  });

  it('should find appropriate aria attributes', async () => {
    render(<ScheduleCard />, { initialStates: mockInitialState() });
    const aria = document.querySelector('[aria-live="assertive"]');

    expect(aria).toHaveAttribute('aria-atomic', 'true');
  });

  it('should navigate to the next date which should have no Canvas assignments', async () => {
    render(<ScheduleCard />, { initialStates: mockInitialState() });
    const nextDayButton = document.querySelector('button:first-child + button');
    if (nextDayButton) userEvent.click(nextDayButton);
    const noPlannerItemsText = screen.getByText(/No Canvas assignments due/);

    expect(noPlannerItemsText).toBeInTheDocument();
  });
});

describe('<ScheduleCard /> without data for given days', () => {
  beforeEach(() => {
    mockUseAcademicCalendarEvents.mockReturnValue(academicCalendar3);
    mockGetStartDate.mockReturnValue(getThisDate());
  });
  it('should not find "Academic Calendar" subtitle since no events are present', async () => {
    mockUseAcademicCalendarEvents.mockReturnValue(mockNoData);
    mockInitialState.mockReturnValue([
      {
        state: plannerItemState,
        value: {
          data: mockPlannerItems.data,
          isLoading: false,
          error: null,
          isSuccess: true,
        },
      },
      {
        state: courseState,
        value: {
          isLoading: false,
          isError: false,
          isSuccess: true,
          data: mockCourseSchedule,
        },
      },
    ]);
    render(<ScheduleCard />, { initialStates: mockInitialState() });

    expect(screen.queryByText('Academic Calendar')).not.toBeInTheDocument();
  });

  it(`should find "You don't have any courses scheduled for today"`, async () => {
    mockInitialState.mockReturnValue([
      {
        state: plannerItemState,
        value: {
          data: mockPlannerItems.data,
          isLoading: false,
          error: null,
          isSuccess: true,
        },
      },
      {
        state: courseState,
        value: {
          isLoading: false,
          isError: false,
          isSuccess: true,
          data: [],
        },
      },
    ]);
    render(<ScheduleCard />, { initialStates: mockInitialState() });

    const noCoursesText = screen.getByText(/You don't have any courses scheduled/);

    expect(noCoursesText).toBeInTheDocument();
  });

  it('should find "No Canvas assignments" text in card', async () => {
    mockInitialState.mockReturnValue([
      {
        state: plannerItemState,
        value: {
          data: [],
          isLoading: false,
          isSuccess: true,
          error: null,
        },
      },
      {
        state: courseState,
        value: {
          isLoading: false,
          isError: false,
          isSuccess: true,
          data: mockCourseSchedule,
        },
      },
    ]);
    render(<ScheduleCard />, { initialStates: mockInitialState(), user: authUser });

    const noPlannerItemsText = screen.getByText(/No Canvas assignments due/);
    expect(noPlannerItemsText).toBeInTheDocument();
  });
});

describe('<ScheduleCard /> without canvas authorization', () => {
  it('should find "Authorize Canvas to see your assignments" PlannerItem in card', async () => {
    mockUser.mockReturnValue({
      ...authUser,
      data: {
        ...authUser.data,
        isCanvasOptIn: false,
      },
      isCanvasOptIn: false,
    });
    mockUseAcademicCalendarEvents.mockReturnValue(academicCalendar3);
    mockGetStartDate.mockReturnValue(getThisDate());
    mockInitialState.mockReturnValue([
      {
        state: plannerItemState,
        value: {
          data: mockPlannerItems.data,
          isLoading: false,
          isSuccess: true,
          error: null,
        },
      },
      {
        state: courseState,
        value: {
          isLoading: false,
          isError: false,
          isSuccess: true,
          data: mockCourseSchedule,
        },
      },
    ]);

    render(<ScheduleCard />, { user: mockUser(), initialStates: mockInitialState() });

    const todayPlannerItem = screen.getByText(/Authorize Canvas to see your assignments/);

    expect(todayPlannerItem).toBeInTheDocument();
  });
});

describe('<ScheduleCard /> with a simple schedule', () => {
  // Set mock function result before running any tests
  beforeEach(() => {
    mockUseAcademicCalendarEvents.mockReturnValue(academicCalendar3);
  });

  [1, 2, 3, 4, 5, 6, 7].forEach(async (daysAgo) => {
    it(`finds meeting times ${daysAgo} days ago`, async () => {
      const startDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
      const todayShortCode = getDayShortcode(startDate);
      mockGetStartDate.mockImplementation(() => {
        return startDate.getTime();
      });
      const singleCourseData = mockSimpleSchedule(startDate.toISOString().slice(0, 10));
      mockInitialState.mockReturnValue([
        {
          state: plannerItemState,
          value: {
            data: mockPlannerItems.data,
            isLoading: false,
            error: null,
            isSuccess: true,
          },
        },
        {
          state: courseState,
          value: {
            isLoading: false,
            isError: false,
            isSuccess: true,
            data: singleCourseData.data,
          },
        },
      ]);
      render(<ScheduleCard />, {
        initialStates: mockInitialState(),
      });
      switch (todayShortCode) {
        case 'M':
        case 'F':
          const buildingText = screen.getAllByText(/Building/);
          expect(buildingText).toHaveLength(2);
          break;
        case 'T':
        case 'Th':
        case 'Sa':
        case 'Su':
          const noCoursesText = screen.getByText(/You don't have any courses scheduled/);
          expect(noCoursesText).toBeInTheDocument();
          break;
        case 'W':
          const afternoonText = screen.getByText(/Afternoon/);
          expect(afternoonText).toBeInTheDocument();
          break;
      }
    });
  });
});

describe('<ScheduleCard /> while OSU API is failing', () => {
  beforeEach(() => {
    mockGetStartDate.mockReturnValue(getThisDate());
  });
  it('should render planner items with default icon instead of course-subject', async () => {
    mockUseAcademicCalendarEvents.mockReturnValue(mockNoData);
    mockInitialState.mockReturnValue([
      {
        state: plannerItemState,
        value: {
          data: mockPlannerItems.data,
          isLoading: false,
          error: null,
          isSuccess: true,
        },
      },
      {
        state: courseState,
        value: {
          isLoading: false,
          isError: true,
          isSuccess: false,
          data: [],
        },
      },
    ]);
    render(<ScheduleCard />, { initialStates: mockInitialState() });

    expect(screen.queryAllByTestId('planner-icon')).toHaveLength(2);
  });
});
