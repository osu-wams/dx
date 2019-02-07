import React, { FC, useState, useEffect } from 'react';
import { faChevronRight } from '@fortawesome/pro-light-svg-icons';
import { getCourseSchedule } from '../api/student';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { CourseSchedule, CourseScheduleAttributes } from '../api/student/course-schedule';
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
import course_list from '../api/__mocks__/courses.data';
import { Color } from '../theme';

type Props = {
  initialCourses: CourseSchedule;
  courseOpen: boolean;
  courseAttr: CourseScheduleAttributes;
};

// TODO: set initialCourses to call api instead of mock data
let Courses: FC<Props> = ({ initialCourses, courseOpen, courseAttr }) => {
  const [courses, setCourses] = useState<CourseSchedule[]>([]);
  const [isOpen, setOpen] = useState(courseOpen);
  const [courseAttributes, setCourseAttributes] = useState(courseAttr);

  // Hides or shows course details
  const toggleCourse = courseAttributes => {
    setOpen(!isOpen);
    setCourseAttributes(courseAttributes);
  };

  // Populate user courses
  // TODO: api call for data / add types
  useEffect(() => {
    setCourses(course_list as any);
  }, []);

  // TODO: loader for empty...
  if (!courses.length) {
    return null;
  }

  return (
    <Card>
      <CardHeader title="Current Courses" />
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
                <ListItemContent as="button" onClick={() => toggleCourse(attributes)}>
                  <Icon icon={getIconByScheduleType(scheduleType)} color={Color['orange-400']} />
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
        {isOpen && <Course attributes={courseAttributes} toggleCourse={toggleCourse} isOpen />}
      </CardContent>
    </Card>
  );
};

export default Courses;
