import React from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import Icon from '../ui/Icon';
import { faMapMarkerAlt, faEnvelope, faChalkboardTeacher } from '@fortawesome/pro-light-svg-icons';
import { parse } from 'date-fns';
import Button, { CloseButton } from '../ui/Button';
import {
  List,
  ListItem,
  ListItemContent,
  ListItemText,
  ListItemHeader,
  ListItemDescription
} from '../ui/List';
import MyDialog, { MyDialogFooter } from '../ui/MyDialog';
import { titleCase, formatTime, formatDate } from '../util/helpers';
import { getIconByScheduleType } from './course-utils';
import { Color } from '../theme';
import Divider from '../ui/Divider';
import MoreInfoLink from '../ui/MoreInfoLink';
import { CourseScheduleAttributes } from '../api/student/course-schedule';
import { FC } from 'react';

const Course: FC<{
  attributes: CourseScheduleAttributes;
  isOpen: boolean;
  toggleCourse: Function;
}> = ({
  attributes: { courseTitle, courseNumber, courseSubject, faculty, meetingTimes },
  isOpen,
  toggleCourse
}) => (
  <MyDialog isOpen={isOpen} data-testid="course-dialog">
    <CloseButton onClick={toggleCourse} />
    <h2>
      {courseSubject} {courseNumber}
    </h2>
    <div className="details">{titleCase(courseTitle)}</div>
    <List>
      {meetingTimes.map(
        ({
          beginDate,
          endDate,
          beginTime,
          endTime,
          room,
          weeklySchedule,
          building,
          buildingDescription,
          scheduleDescription,
          scheduleType
        }) => (
          <ListItem key={beginDate + beginTime}>
            <ListItemContent>
              <Icon icon={getIconByScheduleType(scheduleType)} color={Color['orange-200']} />
              <ListItemText>
                <ListItemHeader>{scheduleDescription}</ListItemHeader>
                <ListItemDescription>
                  {room} {building} <br />
                  {beginDate != endDate
                    ? weeklySchedule.map((day, index) => day)
                    : formatDate(parse(beginDate), 'noYear')}{' '}
                  &middot; {formatTime(beginTime)} - {formatTime(endTime)}
                </ListItemDescription>
              </ListItemText>
              <a href={`https://map.oregonstate.edu/?building=${building}`} target="blank">
                <VisuallyHidden>View {buildingDescription} on map</VisuallyHidden>
                <Icon icon={faMapMarkerAlt} />
              </a>
            </ListItemContent>
          </ListItem>
        )
      )}
    </List>
    <Divider />
    <List>
      {faculty.map(fac => (
        <ListItem key={fac.osuId}>
          <ListItemContent>
            <Icon icon={faChalkboardTeacher} color={Color['neutral-600']} />
            <ListItemText>
              <ListItemHeader>{fac.name}</ListItemHeader>
              <ListItemDescription>Instructor</ListItemDescription>
            </ListItemText>
            <a href={`mailto:${fac.email}`}>
              <VisuallyHidden>E-mail {fac.name}</VisuallyHidden>
              <Icon icon={faEnvelope} />
            </a>
          </ListItemContent>
        </ListItem>
      ))}
    </List>
    {/* TODO: Add appropriate link */}
    <MyDialogFooter>
      <MoreInfoLink text="View Courses" href="https://UPDATEME.edu" />
    </MyDialogFooter>
  </MyDialog>
);

export default Course;
