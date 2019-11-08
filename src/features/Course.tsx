import React, { FC, useContext } from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import ReactGA from 'react-ga';
import generateId from 'uuid/v4';
import { faMapMarkerAlt, faEnvelope, faChalkboardTeacher } from '@fortawesome/pro-light-svg-icons';
import { parse } from 'date-fns';
import Icon from '../ui/Icon';
import { CloseButton } from '../ui/Button';
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
import Divider from '../ui/Divider';
import { ICourseScheduleAttributes, IFaculty } from '../api/student/course-schedule';
import { ExternalLink } from '../ui/Link';
import Url from '../util/externalUrls.data';
import { Event } from '../util/gaTracking';
import { courseOnCorvallisCampus } from './schedule/schedule-utils';
import { ThemeContext } from 'styled-components';

function isMidterm(room: string, scheduleType: string) {
  return room === 'MID' || scheduleType === 'MID';
}

const buildingCampusMap = (building: string, buildingDescription: string): JSX.Element => (
  <a
    href={Url.campusMap.building + building}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => Event('course', 'course location clicked', Url.campusMap.building + building)}
  >
    <VisuallyHidden>View {buildingDescription} on map</VisuallyHidden>
    <Icon icon={faMapMarkerAlt} />
  </a>
);

const Course: FC<{
  attributes: ICourseScheduleAttributes;
  isOpen: boolean;
  toggleCourse: Function;
}> = ({
  attributes: { courseTitle, courseNumber, courseSubject, faculty, meetingTimes },
  isOpen,
  toggleCourse
}) => {
  const themeContext = useContext(ThemeContext);
  return (
    <MyDialog isOpen={isOpen} data-testid="course-dialog" aria-labelledby="course-title">
      {ReactGA.modalview('/academics/course-details')}
      <CloseButton onClick={toggleCourse} />
      <h2 id="course-title">
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
          }) =>
            // Midterms are inconsitently added in banner, so we are not displaying them
            !isMidterm(room, scheduleType) && (
              <ListItem key={generateId()}>
                <ListItemContent>
                  <Icon
                    icon={getIconByScheduleType(scheduleType)}
                    color={themeContext.features.academics.courses.dialog.meetingTime.icon.color}
                  />
                  <ListItemText>
                    <ListItemHeader>{scheduleDescription}</ListItemHeader>
                    <ListItemDescription>
                      {room} {building} <br />
                      {beginDate !== endDate
                        ? weeklySchedule.map((day, index) => day)
                        : formatDate(parse(beginDate), 'noYear')}{' '}
                      {beginTime && `\u00B7 ${formatTime(beginTime)} - ${formatTime(endTime)}`}
                    </ListItemDescription>
                  </ListItemText>
                  {courseOnCorvallisCampus(meetingTimes) &&
                    buildingCampusMap(building, buildingDescription)}
                </ListItemContent>
              </ListItem>
            )
        )}
      </List>
      <Divider />
      <List>
        {faculty.map((fac: IFaculty, index: number) => (
          <ListItem key={`${fac.email}-${index}`}>
            <ListItemContent>
              <Icon
                icon={faChalkboardTeacher}
                color={themeContext.features.academics.courses.dialog.faculty.icon.color}
              />
              <ListItemText>
                <ListItemHeader>{fac.name}</ListItemHeader>
                <ListItemDescription>Instructor</ListItemDescription>
              </ListItemText>
              <a
                href={`mailto:${fac.email}`}
                onClick={() => Event('course', 'email professor icon clicked', fac.name)}
              >
                <VisuallyHidden>E-mail {fac.name}</VisuallyHidden>
                <Icon icon={faEnvelope} />
              </a>
            </ListItemContent>
          </ListItem>
        ))}
      </List>
      <MyDialogFooter>
        <ExternalLink
          href={Url.canvas.main}
          onClick={() => Event('course', 'view courses clicked')}
        >
          View courses
        </ExternalLink>
      </MyDialogFooter>
    </MyDialog>
  );
};

export default Course;
