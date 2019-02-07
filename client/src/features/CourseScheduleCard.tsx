import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { faUsersClass, faMapMarkerAlt, faArrowRight } from '@fortawesome/pro-light-svg-icons';
import { addDays, eachDay, format, isSameDay } from 'date-fns';
import { CardBase } from '../ui/Card';
import {
  List,
  ListItem,
  ListItemHeader,
  ListItemContent,
  ListItemDescription,
  ListItemText
} from '../ui/List';
import Icon from '../ui/Icon';
import { theme, Color } from '../theme';
import excitedCalendarIcon from '../assets/excited-calendar.svg';
import { getCourseSchedule } from '../api/student';
import { CourseSchedule, MeetingTime } from '../api/student/course-schedule';
import { formatTime } from '../util/helpers';
import { getIconByScheduleType } from './course-utils';
import VisuallyHidden from '@reach/visually-hidden';

/**
 * Course Schedule Card
 *
 * Displays courses for the next 5 days, filterable by day.
 */
const CourseScheduleCard = () => {
  const nextFiveDays = getNextFiveDays();
  const [courses, setCourses] = useState<CourseSchedule[]>([]);
  const [selectedDay, setSelectedDay] = useState(nextFiveDays[0]);
  const [selectedCourses, setSelectedCourses] = useState<CourseSchedule[]>([]);

  // Populate user courseses
  useEffect(() => {
    getCourseSchedule()
      .then(setCourses)
      .catch(console.log);
  }, []);

  // Filter courses based on selected day
  useEffect(() => {
    const coursesOnSelectedDay = getCoursesOnSelectedDay();
    console.log(coursesOnSelectedDay);
    setSelectedCourses(coursesOnSelectedDay);
  }, [selectedDay, courses]); // Re-run filter when selected day changes or when courses change (on inital load)

  const getCoursesOnSelectedDay = () => {
    let selectedDayShortcode = getDayShortcode(selectedDay);
    const coursesOnSelectedDay = courses.filter(course =>
      course.attributes.meetingTimes.find(meetingTime =>
        meetingTime.weeklySchedule.includes(selectedDayShortcode)
      )
    );
    return coursesOnSelectedDay;
  };

  const getMeetingTimesOnSelectedDay = (course): MeetingTime[] => {
    return course.attributes.meetingTimes.filter(meetingTime => {
      let selectedDayShortcode = getDayShortcode(selectedDay);
      return meetingTime.weeklySchedule.includes(selectedDayShortcode);
    });
  };

  // Todo: replace null render with loading animation inside card.
  if (!courses) return null;

  return (
    <Card>
      <Header>This Week</Header>
      <DayList>
        {nextFiveDays.map(day => (
          <Day onClick={() => setSelectedDay(day)} selected={isSameDay(day, selectedDay)}>
            <span>{format(day, 'ddd')}</span>
            <span>{format(day, 'D')}</span>
          </Day>
        ))}
      </DayList>
      {/* Show courses for the selected day if any exist, otherwise show empty state. */}
      {selectedCourses.length ? (
        <List>
          {selectedCourses.map(course => {
            let selectedMeetingTimes = getMeetingTimesOnSelectedDay(course);
            return (
              <>
                {/* 
                  Map over the meeting times rather than just the course itself,
                  as courses can have more than one valid meeting time per day.
                */}
                {selectedMeetingTimes.map(meetingTime => (
                  <ListItem key={`${course.id}${meetingTime.beginTime}`}>
                    <ListItemContent>
                      <Icon
                        icon={getIconByScheduleType(meetingTime.scheduleType)}
                        color={Color['orange-200']}
                      />
                      <ListItemText>
                        <ListItemHeader>
                          {course.attributes.courseSubject} {course.attributes.courseNumber}
                        </ListItemHeader>
                        <ListItemDescription>
                          {course.attributes.scheduleDescription} &bull; {meetingTime.room}{' '}
                          {meetingTime.buildingDescription}
                        </ListItemDescription>
                        <ListItemDescription>
                          {formatTime(meetingTime.beginTime)} - {formatTime(meetingTime.endTime)}
                        </ListItemDescription>
                      </ListItemText>
                      <a
                        href={`https://map.oregonstate.edu/?building=${meetingTime.building}`}
                        target="blank"
                      >
                        <VisuallyHidden>View on map</VisuallyHidden>
                        <Icon icon={faMapMarkerAlt} />
                      </a>
                    </ListItemContent>
                  </ListItem>
                ))}
              </>
            );
          })}
        </List>
      ) : (
        <EmptyState />
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
      Nice! You don't have any courses scheduled on this day.
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

const Day = styled.button<{ selected: boolean }>`
  background: none;
  border: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  & > span:first-child {
    color: ${Color['neutral-500']};
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

export default CourseScheduleCard;
