import React, { useState, useEffect, useContext, useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';
import { isSameDay, format } from 'date-fns';
import generateId from 'uuid/v4';
import VisuallyHidden from '@reach/visually-hidden';
import { getCourseSchedule, getPlannerItems } from '../api/student';
import { getAcademicCalendarEvents, IEvents } from '../api/events';
import { UserContext } from '../App';
import { getNextFiveDays, getDayShortcode } from './schedule/schedule-utils';
import {
  ScheduleCardDayMenu,
  ScheduleCardCourses,
  ScheduleCardAssignments,
  ScheduleCardAcademicCalendar
} from './schedule';
import { Header, Card } from './schedule/ScheduleCardStyles';

/**
 * Course Schedule Card
 *
 * Displays courses for the next 5 days, filterable by day.
 */
const ScheduleCard = () => {
  const nextFiveDays = getNextFiveDays();
  const [courses, setCourses] = useState<any[]>([]);
  const [coursesLoading, setCoursesLoading] = useState<boolean>(true);
  const [selectedDay, setSelectedDay] = useState(nextFiveDays[0]);
  const [plannerItems, setPlannerItems] = useState<any[]>([]);
  const [plannerItemsLoading, setPlannerItemsLoading] = useState<boolean>(true);
  const [calEvents, setCalEvents] = useState<IEvents | []>([]);
  const user = useContext<any>(UserContext);

  // Populate user courses
  useEffect(() => {
    let isMounted = true;
    getCourseSchedule()
      .then(data => {
        // Course data has individual meeting times (recitation, lab, lecture, etc.)
        // as an array in attributes. We actually want a list of meeting times, but still
        // need other relevant course data. Transform data prior to setting state.
        if (isMounted) {
          const _courses: any = [];
          data.forEach(item => {
            const {
              attributes: { meetingTimes, ...otherAttributes }
            } = item;
            meetingTimes.forEach(meetingTime => {
              const course: any = {
                id: generateId(),
                ...meetingTime,
                ...otherAttributes
              };
              _courses.push(course);
            });
          });

          setCourses(_courses);
          setCoursesLoading(false);
        }
      })
      .catch(console.log);

    return () => {
      // prevents setting data on a component that has been unmounted before promise resolves
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    getPlannerItems()
      .then(data => {
        if (isMounted) {
          setPlannerItems(data);
          setPlannerItemsLoading(false);
        }
      })
      .catch(console.log);

    return () => {
      // prevents setting data on a component that has been unmounted before promise resolves
      isMounted = false;
    };
  }, []);

  // Populate assignment data for current user
  useEffect(() => {
    let isMounted = true;
    getAcademicCalendarEvents()
      .then(isMounted && setCalEvents)
      .catch(console.log);

    return () => {
      isMounted = false;
    };
  }, []);

  const getCoursesOnSelectedDay = () => {
    const selectedDayShortcode = getDayShortcode(selectedDay);
    const coursesOnSelectedDay = courses.filter(course =>
      course.weeklySchedule.includes(selectedDayShortcode)
    );
    return coursesOnSelectedDay;
  };

  // Get courses and assignments matching selected day.
  const selectedCourses = getCoursesOnSelectedDay();

  let selectedPlannerItems;
  if (user.isCanvasOptIn) {
    selectedPlannerItems = plannerItems.filter(item =>
      item.plannable.due_at ? isSameDay(item.plannable.due_at, selectedDay) : ''
    );
  } else {
    selectedPlannerItems = [];
  }

  let selectedCalEvents = calEvents.filter(event =>
    event.pubDate ? isSameDay(event.pubDate, selectedDay) : ''
  );

  // Get a list of days with courses or assignments.
  // Used to display the orange dots above days to indicate
  // which days have events at a quick glance.
  const daysWithEvents = useMemo(
    () =>
      nextFiveDays.filter(day => {
        const dayShortcode = getDayShortcode(day);
        const coursesOnDay = courses.filter(course => course.weeklySchedule.includes(dayShortcode));
        let plannerItemsOnDay;
        if (user.isCanvasOptIn) {
          plannerItemsOnDay = plannerItems.filter(item =>
            item.plannable.due_at ? isSameDay(item.plannable.due_at, day) : ''
          );
        } else {
          plannerItemsOnDay = [];
        }
        let calendarEventsOnDay = calEvents.filter(event =>
          event.pubDate ? isSameDay(event.pubDate, day) : ''
        );

        return (
          coursesOnDay.length > 0 || plannerItemsOnDay.length > 0 || calendarEventsOnDay.length > 0
        );
      }),
    [nextFiveDays, plannerItems, calEvents, courses, user.isCanvasOptIn]
  );

  return (
    <Card>
      <VisuallyHidden>
        <Header data-testid="scheduleCardHeader">{format(selectedDay, 'dddd MMMM D')}</Header>
      </VisuallyHidden>
      <ScheduleCardDayMenu
        nextFiveDays={nextFiveDays}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        daysWithEvents={daysWithEvents}
      />
      {plannerItemsLoading && <Skeleton count={4} />}
      <div aria-live="assertive" aria-atomic="true">
        {!plannerItemsLoading && (
          <ScheduleCardAssignments selectedPlannerItems={selectedPlannerItems} />
        )}
        {coursesLoading && <Skeleton count={4} />}
        {!coursesLoading && <ScheduleCardCourses selectedCourses={selectedCourses} />}
        <ScheduleCardAcademicCalendar calEvents={selectedCalEvents} />
      </div>
    </Card>
  );
};

export default ScheduleCard;
