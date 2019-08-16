import React from 'react';
import { waitForElement } from '@testing-library/react';
import { format } from 'date-fns';
import { renderWithUserContext } from '../../util/test-utils';
import { academicCalendar3 } from '../../api/__mocks__/academicCalendar.data';
import mockPlannerItems from '../../api/student/__mocks__/plannerItems.data';
import mockCourseSchedule from '../../api/student/__mocks__/courses.data';
import ScheduleCard from '../ScheduleCard';

const mockGetPlannerItems = jest.fn();
const mockGetCourseSchedule = jest.fn();
const mockGetAcademicCalendarEvents = jest.fn();

jest.mock('../../api/events', () => ({
  getAcademicCalendarEvents: () => mockGetAcademicCalendarEvents()
}));
jest.mock('../../api/student', () => ({
  getPlannerItems: () => mockGetPlannerItems(),
  getCourseSchedule: () => mockGetCourseSchedule()
}));

describe('<ScheduleCard /> with data and canvas authorized user', () => {
  // Set mock function result before running any tests
  beforeAll(() => {
    mockGetAcademicCalendarEvents.mockResolvedValue(Promise.resolve(academicCalendar3));
    mockGetPlannerItems.mockResolvedValue(Promise.resolve(mockPlannerItems));
    mockGetCourseSchedule.mockResolvedValue(Promise.resolve(mockCourseSchedule));
  });

  it('should find "Day at a Glance" card title', async () => {
    const { getByText } = renderWithUserContext(<ScheduleCard />);
    expect(getByText('Day at a Glance')).toBeInTheDocument();
  });

  it('should find "Every Day Test" Course in card', async () => {
    const { getByText } = renderWithUserContext(<ScheduleCard />);

    const todayCourse = await waitForElement(() => getByText(/Every Day Test/));
    expect(todayCourse).toBeInTheDocument();
  });

  it('should find "Testo Planner Discussion" PlannerItem in card', async () => {
    const { getByText } = renderWithUserContext(<ScheduleCard />);

    const todayPlannerItem = await waitForElement(() => getByText(/Testo Planner Discussion/));
    expect(todayPlannerItem).toBeInTheDocument();
  });

  it('should not associate a due date with a "Planner Announcement Test" PlannerItem in card', async () => {
    const { getByText } = renderWithUserContext(<ScheduleCard />);

    const todayPlannerAnnouncement = await waitForElement(() =>
      getByText(/Planner Announcement Test/)
    );

    // Select the text of description "Due today at ..."
    const dueAt = todayPlannerAnnouncement.nextSibling.textContent;
    // Should be empty since Announcements have no due dates
    expect(dueAt).toEqual('');
  });

  it('should find "Testo Event" Academic Calendar Event in card', async () => {
    const { getByText } = renderWithUserContext(<ScheduleCard />);

    const todayCalEvent = await waitForElement(() => getByText(/Testo Event/));
    expect(todayCalEvent).toBeInTheDocument();
  });
});

describe('<ScheduleCard /> without data for given days', () => {
  it('should not find "Academic Calendar" subtitle since no events are present', async () => {
    mockGetAcademicCalendarEvents.mockResolvedValue(Promise.resolve([]));
    const { queryByText } = renderWithUserContext(<ScheduleCard />);

    expect(queryByText('Academic Calendar')).not.toBeInTheDocument();
  });

  it(`should find "You don't have any courses scheduled for today"`, async () => {
    mockGetCourseSchedule.mockResolvedValue(Promise.resolve([]));
    const { getByText } = renderWithUserContext(<ScheduleCard />);

    const noCoursesText = await waitForElement(() =>
      getByText(/You don't have any courses scheduled for today/)
    );
    expect(noCoursesText).toBeInTheDocument();
  });

  it('should find "No Canvas assignments" text in card', async () => {
    mockGetPlannerItems.mockResolvedValue(Promise.resolve([]));
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
