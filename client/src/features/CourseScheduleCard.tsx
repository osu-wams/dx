import React, { useState, useEffect, useContext, useMemo } from 'react';
import styled from 'styled-components';
import { faFileAlt, faMapMarkerAlt, faArrowRight } from '@fortawesome/pro-light-svg-icons';
import { addDays, eachDay, format, isSameDay } from 'date-fns';
import generateId from 'uuid/v4';
import { CardBase } from '../ui/Card';
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
import { theme, Color } from '../theme';
import excitedCalendarIcon from '../assets/excited-calendar.svg';
import { getCourseSchedule } from '../api/student';
import { getPlannerItems } from '../api/student/planner-items';
import { formatTime } from '../util/helpers';
import { getIconByScheduleType } from './course-utils';
import VisuallyHidden from '@reach/visually-hidden';
import Url from '../util/externalUrls.data';
import { UserContext } from '../App';

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
      <Header>This Week</Header>
      <DayList>
        {nextFiveDays.map(day => (
          <Day
            key={day.toUTCString()}
            onClick={() => setSelectedDay(day)}
            selected={isSameDay(day, selectedDay)}
          >
            <span>{daysWithEvents.includes(day) ? '\u2022' : ''}</span>
            <span>{format(day, 'ddd')}</span>
            <span>{format(day, 'D')}</span>
          </Day>
        ))}
      </DayList>
      {selectedCourses.length === 0 && selectedPlannerItems.length === 0 && <EmptyState />}

      {selectedCourses.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
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
        </div>
      )}
      {user.isCanvasOptIn && selectedPlannerItems.length > 0 && (
        <div>
          <SectionHeader>Assignments</SectionHeader>
          <List>
            {selectedPlannerItems.map(
              ({ plannable_id, html_url, plannable_type, plannable: { title, due_at } }) => (
                <ListItem key={plannable_id}>
                  <ListItemContentLink href={Url.canvas.main + html_url}>
                    <Icon icon={faFileAlt} color={Color['orange-200']} />
                    <ListItemText>
                      <ListItemHeader>{title} </ListItemHeader>
                      <ListItemDescription>
                        {plannable_type !== 'announcement'
                          ? `Due today at ${format(due_at, 'h:mma')}`
                          : ''}
                      </ListItemDescription>
                    </ListItemText>
                  </ListItemContentLink>
                </ListItem>
              )
            )}
          </List>
        </div>
      )}
      {user.isCanvasOptIn !== undefined && !user.isCanvasOptIn && (
        <div>
          <a href="/canvas/login">Authorize Canvas</a>
        </div>
      )}
    </Card>
  );
};

/**
 * Utility functions
 */
const getNextFiveDays = () => {
  let rangeStart = new Date();
  let rangeEnd = addDays(rangeStart, 4);
  let nextFiveDays = eachDay(rangeStart, rangeEnd);

  return nextFiveDays;
};

const getDayShortcode = (date: Date) => {
  let twoLetterShortcodes = ['Th', 'Sa', 'Su'];

  let shortcode = format(date, 'dddd').substr(0, 2);
  shortcode = twoLetterShortcodes.includes(shortcode) ? shortcode : shortcode.substr(0, 1);
  return shortcode;
};

const EmptyState = () => (
  <>
    <NoCoursesImage src={excitedCalendarIcon} />
    <NoCoursesText>
      Nice! You don't have any assignments due or courses scheduled on this day.
      <a href="#">
        Check out the OSU calendar
        <Icon icon={faArrowRight} color={Color['orange-400']} />
      </a>
    </NoCoursesText>
  </>
);

/**
 * Styling
 */
const Card = styled(CardBase)`
  padding: ${theme.spacing.unit * 2}px;
`;

const Header = styled.div`
  color: ${Color['neutral-600']};
  font-size: ${theme.fontSize[18]};
  margin-bottom: ${theme.spacing.unit * 2}px;
`;

type selectedBtn = boolean;

const Day = styled.button<{ selected: selectedBtn }>`
  background: none;
  border: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  & > span:first-child {
    color: ${Color['orange-500']};
    font-weight: bold;
    font-size: ${theme.fontSize[20]};
    line-height: 18px;
  }

  & > span:nth-child(2) {
    color: ${Color['neutral-550']};
    font-weight: bold;
    font-size: ${theme.fontSize[12]};
    text-transform: uppercase;
    margin-bottom: ${theme.spacing.unit * 0.5}px;
  }

  & > span:last-child {
    color: ${Color['neutral-700']};
    line-height: 20px;
    font-size: ${theme.fontSize[24]};
  }

  ${props =>
    props.selected &&
    `
    & > span {
      color: ${Color['orange-400']} !important;
    }
  `}
`;

const DayList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.unit * 2}px;
`;

const NoCoursesImage = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: ${theme.spacing.unit * 2}px;
  height: 100px;
`;

const NoCoursesText = styled.div`
  font-size: ${theme.fontSize[14]};
  text-align: center;
  padding: 0 ${theme.spacing.unit * 2}px;

  & > a {
    color: ${Color['orange-400']};
    margin-left: ${theme.spacing.unit / 2}px;
    text-decoration: none;
    font-weight: 600;
  }

  & > a:hover {
    text-decoration: underline;
  }

  & > a > svg {
    margin-left: ${theme.spacing.unit}px;
  }
`;

const SectionHeader = styled.div`
  color: ${Color['neutral-550']};
  font-weight: 600;
  margin-bottom: ${theme.spacing.unit}px;
`;

export default CourseScheduleCard;
