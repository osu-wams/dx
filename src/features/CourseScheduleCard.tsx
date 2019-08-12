import React, { useState, useEffect, useContext, useMemo } from 'react';
import { faFileAlt, faMapMarkerAlt, faArrowRight } from '@fortawesome/pro-light-svg-icons';
import { format, isSameDay } from 'date-fns';
import generateId from 'uuid/v4';
import {
  List,
  ListItem,
  ListItemHeader,
  ListItemContentButton,
  ListItemDescription,
  ListItemText,
  ListItemContentLink
} from '../ui/List';
import Icon from '../ui/Icon';
import { Color } from '../theme';
import excitedCalendarIcon from '../assets/excited-calendar.svg';
import { getCourseSchedule } from '../api/student';
import { getPlannerItems } from '../api/student/planner-items';
import { formatTime } from '../util/helpers';
import { getIconByScheduleType } from './course-utils';
import VisuallyHidden from '@reach/visually-hidden';
import Url from '../util/externalUrls.data';
import { UserContext } from '../App';
import { getNextFiveDays, getDayShortcode } from './schedule/schedule-utils';
import { DayMenu } from './schedule/DayMenu';
import { Assignments} from './schedule/Assignments';
import { Header, Card, CardSection, SectionHeader } from './schedule/ScheduleStyles';

/**
 * Course Schedule Card
 *
 * Displays courses for the next 5 days, filterable by day.
 */
const CourseScheduleCard = () => {
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
      <Header>{format(selectedDay, 'dddd MMM Do')} | Day at a Glance </Header>
      
      <DayMenu nextFiveDays={nextFiveDays} selectedDay={selectedDay} setSelectedDay={setSelectedDay} daysWithEvents={daysWithEvents} />
      
      <Assignments selectedPlannerItems={selectedPlannerItems} />

      {selectedCourses.length > 0 && (
        <CardSection>
          {/* TODO: course should NOT be a link */}
          <SectionHeader>Courses</SectionHeader>
          <List>
            {selectedCourses.map(course => (
              <ListItem key={`${course.id}${course.beginTime}`}>
                <ListItemContentButton>
                  <Icon
                    icon={getIconByScheduleType(course.scheduleType)}
                    color={Color['orange-200']}
                  />
                  <ListItemText>
                    <ListItemHeader>
                      {course.courseSubject} {course.courseNumber}
                    </ListItemHeader>
                    <ListItemDescription>
                      {course.scheduleDescription} &bull; {course.room} {course.buildingDescription}
                    </ListItemDescription>
                    <ListItemDescription>
                      {formatTime(course.beginTime)} - {formatTime(course.endTime)}
                    </ListItemDescription>
                  </ListItemText>
                  <a
                    href={`https://map.oregonstate.edu/?building=${course.building}`}
                    target="blank"
                  >
                    <VisuallyHidden>View on map</VisuallyHidden>
                    <Icon icon={faMapMarkerAlt} />
                  </a>
                </ListItemContentButton>
              </ListItem>
            ))}
          </List>
        </CardSection>
      )}
      
    </Card>
  );
};

export default CourseScheduleCard;
