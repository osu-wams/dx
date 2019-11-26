import React, { useContext, useState } from 'react';
import { faChalkboardTeacher } from '@fortawesome/pro-light-svg-icons';
import { useCourseSchedule } from '../api/student';
import { Card, CardHeader, CardIcon, CardContent, CardFooter } from '../ui/Card';
import { sortedGroupedByCourseName, ICoursesMap } from './schedule/schedule-utils'; // eslint-disable  @typescript-eslint/no-unused-vars
import {
  List,
  ListItem,
  ListItemContentButton,
  ListItemText,
  ListItemLeadText,
  ListItemDescription
} from '../ui/List';
import Course from '../features/Course';
import { titleCase, singularPlural } from '../util/helpers';
import { themeSettings, ThemeContext } from '../theme';
import { ExternalLink } from '../ui/Link';
import Url from '../util/externalUrls.data';
import { ICourseSchedule } from '../api/student/course-schedule';
import { Event } from '../util/gaTracking';
import { matchedCourseContext } from './course-utils';

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

const Courses = () => {
  const themeContext = useContext(ThemeContext);
  const courses = useCourseSchedule();
  const [isOpen, setOpen] = useState(false);
  const [showCoursesMap, setShowCoursesMap] = useState<ICoursesMap | null>(null);

  // Hides or shows course details
  const toggleCourse = (coursesMap: ICoursesMap | null) => {
    setOpen(!isOpen);
    if (coursesMap !== null) {
      setShowCoursesMap(coursesMap);
    }
  };

  if (courses && !courses.data.length) {
    return null;
  }

  return (
    <Card>
      <CardHeader
        title="Current Courses"
        badge={
          <CardIcon
            icon={faChalkboardTeacher}
            count={courses && courses.data ? sortedGroupedByCourseName(courses.data).size : 0}
          />
        }
      />
      <CardContent>
        {courses && courses.data.length ? (
          <List>
            {Array.from(sortedGroupedByCourseName(courses.data).entries(), ([key, coursesMap]) => (
              <ListItem key={key}>
                <ListItemContentButton
                  onClick={() => {
                    toggleCourse(coursesMap);
                    Event('courses', 'course clicked', key);
                  }}
                >
                  {courseItemLeadText(coursesMap.subject, coursesMap.number)}
                  <ListItemText>
                    <ListItemDescription
                      fontSize={themeSettings.fontSize[16]}
                      color={themeContext.features.academics.courses.list.title.color}
                    >
                      {titleCase(coursesMap.title)}
                    </ListItemDescription>
                    <ListItemDescription>
                      {coursesMap.creditHours} {singularPlural(coursesMap.creditHours, 'Credit')}
                    </ListItemDescription>
                  </ListItemText>
                </ListItemContentButton>
              </ListItem>
            ))}
          </List>
        ) : (
          <p>No courses this term</p>
        )}
        {isOpen && showCoursesMap && showCoursesMap.courses.length > 0 && (
          <Course coursesMap={showCoursesMap} toggleCourse={toggleCourse} isOpen />
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
