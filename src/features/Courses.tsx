import React, { useState, useEffect } from 'react';
import { faChevronRight, faChalkboardTeacher } from '@fortawesome/pro-light-svg-icons';
import { getCourseSchedule } from '../api/student';
import { Card, CardHeader, CardIcon, CardContent, CardFooter } from '../ui/Card';
import { ICourseSchedule, ICourseScheduleAttributes } from '../api/student/course-schedule';
import Icon from '../ui/Icon';
import { getIconByScheduleType } from './course-utils';
import {
  List,
  ListItem,
  ListItemContentButton,
  ListItemText,
  ListItemHeader,
  ListItemDescription
} from '../ui/List';
import Course from '../features/Course';
import { titleCase, singularPlural } from '../util/helpers';
import { Color } from '../theme';
import { ExternalLink } from '../ui/Link';
import Url from '../util/externalUrls.data';
import { Event } from '../util/gaTracking';

const Courses = () => {
  const [courses, setCourses] = useState<ICourseSchedule[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [courseAttributes, setCourseAttributes] = useState<ICourseScheduleAttributes | null>(null);

  // Hides or shows course details
  const toggleCourse = courseAttributes => {
    setOpen(!isOpen);
    setCourseAttributes(courseAttributes);
  };

  // Populate user courses
  useEffect(() => {
    let isMounted = true;
    getCourseSchedule()
      .then(res => isMounted && setCourses(res))
      .catch(console.log);

    return () => {
      // prevents setting data on a component that has been unmounted before promise resolves
      isMounted = false;
    };
  }, []);

  if (!courses.length) {
    return null;
  }

  return (
    <Card>
      <CardHeader
        title="Current Courses"
        badge={<CardIcon icon={faChalkboardTeacher} count={courses.length} />}
      />
      <CardContent>
        <List>
          {courses.map(
            ({
              id,
              attributes,
              attributes: {
                creditHours,
                scheduleDescription,
                scheduleType,
                courseTitle,
                courseNumber,
                courseSubject
              }
            }) => (
              <ListItem key={id}>
                <ListItemContentButton
                  onClick={() => {
                    toggleCourse(attributes);
                    Event('courses', 'course clicked', attributes.courseTitle);
                  }}
                >
                  <Icon icon={getIconByScheduleType(scheduleType)} color={Color['orange-200']} />
                  <ListItemText>
                    <ListItemHeader>
                      {courseSubject} {courseNumber}
                    </ListItemHeader>
                    <ListItemDescription>
                      {titleCase(courseTitle)} <br />
                      {scheduleDescription} &middot; {creditHours}{' '}
                      {singularPlural(creditHours, 'Credit')}
                    </ListItemDescription>
                  </ListItemText>
                  <Icon icon={faChevronRight} />
                </ListItemContentButton>
              </ListItem>
            )
          )}
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
