import React, { FC, useContext } from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import styled, { ThemeContext } from 'styled-components/macro';
import ReactGA from 'react-ga4';
import { faMapMarkerAlt, faEnvelope } from '@fortawesome/pro-light-svg-icons';
import Icon from '../ui/Icon';
import { CloseButton } from 'src/ui/Button';
import {
  List,
  ListItem,
  ListItemContent,
  ListItemText,
  ListItemHeader,
  ListItemDescription,
  ListItemLeadText,
} from 'src/ui/List';
import MyDialog, { MyDialogFooter, MyDialogHeader } from 'src/ui/MyDialog';
import { Url, Helpers } from '@osu-wams/utils';
import { getIconByScheduleType } from './course-utils';
import Divider from 'src/ui/Divider';
import { ExternalLink } from 'src/ui/Link';
import { Event } from 'src/util/gaTracking';
import {
  ICoursesMap,
  exceptMeetingTypes,
  meetingTimeOnCorvallisCampus,
  onlyMeetingTypes,
  examName,
} from './schedule/schedule-utils'; // eslint-disable  @typescript-eslint/no-unused-vars
import { fontSize, spacing, MOSTheme } from '@osu-wams/theme';
import { Types } from '@osu-wams/lib';

const { formatTime, format, singularPlural } = Helpers;
interface ICourse {
  coursesMap: ICoursesMap;
  isOpen: boolean;
  toggleCourse: Function;
}

const CourseListItem = styled(ListItem)`
  &:last-child {
    margin-bottom: 0;
  }
`;

const FacultyLink = styled.a`
  font-size: ${fontSize[14]};
  color: ${({ theme }) => theme.features.academics.courses.dialog.faculty.link.color};
  text-decoration: none;
  svg {
    margin-right: ${spacing.default};
    vertical-align: bottom;
    width: ${fontSize[20]} !important;
    height: ${fontSize[20]} !important;
    font-size: ${fontSize[14]} !important;
  }
`;

const MapLink = styled(FacultyLink)`
  color: ${({ theme }) => theme.features.academics.courses.dialog.map.link.color};
  svg {
    margin-right: 0;
    font-size: ${fontSize[26]} !important;
    width: ${fontSize[26]} !important;
    height: ${fontSize[26]} !important;
  }
`;

/**
 * @param meetingTime
 * Some courses do not have any data for meetingTime
 */
const meetingDateTime = (meetingTime: Types.CourseScheduleMeetingTime): string => {
  let returnData = '';
  if (meetingTime.beginDate) {
    const date =
      meetingTime.beginDate !== meetingTime.endDate
        ? meetingTime.weeklySchedule.map((day) => day)
        : format(meetingTime.beginDate, 'MMMM d');
    returnData += date || '';
  }
  if (meetingTime.beginTime && meetingTime.endTime) {
    const time = ` \u00B7 ${formatTime(meetingTime.beginTime)} - ${formatTime(
      meetingTime.endTime
    )}`;
    returnData += time || '';
  }
  return returnData ? returnData : 'There are no dates and times associated with this course.';
};

const meetingTimeListItem = (
  key: string,
  meetingTime: Types.CourseScheduleMeetingTime,
  themeContext: MOSTheme
): JSX.Element => (
  <CourseListItem key={key}>
    <ListItemContent style={{ paddingBottom: 0 }}>
      <Icon
        icon={getIconByScheduleType(meetingTime.scheduleType)}
        color={themeContext.features.academics.courses.dialog.meetingTime.icon.color}
      />
      <ListItemText>
        <ListItemHeader>{meetingTime.scheduleDescription}</ListItemHeader>
      </ListItemText>
      {meetingTimeOnCorvallisCampus(meetingTime) &&
        buildingCampusMap(
          meetingTime.building,
          meetingTime.buildingDescription,
          meetingTime.room,
          themeContext
        )}
    </ListItemContent>
    <ListItemContent style={{ marginTop: 0, marginBottom: 0, paddingBottom: 0 }}>
      <ListItemText>
        <ListItemDescription>
          {meetingTime.room && meetingTime.room}{' '}
          {meetingTime.buildingDescription && meetingTime.buildingDescription}
        </ListItemDescription>
        <ListItemDescription>{meetingDateTime(meetingTime)}</ListItemDescription>
      </ListItemText>
    </ListItemContent>
  </CourseListItem>
);

const facultyListItem = (
  faculty: Types.CourseScheduleFaculty,
  index: number,
  themeContext: MOSTheme
): JSX.Element => (
  <CourseListItem key={`${faculty.email}-${index}`}>
    <ListItemContent style={{ paddingBottom: 0 }}>
      {faculty.email && faculty.name && (
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
      )}
    </ListItemContent>
  </CourseListItem>
);

const buildingCampusMap = (
  building: string,
  buildingDescription: string,
  room: string,
  themeContext: MOSTheme
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
      />
    </ListItemText>
  </MapLink>
);

const Course: FC<ICourse> = ({ coursesMap, isOpen, toggleCourse }) => {
  const themeContext = useContext(ThemeContext);
  return (
    <MyDialog
      padding="false"
      isOpen={isOpen}
      onDismiss={() => toggleCourse()}
      data-testid="course-dialog"
      aria-labelledby="course-title"
    >
      {ReactGA.send({ hitType: 'modalview', page: '/academics/course-details' })}
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
              fontSize={fontSize[16]}
              color={themeContext.features.academics.courses.list.title.color}
            >
              {coursesMap.title}
            </ListItemDescription>
            <ListItemDescription>
              {coursesMap.creditHours} {singularPlural(coursesMap.creditHours, 'Credit')}
            </ListItemDescription>
          </ListItemText>
        </div>
      </MyDialogHeader>
      {coursesMap.courses.map((course, index) => (
        <div key={`${course.id}-${index}`} style={{ padding: '0.5rem' }}>
          {index > 0 && <Divider />}
          <List>
            {exceptMeetingTypes(course.attributes.meetingTimes, ['MID', 'FNL']).map((m, i) =>
              meetingTimeListItem(`${i}-meetingtime`, m, themeContext)
            )}
            {course.attributes.courseReferenceNumber && (
              <ListItemContent style={{ paddingBottom: 0 }}>
                <ListItemText>
                  <ListItemDescription>
                    CRN {course.attributes.courseReferenceNumber}
                  </ListItemDescription>
                </ListItemText>
              </ListItemContent>
            )}
          </List>
          <List>
            {course.attributes.faculty.map((fac: Types.CourseScheduleFaculty, index: number) =>
              facultyListItem(fac, index, themeContext)
            )}
          </List>
        </div>
      ))}
      {onlyMeetingTypes(coursesMap.meetingTimes, ['FNL']).length > 0 && (
        <>
          <Divider />
          <List>
            <CourseListItem key={'other-meetings'}>
              <ListItemContent style={{ paddingBottom: 0 }}>
                <ListItemText>
                  <ListItemHeader>Other Meetings</ListItemHeader>
                </ListItemText>
              </ListItemContent>
            </CourseListItem>
            {onlyMeetingTypes(coursesMap.meetingTimes, ['FNL']).map((m, i) => (
              <CourseListItem key={`${i}-other-meeting`}>
                <ListItemContent>
                  <ListItemText>
                    <ListItemHeader>{examName(m)}</ListItemHeader>
                    <ListItemDescription>{meetingDateTime(m)}</ListItemDescription>
                  </ListItemText>
                </ListItemContent>
              </CourseListItem>
            ))}
          </List>
        </>
      )}
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
