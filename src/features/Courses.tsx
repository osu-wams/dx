import React, { useContext, useState } from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import { faMapMarkerAlt, faChalkboardTeacher } from '@fortawesome/pro-light-svg-icons';
import { useCourseSchedule } from '../api/student';
import { Card, CardHeader, CardIcon, CardContent, CardFooter } from '../ui/Card';
import { ICourseScheduleAttributes } from '../api/student/course-schedule';
import { sortedByCourseName } from './schedule/schedule-utils';
import {
  List,
  ListItem,
  ListItemContentButton,
  ListItemText,
  ListItemLeadText,
  ListItemDescription
} from '../ui/List';
import Course from '../features/Course';
import Icon from '../ui/Icon';
import { titleCase, singularPlural } from '../util/helpers';
import { themeSettings } from '../theme';
import { ExternalLink } from '../ui/Link';
import Url from '../util/externalUrls.data';
import { ICourseSchedule, IMeetingTime } from '../api/student/course-schedule';
import { Event } from '../util/gaTracking';
import { courseOnCorvallisCampus } from './schedule/schedule-utils';
import { matchedCourseContext } from './course-utils';
import { ThemeContext } from 'styled-components';

/**
 * Get the course item lead text or the icon
 * @param contextName the course context name from Canvas
 * @param courseList the array of courses for the student
 */
export const courseCodeOrIcon = (
  contextName: string,
  courseList: ICourseSchedule[],
  iconElement: JSX.Element
): JSX.Element => {
  const course = matchedCourseContext(contextName, courseList);
  if (!course) return iconElement;
  return courseItemLeadText(course.courseSubject, course.courseNumber);
};

/**
 * A component to provide the course items lead text in place of an icon
 * @param subject the course subject (ie. PSY)
 * @param number the course number (ie. 492)
 */
export const courseItemLeadText = (subject: string, number: string): JSX.Element => (
  <ListItemLeadText data-testid="course-list-item-header">
    <div>{subject}</div>
    <div>
      <strong>{number}</strong>
    </div>
  </ListItemLeadText>
);

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

const Courses = () => {
  const themeContext = useContext(ThemeContext);
  const courses = useCourseSchedule();
  const [isOpen, setOpen] = useState(false);
  const [courseAttributes, setCourseAttributes] = useState<ICourseScheduleAttributes | null>(null);

  // Hides or shows course details
  const toggleCourse = courseAttributes => {
    setOpen(!isOpen);
    setCourseAttributes(courseAttributes);
  };

  if (!courses.data.length) {
    return null;
  }

  return (
    <Card>
      <CardHeader
        title="Current Courses"
        badge={<CardIcon icon={faChalkboardTeacher} count={courses.data.length} />}
      />
      <CardContent>
        <List>
          {sortedByCourseName(courses.data).map(course => (
            <ListItem key={course.id}>
              <ListItemContentButton
                onClick={() => {
                  toggleCourse(course.attributes);
                  Event('courses', 'course clicked', course.attributes.courseTitle);
                }}
              >
                {courseItemLeadText(
                  course.attributes.courseSubject,
                  course.attributes.courseNumber
                )}
                <ListItemText>
                  <ListItemDescription
                    fontSize={themeSettings.fontSize[16]}
                    color={themeContext.features.academics.courses.list.title.color}
                  >
                    {titleCase(course.attributes.courseTitle)}
                  </ListItemDescription>
                  <ListItemDescription>
                    {course.attributes.scheduleDescription} &middot; {course.attributes.creditHours}{' '}
                    {singularPlural(course.attributes.creditHours, 'Credit')}
                  </ListItemDescription>
                </ListItemText>
                {courseOnCorvallisCampus(course) &&
                  meetingTimeCampusMap(course, course.attributes.meetingTimes[0])}
              </ListItemContentButton>
            </ListItem>
          ))}
        </List>
        {isOpen && courseAttributes && (
          <Course attributes={courseAttributes} toggleCourse={toggleCourse} isOpen />
        )}
      </CardContent>
      <CardFooter infoButtonId="current-courses">
        <ExternalLink
          href={Url.canvas.main}
          onClick={() => Event('courses', 'Link to Canvas clicked')}
        >
          View more in Canvas
        </ExternalLink>
      </CardFooter>
    </Card>
  );
};

export default Courses;
