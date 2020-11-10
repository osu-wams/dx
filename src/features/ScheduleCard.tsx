import React, { useState, useMemo } from 'react';
import { Loading } from 'src/ui/Loading';
import { isSameDay, isWithinInterval, parseISO } from 'date-fns';
import VisuallyHidden from '@reach/visually-hidden';
import { useAcademicCalendarEvents, useCourseSchedule } from '@osu-wams/hooks';
import { getNextFiveDays, coursesOnDay, startDate } from './schedule/schedule-utils';
import {
  ScheduleCardDayMenu,
  ScheduleCardCourses,
  ScheduleCardAssignments,
  ScheduleCardAcademicCalendar,
} from './schedule';
import { format } from '../util/helpers';
import { Header } from './schedule/ScheduleCardStyles';
import { Card, CardFooter, CardContent } from '../ui/Card';
import { userState, plannerItemState } from 'src/state/application';
import { useRecoilState, useRecoilValue } from 'recoil';

/**
 * Course Schedule Card
 *
 * Displays courses for the next 5 days, filterable by day.
 */
const ScheduleCard = () => {
  const [user] = useRecoilState(userState);
  const plannerItems = useRecoilValue(plannerItemState);
  const courses = useCourseSchedule();
  const nextFiveDays = getNextFiveDays(startDate());
  const [selectedDay, setSelectedDay] = useState(nextFiveDays[0]);
  const calEvents = useAcademicCalendarEvents();

  const getCoursesOnSelectedDay = () => {
    if (courses.data) {
      return coursesOnDay(courses.data, selectedDay).filter((course) => {
        course.attributes.meetingTimes = course.attributes.meetingTimes.filter((meeting) => {
          return isWithinInterval(selectedDay, {
            start: parseISO(meeting.beginDate),
            end: parseISO(meeting.endDate),
          });
        });
        return course.attributes.meetingTimes.length;
      });
    }
  };

  let selectedPlannerItems: any[] = [];

  if (user.isCanvasOptIn && Array.isArray(plannerItems.data)) {
    selectedPlannerItems = plannerItems.data.filter((item) =>
      item.plannable_date ? isSameDay(Date.parse(item.plannable_date), selectedDay) : false
    );
  }

  const selectedCalEvents = calEvents.data.filter((event) => {
    return event.pubDate ? isSameDay(Date.parse(event.pubDate), selectedDay) : '';
  });

  // Get a list of days with courses or assignments.
  // Used to display the orange dots above days to indicate
  // which days have events at a quick glance.
  const daysWithEvents = useMemo(
    () =>
      nextFiveDays.filter((day) => {
        const hasCourses = coursesOnDay(courses.data ?? [], day).length > 0;
        const calendarEventsOnDay = calEvents.data.filter((event) => {
          return event.pubDate ? isSameDay(Date.parse(event.pubDate), day) : '';
        });

        let plannerItemsOnDay: any[] = [];
        if (user.isCanvasOptIn && Array.isArray(plannerItems.data)) {
          plannerItemsOnDay = plannerItems.data.filter((item) => {
            return item.plannable_date ? isSameDay(Date.parse(item.plannable_date), day) : false;
          });
        }

        return hasCourses || plannerItemsOnDay.length > 0 || calendarEventsOnDay.length > 0;
      }),
    [nextFiveDays, plannerItems.data, calEvents.data, courses.data, user.isCanvasOptIn]
  );

  return (
    <Card collapsing={false}>
      <VisuallyHidden>
        <Header data-testid="scheduleCardHeader">{format(selectedDay, 'EEEE MMMM d')}</Header>
      </VisuallyHidden>
      <CardContent>
        <ScheduleCardDayMenu
          nextFiveDays={nextFiveDays}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          daysWithEvents={daysWithEvents}
        />
        {plannerItems.isLoading && <Loading lines={4} />}
        <div aria-live="assertive" aria-atomic="true">
          {courses.data && courses.isSuccess && !plannerItems.isLoading && (
            <ScheduleCardAssignments
              courseList={courses.data}
              selectedPlannerItems={selectedPlannerItems}
            />
          )}
          {courses.isLoading && <Loading lines={4} />}
          {courses.isSuccess && courses.data && (
            <ScheduleCardCourses
              courses={courses.data}
              selectedCourses={getCoursesOnSelectedDay() ?? []}
            />
          )}
          <ScheduleCardAcademicCalendar calEvents={selectedCalEvents} />
        </div>
      </CardContent>
      <CardFooter infoButtonId="schedule-card"></CardFooter>
    </Card>
  );
};

export default ScheduleCard;
