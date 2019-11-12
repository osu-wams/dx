import React, { useState } from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import { faMapMarkerAlt } from '@fortawesome/pro-light-svg-icons';
import { courseOnCorvallisCampus } from './schedule-utils';
import {
  CardSection,
  SectionHeader,
  NoItems,
  NoItemsImage,
  NoItemsText
} from './ScheduleCardStyles';
import { courseItemLeadText } from '../Courses';
import {
  ICourseScheduleAttributes,
  ICourseSchedule,
  IMeetingTime
} from '../../api/student/course-schedule';
import coursesSvg from '../../assets/courses.svg';
import Course from '../../features/Course';
import { theme, Color } from '../../theme';
import Icon from '../../ui/Icon';
import {
  List,
  ListItem,
  ListItemDescription,
  ListItemText,
  ListItemContentButton
} from '../../ui/List';
import Url from '../../util/externalUrls.data';
import { Event } from '../../util/gaTracking';
import { formatTime } from '../../util/helpers';

interface ScheduleCardCoursesProps {
  selectedCourses: ICourseSchedule[];
}

function isMidterm(meetingTime: IMeetingTime) {
  return meetingTime.room === 'MID' || meetingTime.scheduleType === 'MID';
}

const meetingTimeCampusMap = (course: ICourseSchedule, meetingTime: IMeetingTime): JSX.Element => (
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

const ScheduleCardCourses = (props: ScheduleCardCoursesProps) => {
  const { selectedCourses } = props;
  const [isOpen, setOpen] = useState(false);
  const [courseAttributes, setCourseAttributes] = useState<ICourseScheduleAttributes | null>(null);
  const meetingTimeListItems = (course: ICourseSchedule): JSX.Element[] => {
    let filteredCourses;
    filteredCourses = course.attributes.meetingTimes.map(
      (meetingTime: IMeetingTime) =>
        !isMidterm(meetingTime) && (
          <ListItem key={`${course.id}${meetingTime.beginDate}${meetingTime.beginTime}`}>
            <ListItemContentButton
              onClick={() => {
                toggleCourse(course.attributes);
                Event('courses', 'course clicked', course.attributes.courseTitle);
              }}
            >
              {courseItemLeadText(course.attributes.courseSubject, course.attributes.courseNumber)}
              <ListItemText>
                <ListItemDescription fontSize={theme.fontSize[16]} color={Color['neutral-700']}>
                  {course.attributes.scheduleDescription} &bull; {meetingTime.room}{' '}
                  {meetingTime.buildingDescription}
                </ListItemDescription>
                <ListItemDescription>
                  {formatTime(meetingTime.beginTime)} - {formatTime(meetingTime.endTime)}
                </ListItemDescription>
              </ListItemText>
              {courseOnCorvallisCampus(course) && meetingTimeCampusMap(course, meetingTime)}
            </ListItemContentButton>
          </ListItem>
        )
    );
    return filteredCourses;
  };

  // Hides or shows course details
  const toggleCourse = courseAttributes => {
    setOpen(!isOpen);
    setCourseAttributes(courseAttributes);
  };

  return (
    <CardSection>
      <SectionHeader>Courses</SectionHeader>
      <List>
        {selectedCourses.length > 0 &&
          selectedCourses.map((c: ICourseSchedule) => meetingTimeListItems(c))}
        {selectedCourses.length === 0 && (
          <NoItems as="li">
            <NoItemsImage src={coursesSvg} alt="" />
            <NoItemsText>You don&apos;t have any courses scheduled</NoItemsText>
          </NoItems>
        )}
      </List>
      {isOpen && courseAttributes && (
        <Course attributes={courseAttributes} toggleCourse={toggleCourse} isOpen />
      )}
    </CardSection>
  );
};

export { ScheduleCardCourses };
