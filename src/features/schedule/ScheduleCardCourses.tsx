import React from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import { faMapMarkerAlt } from '@fortawesome/pro-light-svg-icons';
import {
  CardSection,
  SectionHeader,
  NoItems,
  NoItemsImage,
  NoItemsText
} from './ScheduleCardStyles';
import Url from '../../util/externalUrls.data';
import { getIconByScheduleType } from '../course-utils';
import Icon from '../../ui/Icon';
import { Color } from '../../theme';
import courses from '../../assets/courses.svg';
import { formatTime } from '../../util/helpers';
import {
  List,
  ListItem,
  ListItemHeader,
  ListItemContent,
  ListItemDescription,
  ListItemText
} from '../../ui/List';
import { ICourseSchedule, IMeetingTime } from '../../api/student/course-schedule';
import { Event } from '../../util/gaTracking';
import { courseOnCorvallisCampus } from './schedule-utils';

interface ScheduleCardCoursesProps {
  selectedCourses: ICourseSchedule[];
}

function isMidterm(meetingTime: IMeetingTime) {
  return meetingTime.room == 'MID' || meetingTime.scheduleType == 'MID';
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

const meetingTimeListItems = (course: ICourseSchedule): JSX.Element[] => {
  let filteredCourses;
  filteredCourses = course.attributes.meetingTimes.map(
    (meetingTime: IMeetingTime) =>
      !isMidterm(meetingTime) && (
        <ListItem key={`${course.id}${meetingTime.beginDate}${meetingTime.beginTime}`}>
          <ListItemContent>
            {console.log(meetingTime.room)}
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
            {courseOnCorvallisCampus(course) && meetingTimeCampusMap(course, meetingTime)}
          </ListItemContent>
        </ListItem>
      )
  );
  return filteredCourses;
};

const ScheduleCardCourses = (props: ScheduleCardCoursesProps) => {
  const { selectedCourses } = props;
  return (
    <CardSection>
      {/* TODO: course should NOT be a link */}
      <SectionHeader>Courses</SectionHeader>
      <List>
        {selectedCourses.length > 0 &&
          selectedCourses.map((c: ICourseSchedule) => meetingTimeListItems(c))}
        {selectedCourses.length === 0 && (
          <NoItems>
            <NoItemsImage src={courses} alt="" />
            <NoItemsText>You don&apos;t have any courses scheduled</NoItemsText>
          </NoItems>
        )}
      </List>
    </CardSection>
  );
};

export { ScheduleCardCourses };
