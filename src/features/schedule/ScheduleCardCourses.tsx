import React, { useContext, useState } from 'react';
import { ThemeContext } from 'styled-components/macro';
import VisuallyHidden from '@reach/visually-hidden';
import { faMapMarkerAlt } from '@fortawesome/pro-light-svg-icons';
import { fontSize, MOSTheme } from '@osu-wams/theme';
import {
  CardSection,
  SectionHeader,
  NoItems,
  NoItemsImage,
  NoItemsText,
} from './ScheduleCardStyles';
import { Url, Helpers } from '@osu-wams/utils';
import Icon from 'src/ui/Icon';
import coursesSvg from 'src/assets/courses.svg';
import {
  List,
  ListItem,
  ListItemDescription,
  ListItemText,
  ListItemContentButton,
} from 'src/ui/List';
import { Event } from 'src/util/gaTracking';
import {
  courseOnCorvallisCampus,
  sortedGroupedByCourseName,
  ICoursesMap,
  exceptMeetingTypes,
  examName,
  coursesOnDay,
  getDayShortcode,
} from './schedule-utils';
import { courseItemLeadText } from '../Courses';
import Course from '../Course';
import { Types } from '@osu-wams/lib';
import { isWithinInterval, parseISO } from 'date-fns';

interface ScheduleCardCoursesProps {
  selectedDay: Date;
  courses: Types.CourseSchedule[];
}

const meetingTimeCampusMap = (
  course: Types.CourseSchedule,
  meetingTime: Types.CourseScheduleMeetingTime
): JSX.Element => (
  <a
    href={Url.campusMap.building + meetingTime.building}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() =>
      Event(
        'schedule-card',
        'course location clicked',
        `${Url.campusMap.building + meetingTime.building}`
      )
    }
  >
    <VisuallyHidden>
      View {course.attributes.courseSubject} {course.attributes.courseNumber} location on map
    </VisuallyHidden>
    <Icon icon={faMapMarkerAlt} />
  </a>
);

const meetingTimesOnDay = (meetingTimes: Types.CourseScheduleMeetingTime[], day: Date) =>
  meetingTimes.filter(
    ({ beginDate, endDate, weeklySchedule }) =>
      isWithinInterval(day, {
        start: parseISO(beginDate),
        end: parseISO(endDate),
      }) && weeklySchedule.includes(getDayShortcode(day))
  );

// Return courses from array which are found to have meeting time(s) scheduled on the day provided
const getCoursesOnSelectedDay = (courses: Types.CourseSchedule[], day: Date) => {
  if (courses) {
    return coursesOnDay(courses, day).filter(
      ({ attributes: { meetingTimes } }) => meetingTimesOnDay(meetingTimes, day).length > 0
    );
  }
  return [];
};

const ScheduleCardCourses = (props: ScheduleCardCoursesProps) => {
  const themeContext = useContext(ThemeContext);
  const [isOpen, setOpen] = useState(false);
  const [showCoursesMap, setShowCoursesMap] = useState<ICoursesMap | null>(null);
  const { selectedDay, courses } = props;
  // use sortedGroupedByCourseName as a convenience method for getting a coursesMap
  const coursesMap: Map<string, ICoursesMap> = sortedGroupedByCourseName(courses);

  const toggleCourse = (coursesMap: ICoursesMap | undefined) => {
    setOpen(!isOpen);
    if (coursesMap !== undefined) {
      setShowCoursesMap(coursesMap);
    }
  };

  const meetingTimeDescription = (meetingTime: Types.CourseScheduleMeetingTime) => {
    const finalExam = examName(meetingTime);
    if (finalExam !== undefined) return finalExam;
    return `${meetingTime.room} ${meetingTime.buildingDescription}`;
  };

  const meetingTimeListItems = (
    coursesMap: Map<string, ICoursesMap>,
    course: Types.CourseSchedule,
    themeContext: MOSTheme
  ): JSX.Element[] => {
    const meetingTimes = meetingTimesOnDay(course.attributes.meetingTimes, selectedDay);
    return exceptMeetingTypes(meetingTimes, ['MID']).map(
      (meetingTime: Types.CourseScheduleMeetingTime) => (
        <ListItem key={`${course.id}${meetingTime.beginDate}${meetingTime.beginTime}`}>
          <ListItemContentButton
            onClick={() => {
              toggleCourse(
                coursesMap.get(
                  `${course.attributes.courseSubject}${course.attributes.courseNumber}`
                )
              );
              Event(
                'schedule-card',
                'course clicked',
                `${course.id}${meetingTime.beginDate}${meetingTime.beginTime}`
              );
            }}
          >
            {courseItemLeadText(course.attributes.courseSubject, course.attributes.courseNumber)}
            <ListItemText>
              <ListItemDescription
                fontSize={fontSize[16]}
                color={themeContext.features.academics.courses.list.title.color}
              >
                {course.attributes.scheduleDescription} &bull; {meetingTimeDescription(meetingTime)}
              </ListItemDescription>
              <ListItemDescription>
                {meetingTime.beginTime && Helpers.formatTime(meetingTime.beginTime) + ' - '}
                {meetingTime.endTime && Helpers.formatTime(meetingTime.endTime)}
              </ListItemDescription>
            </ListItemText>
            {courseOnCorvallisCampus(course) && meetingTimeCampusMap(course, meetingTime)}
          </ListItemContentButton>
        </ListItem>
      )
    );
  };

  const selectedCourses = getCoursesOnSelectedDay(courses, selectedDay);

  return (
    <CardSection>
      <SectionHeader>Courses</SectionHeader>
      <List>
        {selectedCourses.length > 0 &&
          selectedCourses.map((c: Types.CourseSchedule) =>
            meetingTimeListItems(coursesMap, c, themeContext)
          )}
        {selectedCourses.length === 0 && (
          <NoItems as="li">
            <NoItemsImage src={coursesSvg} alt="" />
            <NoItemsText>You don&apos;t have any courses scheduled</NoItemsText>
          </NoItems>
        )}
        {isOpen && showCoursesMap && showCoursesMap.courses.length > 0 && (
          <Course coursesMap={showCoursesMap} toggleCourse={toggleCourse} isOpen />
        )}
      </List>
    </CardSection>
  );
};

export { ScheduleCardCourses };
