import React, { useContext, useState } from 'react';
import { faChalkboardTeacher } from '@fortawesome/pro-light-svg-icons';
import { ThemeContext } from 'styled-components/macro';
import { Url, Helpers, Course as CourseUtils, Routes } from '@osu-wams/utils';
import { Types } from '@osu-wams/lib';
import { State } from '@osu-wams/hooks';
import { Card, CardHeader, CardIcon, CardContent, CardFooter } from '../ui/Card';
import { sortedGroupedByCourseName, ICoursesMap } from './schedule/schedule-utils'; // eslint-disable  @typescript-eslint/no-unused-vars
import {
  List,
  ListItem,
  ListItemContentButton,
  ListItemText,
  ListItemLeadText,
  ListItemDescription,
} from '../ui/List';
import coursesImg from '../assets/courses.svg';
import Course from '../features/Course';
import { fontSize } from '@osu-wams/theme';
import { ExternalLink, InternalLink } from '../ui/Link';
import { Event } from '../util/gaTracking';
import { EmptyState, EmptyStateImage, EmptyStateText } from '../ui/EmptyStates';
import { useRecoilValue } from 'recoil';

/**
 * Get the course item lead text or the icon
 * @param contextName the course context name from Canvas
 * @param courseList the array of courses for the student
 */
export const courseCodeOrIcon = (
  contextName: string,
  courseList: Types.CourseSchedule[],
  iconElement: JSX.Element
): JSX.Element => {
  const course = CourseUtils.matchedCourseContext(courseList, contextName);
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
  const courses = useRecoilValue(State.courseState);
  const [isOpen, setOpen] = useState(false);
  const [showCoursesMap, setShowCoursesMap] = useState<ICoursesMap | null>(null);

  // Hides or shows course details
  const toggleCourse = (coursesMap: ICoursesMap | null) => {
    setOpen(!isOpen);
    if (coursesMap !== null) {
      setShowCoursesMap(coursesMap);
    }
  };

  const CourseList = () => (
    <List>
      {courses.data &&
        Array.from(sortedGroupedByCourseName(courses.data).entries(), ([key, coursesMap]) => (
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
                  fontSize={fontSize[16]}
                  color={themeContext.features.academics.courses.list.title.color}
                >
                  {coursesMap.title}
                </ListItemDescription>
                <ListItemDescription>
                  {coursesMap.creditHours}{' '}
                  {Helpers.singularPlural(coursesMap.creditHours, 'Credit')}
                </ListItemDescription>
              </ListItemText>
            </ListItemContentButton>
          </ListItem>
        ))}
    </List>
  );

  const FooterLink = () => (
    <ExternalLink href={Url.canvas.main} onClick={() => Event('courses', 'Link to Canvas clicked')}>
      View more in Canvas
    </ExternalLink>
  );

  const NoCourses = () => (
    <EmptyState>
      <EmptyStateImage src={coursesImg} alt="" />
      <EmptyStateText>You do not have any courses scheduled for this term.</EmptyStateText>
    </EmptyState>
  );

  const NoCoursesFooterLink = () => (
    <InternalLink
      to={Routes.Routes()['past courses'].fullPath}
      onClick={() => Event('courses', 'Empty state card footer link to Past Courses clicked')}
    >
      See past courses and grades
    </InternalLink>
  );

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
        {courses.data && courses.data.length ? <CourseList /> : <NoCourses />}
        {isOpen && showCoursesMap && showCoursesMap.courses.length > 0 && (
          <Course coursesMap={showCoursesMap} toggleCourse={toggleCourse} isOpen />
        )}
      </CardContent>
      <CardFooter infoButtonId="current-courses">
        {courses.data && courses.data.length ? <FooterLink /> : <NoCoursesFooterLink />}
      </CardFooter>
    </Card>
  );
};

export default Courses;
