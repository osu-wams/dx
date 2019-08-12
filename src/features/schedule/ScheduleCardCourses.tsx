import React from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import { faMapMarkerAlt  } from '@fortawesome/pro-light-svg-icons';
import { CardSection,  SectionHeader, NoItems, NoItemsImage, NoItemsText } from './ScheduleCardStyles';
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
  ListItemText,
} from '../../ui/List';

const ScheduleCardCourses = ({selectedCourses}) =>
  <CardSection>
    {/* TODO: course should NOT be a link */}
    <SectionHeader>Courses</SectionHeader>
    <List>
      {selectedCourses.length > 0 && selectedCourses.map(course => (
        <ListItem key={`${course.id}${course.beginTime}`}>
          <ListItemContent>
            <Icon
              icon={getIconByScheduleType(course.scheduleType)}
              color={Color['orange-200']}
            />
            <ListItemText>
              <ListItemHeader>
                {course.courseSubject} {course.courseNumber}
              </ListItemHeader>
              <ListItemDescription>
                {course.scheduleDescription} &bull; {course.room} {course.buildingDescription}
              </ListItemDescription>
              <ListItemDescription>
                {formatTime(course.beginTime)} - {formatTime(course.endTime)}
              </ListItemDescription>
            </ListItemText>
            <a
              href={Url.campusMap.building + course.building}
              target="blank"
            >
              <VisuallyHidden>View on map</VisuallyHidden>
              <Icon icon={faMapMarkerAlt} />
            </a>
          </ListItemContent>
        </ListItem>
      ))}
      {selectedCourses.length === 0 && (
        <NoItems>
          <NoItemsImage src={courses} />
          <NoItemsText>
            You don&apos;t have any courses scheduled for today
          </NoItemsText>
        </NoItems> 
      )}
    </List>
  </CardSection>



export { ScheduleCardCourses };
