import React from 'react';
import { wait, waitForElement, fireEvent, getAllByText } from '@testing-library/react';
import { renderWithUserContext, authUser } from '../../util/test-utils';
import { academicCalendar3 } from '../../api/__mocks__/academicCalendar.data';
import mockPlannerItems from '../../api/student/__mocks__/plannerItems.data';
import mockCourseSchedule, { mockSimpleSchedule } from '../../api/student/__mocks__/courses.data';
import ScheduleCard from '../ScheduleCard';
import { mockGAEvent } from '../../setupTests';
import { getDayShortcode } from '../schedule/schedule-utils';
import { format } from '../../util/helpers';

const getThisDate = () => {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000);
};
const mockGetStartDate = jest.fn(getThisDate);
const mockUsePlannerItems = jest.fn();
const mockUseCourseSchedule = jest.fn();
const mockUseAcademicCalendarEvents = jest.fn();
const mockNoData = { data: [], loading: false, error: false };

jest.mock('../../api/events', () => ({
  useAcademicCalendarEvents: () => mockUseAcademicCalendarEvents()
}));

jest.mock('../../api/student', () => ({
  usePlannerItems: () => mockUsePlannerItems(),
  useCourseSchedule: () => mockUseCourseSchedule()
}));

// Keeping this commented out for now
jest.mock('../schedule/schedule-utils', () => ({
  ...jest.requireActual('../schedule/schedule-utils'),
  startDate: () => mockGetStartDate()
}));

describe('<ScheduleCard /> with data and canvas authorized user', () => {
  // Set mock function result before running any tests
  beforeEach(() => {
    mockGetStartDate.mockReturnValue(getThisDate());
    mockUseAcademicCalendarEvents.mockReturnValue(academicCalendar3);
    mockUsePlannerItems.mockReturnValue(mockPlannerItems);
    mockUseCourseSchedule.mockReturnValue(mockCourseSchedule);
  });

  it('should find the card header even though it is visually hidden', async () => {
    const { getByTestId } = renderWithUserContext(<ScheduleCard />);
    expect(getByTestId('scheduleCardHeader')).toBeInTheDocument();
  });

  it('should find "Every Day Test" Course in card', async () => {
    const { getByText } = renderWithUserContext(<ScheduleCard />);

    const todayCourse = await waitForElement(() => getByText(/Every Day Test/));
    expect(todayCourse).toBeInTheDocument();
  });

  it('should find one workshop and not the meeting time set to the past', async () => {
    const { container, queryByText } = renderWithUserContext(<ScheduleCard />);
    const todayWorkshop = await waitForElement(() => getAllByText(container, /Workshop/));
    expect(todayWorkshop).toHaveLength(1);
    expect(queryByText('Joyce Collin Furman Hall Old')).not.toBeInTheDocument();
  });

  it('should find a course with a clickable map link', async () => {
    const { getByText } = renderWithUserContext(<ScheduleCard />);

    const mapLink = await waitForElement(() => getByText(/View PH 222 location/));
    fireEvent.click(mapLink);
    expect(mockGAEvent).toHaveBeenCalled();
  });

  it('should find a course without a clickable map link because it is in Bend', async () => {
    const { queryByText, getAllByTestId } = renderWithUserContext(<ScheduleCard />);
    const courses = await waitForElement(() => getAllByTestId('course-list-item-header'));
    expect(courses[0]).toHaveTextContent('WR214');
    await wait(() => {
      expect(queryByText('View WR 214 location')).not.toBeInTheDocument();
    });
  });

  it('should find a course but no MID term associated', async () => {
    const { queryByText, getAllByText } = renderWithUserContext(<ScheduleCard />);
    await waitForElement(() => getAllByText(/PH 212/));

    // Mid terms are currently excluded due to inconsistent data source
    expect(queryByText(/MID Group Events/)).not.toBeInTheDocument();
  });

  it('should find Testo Physics, open modal and find the final exam for that course', async () => {
    const { getAllByText, getByTestId } = renderWithUserContext(<ScheduleCard />);
    const course = await waitForElement(() => getAllByText(/Lecture Testo/));

    await fireEvent.click(course[0]);
    const courseDialog = await waitForElement(() => getByTestId('course-dialog'));
    expect(courseDialog).toHaveTextContent(/TESTO Physics/i);
    expect(courseDialog).toHaveTextContent(/Final Exam/i);
  });

  it('should find "Testo Planner Discussion" PlannerItem in card and click it to track analytics', async () => {
    const duePartialText = `Due ${format(new Date(), 'dueAt')}`.slice(0, -2);
    const { getByText } = renderWithUserContext(<ScheduleCard />);

    const todayPlannerItem = await waitForElement(() => getByText(/Testo Planner Discussion/));
    expect(todayPlannerItem).toBeInTheDocument();
    // Check the planner item description element to see if it has the due date text like 'Due Oct 11 at 12:`
    expect(todayPlannerItem.nextElementSibling).toHaveTextContent(duePartialText);
    fireEvent.click(todayPlannerItem);
    expect(mockGAEvent).toHaveBeenCalled();
  });

  it('should not associate a due date with a "Planner Announcement Test" PlannerItem in card', async () => {
    const { getByText } = renderWithUserContext(<ScheduleCard />);

    const todayPlannerAnnouncement = await waitForElement(() =>
      getByText(/Planner Announcement Test/)
    );

    // Select the text of description "Due today at ..."
    const dueAt =
      todayPlannerAnnouncement && todayPlannerAnnouncement.nextSibling
        ? todayPlannerAnnouncement.nextSibling.textContent
        : 'somthing went wrong';
    // Should be empty since Announcements have no due dates
    expect(dueAt).toEqual('');
  });

  it('should find "Testo Event" Academic Calendar Event in card', async () => {
    const { getByText } = renderWithUserContext(<ScheduleCard />);

    const todayCalEvent = await waitForElement(() => getByText(/Testo Event/));
    expect(todayCalEvent).toBeInTheDocument();
    fireEvent.click(todayCalEvent);
    expect(mockGAEvent).toHaveBeenCalled();
  });
});

describe('<ScheduleCard /> accessibility checks', () => {
  // Set mock function result before running any tests
  beforeEach(() => {
    mockUseAcademicCalendarEvents.mockReturnValue(academicCalendar3);
    mockUsePlannerItems.mockReturnValue(mockPlannerItems);
    mockUseCourseSchedule.mockReturnValue(mockCourseSchedule);
    mockGetStartDate.mockReturnValue(getThisDate());
  });

  it('should find appropriate aria attributes', async () => {
    renderWithUserContext(<ScheduleCard />);
    const aria = document.querySelector('[aria-live="assertive"]');

    expect(aria).toHaveAttribute('aria-atomic', 'true');
  });

  it('should navigate to the next date which should have no Canvas assignments', async () => {
    const { getByText } = renderWithUserContext(<ScheduleCard />);
    const nextDayButton = document.querySelector('button:first-child + button');
    if (nextDayButton) fireEvent.click(nextDayButton);
    const noPlannerItemsText = await waitForElement(() => getByText(/No Canvas assignments due/));

    expect(noPlannerItemsText).toBeInTheDocument();
  });
});

describe('<ScheduleCard /> without data for given days', () => {
  beforeEach(() => {
    mockUseAcademicCalendarEvents.mockReturnValue(academicCalendar3);
    mockUsePlannerItems.mockReturnValue(mockPlannerItems);
    mockUseCourseSchedule.mockReturnValue(mockCourseSchedule);
    mockGetStartDate.mockReturnValue(getThisDate());
  });
  it('should not find "Academic Calendar" subtitle since no events are present', async () => {
    mockUseAcademicCalendarEvents.mockReturnValue(mockNoData);
    const { queryByText } = renderWithUserContext(<ScheduleCard />);

    expect(queryByText('Academic Calendar')).not.toBeInTheDocument();
  });

  it(`should find "You don't have any courses scheduled for today"`, async () => {
    mockUseCourseSchedule.mockReturnValue(mockNoData);
    const { getByText } = renderWithUserContext(<ScheduleCard />);

    const noCoursesText = await waitForElement(() =>
      getByText(/You don't have any courses scheduled/)
    );
    expect(noCoursesText).toBeInTheDocument();
  });

  it('should find "No Canvas assignments" text in card', async () => {
    mockUsePlannerItems.mockReturnValue(mockNoData);
    const { getByText } = renderWithUserContext(<ScheduleCard />);

    const noPlannerItemsText = await waitForElement(() => getByText(/No Canvas assignments/));
    expect(noPlannerItemsText).toBeInTheDocument();
  });
});

describe('<ScheduleCard /> without canvas authorization', () => {
  it('should find "Authorize Canvas to see your assignments" PlannerItem in card', async () => {
    const noCanvasAuthUser = authUser;
    noCanvasAuthUser.isCanvasOptIn = false;
    noCanvasAuthUser.data.isCanvasOptIn = false;
    mockUseAcademicCalendarEvents.mockReturnValue(academicCalendar3);
    mockUsePlannerItems.mockReturnValue(mockPlannerItems);
    mockUseCourseSchedule.mockReturnValue(mockCourseSchedule);
    mockGetStartDate.mockReturnValue(getThisDate());

    const { getByText } = renderWithUserContext(<ScheduleCard />, { user: noCanvasAuthUser });

    const todayPlannerItem = await waitForElement(() =>
      getByText(/Authorize Canvas to see your assignments/)
    );
    expect(todayPlannerItem).toBeInTheDocument();
  });
});

describe('<ScheduleCard /> with a simple schedule', () => {
  // Set mock function result before running any tests
  beforeEach(() => {
    mockUseAcademicCalendarEvents.mockReturnValue(academicCalendar3);
    mockUsePlannerItems.mockReturnValue(mockPlannerItems);
  });

  [1, 2, 3, 4, 5, 6, 7].forEach(async daysAgo => {
    it(`finds meeting times ${daysAgo} days ago`, async () => {
      const d = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
      const startDate = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
      const todayShortCode = getDayShortcode(startDate);
      mockGetStartDate.mockImplementation(() => {
        return startDate;
      });
      mockUseCourseSchedule.mockReturnValueOnce(
        mockSimpleSchedule(startDate.toISOString().slice(0, 10))
      );
      const { getByText, debug } = renderWithUserContext(<ScheduleCard />);
      // debug();
      switch (todayShortCode) {
        case 'M':
        case 'F':
          const morningText = await waitForElement(() => getByText(/Morning Building/));
          expect(morningText).toBeInTheDocument();
          const mfAfternoonText = await waitForElement(() => getByText(/Afternoon Building/));
          expect(mfAfternoonText).toBeInTheDocument();
          break;
        case 'T':
        case 'Th':
        case 'Sa':
        case 'Su':
          const noCoursesText = await waitForElement(() =>
            getByText(/You don't have any courses scheduled/)
          );
          expect(noCoursesText).toBeInTheDocument();
          break;
        case 'W':
          const wAfternoonText = await waitForElement(() => getByText(/Afternoon Building/));
          expect(wAfternoonText).toBeInTheDocument();
          break;
      }
    });
  });
});
