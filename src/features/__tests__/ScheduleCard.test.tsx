import React from 'react';
import { wait, waitForElement, fireEvent } from '@testing-library/react';
import { renderWithUserContext } from '../../util/test-utils';
import { academicCalendar3 } from '../../api/__mocks__/academicCalendar.data';
import mockPlannerItems from '../../api/student/__mocks__/plannerItems.data';
import mockCourseSchedule from '../../api/student/__mocks__/courses.data';
import ScheduleCard from '../ScheduleCard';
import { mockGAEvent } from '../../setupTests';
import { format } from 'date-fns';

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

describe('<ScheduleCard /> with data and canvas authorized user', () => {
  // Set mock function result before running any tests
  beforeAll(() => {
    mockUseAcademicCalendarEvents.mockReturnValue(academicCalendar3);
    mockUsePlannerItems.mockReturnValue(mockPlannerItems);
    mockUseCourseSchedule.mockReturnValue(mockCourseSchedule);
  });

  it('should find the card header even though it is visually hidden', async () => {
    const { getByTestId } = renderWithUserContext(<ScheduleCard />);
    expect(getByTestId('scheduleCardHeader')).toBeInTheDocument();
  });

  it('should find "Every Day Test" Course in card and have clickable map link', async () => {
    const { getByText } = renderWithUserContext(<ScheduleCard />);

    const todayCourse = await waitForElement(() => getByText(/Every Day Test/));
    expect(todayCourse).toBeInTheDocument();
  });

  it('should find a course with a clickable map link', async () => {
    const { getByText } = renderWithUserContext(<ScheduleCard />);

    const mapLink = await waitForElement(() => getByText(/View PH 222 location/));
    fireEvent.click(mapLink);
    expect(mockGAEvent).toHaveBeenCalled();
  });

  it('should find a course without a clickable map link', async () => {
    const { queryByText, getByText } = renderWithUserContext(<ScheduleCard />);
    const course = await waitForElement(() => getByText(/WR 214/));
    expect(course).toBeInTheDocument();
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

  it('should find "Testo Planner Discussion" PlannerItem in card and click it to track analytics', async () => {
    const duePartialText = `Due ${format(new Date(), 'MMM Do [at] h:')}`;
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
  beforeAll(() => {
    mockUseAcademicCalendarEvents.mockReturnValue(academicCalendar3);
    mockUsePlannerItems.mockReturnValue(mockPlannerItems);
    mockUseCourseSchedule.mockReturnValue(mockCourseSchedule);
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
  const noCanvasAuthUser = {
    osuId: '123',
    email: 'testo@oregonstate.edu',
    firstName: 'Testo',
    lastName: 'LastTesto',
    isAdmin: true,
    isCanvasOptIn: false
  };

  it('should find "Authorize Canvas to see your assignments" PlannerItem in card', async () => {
    const { getByText } = renderWithUserContext(<ScheduleCard />, { user: noCanvasAuthUser });

    const todayPlannerItem = await waitForElement(() =>
      getByText(/Authorize Canvas to see your assignments/)
    );
    expect(todayPlannerItem).toBeInTheDocument();
  });
});
