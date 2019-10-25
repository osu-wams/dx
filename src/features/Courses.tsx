import React, { useState } from 'react';
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
import { theme, Color } from '../theme';
import { ExternalLink } from '../ui/Link';
import Url from '../util/externalUrls.data';
import { ICourseSchedule, IMeetingTime } from '../api/student/course-schedule';
import { Event } from '../util/gaTracking';
import { courseOnCorvallisCampus } from './schedule/schedule-utils';

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
                <ListItemLeadText data-testid="course-list-item-header">
                  <div>{course.attributes.courseSubject}</div>
                  <div>
                    <strong>{course.attributes.courseNumber}</strong>
                  </div>
                </ListItemLeadText>
                <ListItemText>
                  <ListItemDescription fontSize={theme.fontSize[16]} color={Color['neutral-700']}>
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
          fg={Color['orange-400']}
          onClick={() => Event('courses', 'Link to Canvas clicked')}
        >
          View more in Canvas
        </ExternalLink>
      </CardFooter>
    </Card>
  );
};

export default Courses;
