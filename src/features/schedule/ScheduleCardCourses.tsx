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

interface ScheduleCardCoursesProps {
  selectedCourses: ICourseSchedule[];
}

const meetingTimeListItems = (course: ICourseSchedule): JSX.Element[] => {
  return course.attributes.meetingTimes.map((meetingTime: IMeetingTime) => (
    <ListItem key={`${course.id}${meetingTime.beginTime}`}>
      <ListItemContent>
        <Icon icon={getIconByScheduleType(meetingTime.scheduleType)} color={Color['orange-200']} />
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
        <a href={Url.campusMap.building + meetingTime.building} target="blank">
          <VisuallyHidden>
            View {course.attributes.courseSubject} {course.attributes.courseNumber} location on map
          </VisuallyHidden>
          <Icon icon={faMapMarkerAlt} />
        </a>
      </ListItemContent>
    </ListItem>
  ));
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
            <NoItemsText>You don&apos;t have any courses scheduled for today</NoItemsText>
          </NoItems>
        )}
      </List>
    </CardSection>
  );
};

export { ScheduleCardCourses };
