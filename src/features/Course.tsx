import React, { FC, useContext } from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import ReactGA from 'react-ga';
import generateId from 'uuid/v4';
import { faMapMarkerAlt, faEnvelope } from '@fortawesome/pro-light-svg-icons';
import { parse } from 'date-fns';
import Icon from '../ui/Icon';
import { CloseButton } from '../ui/Button';
import {
  List,
  ListItem,
  ListItemContent,
  ListItemText,
  ListItemHeader,
  ListItemDescription,
  ListItemLeadText
} from '../ui/List';
import MyDialog, { MyDialogFooter, MyDialogHeader } from '../ui/MyDialog';
import { titleCase, formatTime, formatDate, singularPlural } from '../util/helpers';
import { getIconByScheduleType } from './course-utils';
import Divider from '../ui/Divider';
import { IFaculty, IMeetingTime } from '../api/student/course-schedule';
import { ExternalLink } from '../ui/Link';
import Url from '../util/externalUrls.data';
import { Event } from '../util/gaTracking';
import {
  ICoursesMap,
  exceptMeetingTypes,
  meetingTimeOnCorvallisCampus,
  onlyMeetingTypes,
  examName
} from './schedule/schedule-utils'; // eslint-disable  @typescript-eslint/no-unused-vars
import { ThemeContext, themeSettings, ThemeConfiguration, styled } from '../theme';

interface ICourse {
  coursesMap: ICoursesMap;
  isOpen: boolean;
  toggleCourse: Function;
}

const CourseListItem = styled(ListItem)`
  &:last-child {
    margin-bottom: 0;
`;

const FacultyLink = styled.a`
  font-size: ${themeSettings.fontSize[14]};
  color: ${({ theme }) => theme.features.academics.courses.dialog.faculty.link.color};
  text-decoration: none;
  svg {
    margin-right: ${themeSettings.spacing.unit / 2}px;
    vertical-align: bottom;
    width: ${themeSettings.fontSize[20]} !important;
    height: ${themeSettings.fontSize[20]} !important;
    font-size: ${themeSettings.fontSize[14]} !important;
  }
`;

const MapLink = styled(FacultyLink)`
  color: ${({ theme }) => theme.features.academics.courses.dialog.map.link.color};
  svg {
    margin-right: 0;
  }
`;

const meetingDateTime = (meetingTime: IMeetingTime): string => {
  const date =
    meetingTime.beginDate !== meetingTime.endDate
      ? meetingTime.weeklySchedule.map(day => day)
      : formatDate(parse(meetingTime.beginDate), 'noYear');
  const time =
    meetingTime.beginTime &&
    `\u00B7 ${formatTime(meetingTime.beginTime)} - ${formatTime(meetingTime.endTime)}`;
  return `${date} ${time}`;
};

const meetingTimeListItem = (
  meetingTime: IMeetingTime,
  themeContext: ThemeConfiguration
): JSX.Element => (
  <CourseListItem key={generateId()}>
    <ListItemContent>
      <Icon
        icon={getIconByScheduleType(meetingTime.scheduleType)}
        color={themeContext.features.academics.courses.dialog.meetingTime.icon.color}
      />
      <ListItemText>
        <ListItemHeader>{meetingTime.scheduleDescription}</ListItemHeader>
        <ListItemDescription>{meetingTime.buildingDescription}</ListItemDescription>
        <ListItemDescription>{meetingDateTime(meetingTime)}</ListItemDescription>
      </ListItemText>
      {meetingTimeOnCorvallisCampus(meetingTime) &&
        buildingCampusMap(
          meetingTime.building,
          meetingTime.buildingDescription,
          meetingTime.room,
          themeContext
        )}
    </ListItemContent>
  </CourseListItem>
);

const facultyListItem = (
  faculty: IFaculty,
  index: number,
  themeContext: ThemeConfiguration
): JSX.Element => (
  <CourseListItem key={`${faculty.email}-${index}`}>
    <ListItemContent>
      <FacultyLink
        href={`mailto:${faculty.email}`}
        onClick={() => Event('course', 'email professor icon clicked', faculty.name)}
      >
        <VisuallyHidden>E-mail {faculty.name}</VisuallyHidden>
        <ListItemText>
          <Icon
            icon={faEnvelope}
            color={themeContext.features.academics.courses.dialog.faculty.icon.color}
          />{' '}
          {faculty.name}
        </ListItemText>
      </FacultyLink>
    </ListItemContent>
  </CourseListItem>
);

const buildingCampusMap = (
  building: string,
  buildingDescription: string,
  room: string,
  themeContext: ThemeConfiguration
): JSX.Element => (
  <MapLink
    href={Url.campusMap.building + building}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => Event('course', 'course location clicked', Url.campusMap.building + building)}
  >
    <VisuallyHidden>View {buildingDescription} on map</VisuallyHidden>
    <ListItemText>
      <Icon
        icon={faMapMarkerAlt}
        color={themeContext.features.academics.courses.dialog.map.icon.color}
      />{' '}
      {building} {room}
    </ListItemText>
  </MapLink>
);

const Course: FC<ICourse> = ({ coursesMap, isOpen, toggleCourse }) => {
  const themeContext = useContext(ThemeContext);
  return (
    <MyDialog isOpen={isOpen} data-testid="course-dialog" aria-labelledby="course-title">
      {ReactGA.modalview('/academics/course-details')}
      <MyDialogHeader>
        <CloseButton onClick={toggleCourse} />
        <div>
          <ListItemLeadText data-testid="course-list-item-header">
            <div>{coursesMap.subject}</div>
            <div>
              <strong>{coursesMap.number}</strong>
            </div>
          </ListItemLeadText>
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
        </div>
      </MyDialogHeader>
      {coursesMap.courses.map(course => (
        <div key={generateId()} style={{ padding: '0.5rem' }}>
          <List>
            {exceptMeetingTypes(course.attributes.meetingTimes, ['MID', 'FNL']).map(m =>
              meetingTimeListItem(m, themeContext)
            )}
          </List>
          <List>
            {course.attributes.faculty.map((fac: IFaculty, index: number) =>
              facultyListItem(fac, index, themeContext)
            )}
          </List>
          <Divider />
        </div>
      ))}
      <List>
        <CourseListItem key={generateId()}>
          <ListItemContent style={{ paddingBottom: 0 }}>
            <ListItemText>
              <ListItemHeader>Other Meetings</ListItemHeader>
            </ListItemText>
          </ListItemContent>
        </CourseListItem>
        {onlyMeetingTypes(coursesMap.meetingTimes, ['FNL', 'MID']).map(m => (
          <CourseListItem key={generateId()}>
            <ListItemContent>
              <ListItemText>
                <ListItemHeader>{examName(m.room)}</ListItemHeader>
                <ListItemDescription>{meetingDateTime(m)}</ListItemDescription>
              </ListItemText>
            </ListItemContent>
          </CourseListItem>
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
