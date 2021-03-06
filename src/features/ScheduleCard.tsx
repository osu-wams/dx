import React, { useState, useMemo } from 'react';
import { Loading } from 'src/ui/Loading';
import { isSameDay } from 'date-fns';
import VisuallyHidden from '@reach/visually-hidden';
import { State, useAcademicCalendarEvents, useCourseScheduleState } from '@osu-wams/hooks';
import { getNextFiveDays, coursesOnDay, startDate } from './schedule/schedule-utils';
import {
  ScheduleCardDayMenu,
  ScheduleCardCourses,
  ScheduleCardAssignments,
  ScheduleCardAcademicCalendar,
} from './schedule';
import { Helpers } from '@osu-wams/utils';
import { Header } from './schedule/ScheduleCardStyles';
import { Card, CardFooter, CardContent } from '../ui/Card';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Types } from '@osu-wams/lib';

const { userState, plannerItemState } = State;

const selectedCalEvents = (selectedDay: Date, data?: Types.AcademicEvent[]) => {
  if (!Array.isArray(data)) return [];

  return data.filter((event) => {
    return event.pubDate ? isSameDay(Date.parse(event.pubDate), selectedDay) : '';
  });
};

/**
 * Course Schedule Card
 *
 * Displays courses for the next 5 days, filterable by day.
 */
const ScheduleCard = () => {
  const [user] = useRecoilState(userState);
  const plannerItems = useRecoilValue(plannerItemState);
  const { courses } = useCourseScheduleState();
  const nextFiveDays = getNextFiveDays(startDate());
  const [selectedDay, setSelectedDay] = useState(nextFiveDays[0]);
  const calEvents = useAcademicCalendarEvents();

  let selectedPlannerItems: any[] = [];

  if (user.isCanvasOptIn && Array.isArray(plannerItems.data)) {
    selectedPlannerItems = plannerItems.data.filter((item) =>
      item.plannable_date ? isSameDay(Date.parse(item.plannable_date), selectedDay) : false
    );
  }

  // Get a list of days with courses or assignments.
  // Used to display the orange dots above days to indicate
  // which days have events at a quick glance.
  const daysWithEvents = useMemo(
    () =>
      nextFiveDays.filter((day) => {
        const hasCourses = coursesOnDay(courses.data ?? [], day).length > 0;
        const calendarEventsOnDay = (calEvents.data ?? []).filter((event) => {
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
        <Header data-testid="scheduleCardHeader">
          {Helpers.format(selectedDay, 'EEEE MMMM d')}
        </Header>
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
          {!plannerItems.isLoading && (
            <ScheduleCardAssignments
              courseList={courses.data}
              selectedPlannerItems={selectedPlannerItems}
            />
          )}
          {courses.isLoading && <Loading lines={4} />}
          {courses.isSuccess && courses.data && (
            <ScheduleCardCourses courses={courses.data} selectedDay={selectedDay} />
          )}
          <ScheduleCardAcademicCalendar
            calEvents={selectedCalEvents(selectedDay, calEvents.data)}
          />
        </div>
      </CardContent>
      <CardFooter infoButtonId="schedule-card"></CardFooter>
    </Card>
  );
};

export default ScheduleCard;
