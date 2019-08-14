import React, { useState, useEffect } from 'react';
import { faChevronRight, faInfoCircle } from '@fortawesome/pro-light-svg-icons';
import { getCourseSchedule } from '../api/student';
import { Card, CardHeader, Badge, CardContent, CardFooter } from '../ui/Card';
import { ICourseSchedule, ICourseScheduleAttributes } from '../api/student/course-schedule';
import Icon from '../ui/Icon';
import { getIconByScheduleType } from './course-utils';
import {
  List,
  ListItem,
  ListItemContent,
  ListItemText,
  ListItemHeader,
  ListItemDescription
} from '../ui/List';
import Course from '../features/Course';
import { titleCase, singularPlural } from '../util/helpers';
import { Color } from '../theme';
import ExternalLink from '../ui/ExternalLink';
import Url from '../util/externalUrls.data';

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
    getCourseSchedule()
      .then(res => {
        setCourses(res);
      })
      .catch(console.log);
  }, []);

  if (!courses.length) {
    return null;
  }

  return (
    <Card>
      <CardHeader title="Current Courses" badge={<Badge>{courses.length}</Badge>} />
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
                <ListItemContent onClick={() => toggleCourse(attributes)}>
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
                </ListItemContent>
              </ListItem>
            )
          )}
        </List>
        {isOpen && courseAttributes && (
          <Course attributes={courseAttributes} toggleCourse={toggleCourse} isOpen />
        )}
      </CardContent>
      <CardFooter>
        <Icon icon={faInfoCircle} />
        <ExternalLink href={Url.canvas.main} fg={Color['orange-400']}>
          View more in Canvas
        </ExternalLink>
      </CardFooter>
    </Card>
  );
};

export default Courses;
