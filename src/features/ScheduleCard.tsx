import React, { useState, useEffect, useContext, useMemo } from 'react';
import { isSameDay } from 'date-fns';
import generateId from 'uuid/v4';
import { getCourseSchedule } from '../api/student';
import { getPlannerItems } from '../api/student/planner-items';
import { UserContext } from '../App';
import { getNextFiveDays, getDayShortcode } from './schedule/schedule-utils';
import { ScheduleCardDayMenu, ScheduleCardCourses, ScheduleCardAssignments } from './schedule';
import { Header, Card } from './schedule/ScheduleCardStyles';

/**
 * Course Schedule Card
 *
 * Displays courses for the next 5 days, filterable by day.
 */
const ScheduleCard = () => {
  const nextFiveDays = getNextFiveDays();
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedDay, setSelectedDay] = useState(nextFiveDays[0]);
  const [plannerItems, setPlannerItems] = useState<any[]>([]);
  const user = useContext<any>(UserContext);

  // Populate user courses
  useEffect(() => {
    getCourseSchedule()
      .then(data => {
        // Course data has individual meeting times (recitation, lab, lecture, etc.)
        // as an array in attributes. We actually want a list of meeting times, but still
        // need other relevant course data. Transform data prior to setting state.
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
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    getPlannerItems()
      .then(data => {
        setPlannerItems(data);
      })
      .catch(console.log);
  }, []);

  const getCoursesOnSelectedDay = () => {
    let selectedDayShortcode = getDayShortcode(selectedDay);
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
  // const selectedPlannerItems = [];
  // Get a list of days with courses or assignments.
  // Used to display the orange dots above days to indicate
  // which days have events at a quick glance.
  const daysWithEvents = useMemo(
    () =>
      nextFiveDays.filter(day => {
        let dayShortcode = getDayShortcode(day);
        const coursesOnDay = courses.filter(course => course.weeklySchedule.includes(dayShortcode));
        let plannerItemsOnDay;
        if (user.canvasOauthToken) {
          plannerItemsOnDay = plannerItems.filter(item =>
            item.plannable.due_at ? isSameDay(item.plannable.due_at, day) : ''
          );
        } else {
          plannerItemsOnDay = [];
        }
        return coursesOnDay.length > 0 || plannerItemsOnDay.length > 0;
      }),
    [nextFiveDays, plannerItems, courses]
  );

  return (
    <Card>

      <Header>Day at a Glance</Header>
      
      <ScheduleCardDayMenu nextFiveDays={nextFiveDays} selectedDay={selectedDay} setSelectedDay={setSelectedDay} daysWithEvents={daysWithEvents} />
      
      <ScheduleCardAssignments selectedPlannerItems={selectedPlannerItems} />

      <ScheduleCardCourses selectedCourses={selectedCourses} />
      
    </Card>
  );
};

export default ScheduleCard;
