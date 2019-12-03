import React, { useContext, useState } from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import { faMapMarkerAlt } from '@fortawesome/pro-light-svg-icons';
import { themeSettings, ThemeContext, ThemeConfiguration } from '../../theme';
import {
  CardSection,
  SectionHeader,
  NoItems,
  NoItemsImage,
  NoItemsText
} from './ScheduleCardStyles';
import Url from '../../util/externalUrls.data';
import Icon from '../../ui/Icon';
import coursesSvg from '../../assets/courses.svg';
import { formatTime } from '../../util/helpers';
import {
  List,
  ListItem,
  ListItemDescription,
  ListItemText,
  ListItemContentButton
} from '../../ui/List';
import { ICourseSchedule, IMeetingTime } from '../../api/student/course-schedule';
import { Event } from '../../util/gaTracking';
import {
  courseOnCorvallisCampus,
  sortedGroupedByCourseName,
  ICoursesMap,
  exceptMeetingTypes,
  examName
} from './schedule-utils';
import { courseItemLeadText } from '../Courses';
import Course from '../Course';

interface ScheduleCardCoursesProps {
  selectedCourses: ICourseSchedule[];
  courses: ICourseSchedule[];
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
  const themeContext = useContext(ThemeContext);
  const [isOpen, setOpen] = useState(false);
  const [showCoursesMap, setShowCoursesMap] = useState<ICoursesMap | null>(null);
  const { selectedCourses, courses } = props;
  // use sortedGroupedByCourseName as a convenience method for getting a coursesMap
  const coursesMap: Map<string, ICoursesMap> = sortedGroupedByCourseName(courses);

  const toggleCourse = (coursesMap: ICoursesMap | undefined) => {
    setOpen(!isOpen);
    if (coursesMap !== undefined) {
      setShowCoursesMap(coursesMap);
    }
  };

  const meetingTimeDescription = (meetingTime: IMeetingTime) => {
    const finalExam = examName(meetingTime);
    if (finalExam !== undefined) return finalExam;
    return `${meetingTime.room} ${meetingTime.buildingDescription}`;
  };

  const meetingTimeListItems = (
    coursesMap: Map<string, ICoursesMap>,
    course: ICourseSchedule,
    themeContext: ThemeConfiguration
  ): JSX.Element[] =>
    exceptMeetingTypes(course.attributes.meetingTimes, ['MID']).map((meetingTime: IMeetingTime) => (
      <ListItem key={`${course.id}${meetingTime.beginDate}${meetingTime.beginTime}`}>
        <ListItemContentButton
          onClick={() => {
            toggleCourse(
              coursesMap.get(`${course.attributes.courseSubject}${course.attributes.courseNumber}`)
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
              fontSize={themeSettings.fontSize[16]}
              color={themeContext.features.academics.courses.list.title.color}
            >
              {course.attributes.scheduleDescription} &bull; {meetingTimeDescription(meetingTime)}
            </ListItemDescription>
            <ListItemDescription>
              {meetingTime.beginTime && formatTime(meetingTime.beginTime) + ' - '}
              {meetingTime.endTime && formatTime(meetingTime.endTime)}
            </ListItemDescription>
          </ListItemText>
          {courseOnCorvallisCampus(course) && meetingTimeCampusMap(course, meetingTime)}
        </ListItemContentButton>
      </ListItem>
    ));

  return (
    <CardSection>
      <SectionHeader>Courses</SectionHeader>
      <List>
        {selectedCourses.length > 0 &&
          selectedCourses.map((c: ICourseSchedule) =>
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
