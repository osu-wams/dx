import React from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import Icon from '../ui/Icon';
import {
  faChevronRight,
  faChalkboardTeacher,
  faCalendarAlt,
  faTimes
} from '@fortawesome/pro-light-svg-icons';
import Button, { CloseButton } from '../ui/Button';
import MyDialog from '../ui/MyDialog';
import { titleCase, formatTime, formatDate } from '../util/helpers';
import { Color } from '../theme';

const Course = ({
  attributes: {
    courseTitle,
    courseNumber,
    courseSubject,
    courseReferenceNumber,
    sectionNumber,
    creditHours,
    faculty,
    meetingTimes,
    scheduleDescription
  },
  isOpen,
  toggleCourse
}) => (
  <MyDialog isOpen={isOpen} data-testid="course-dialog">
    <CloseButton onClick={toggleCourse} />
    <h2>{titleCase(courseTitle)}</h2>
    <div className="details">
      {courseSubject} {courseNumber} &bull; CRN: {courseReferenceNumber} &bull; Section{' '}
      {sectionNumber} &bull; {creditHours} Credits
    </div>
    <h3>
      <Icon icon={faChalkboardTeacher} /> Instructor(s)
    </h3>
    {faculty.map(fac => (
      <div key={fac.osuID}>
        {fac.name}{' '}
        <a href={`mailto:${fac.email}`}>
          Contact <VisuallyHidden>{fac.name}</VisuallyHidden>
        </a>
      </div>
    ))}

    <h3>
      <Icon icon={faCalendarAlt} /> Meeting Times(s)
    </h3>
    {meetingTimes.map(
      ({
        beginDate,
        endDate,
        beginTime,
        endTime,
        room,
        weeklySchedule,
        building,
        buildingDescription
      }) => (
        <div key={beginDate + beginTime}>
          <div>
            <strong>{scheduleDescription}</strong>
          </div>
          <div>
            <div>
              {weeklySchedule.map((day, index) => (index ? ', ' : '') + day)}{' '}
              {formatTime(beginTime)} - {formatTime(endTime)}
            </div>
            <div>
              {formatDate(beginDate)} - {formatDate(endDate)}
            </div>
            <div>
              <a href={`https://map.oregonstate.edu/?building=${building}`}>
                <VisuallyHidden>View</VisuallyHidden>
                {room} {buildingDescription} ({building}) <VisuallyHidden>on map</VisuallyHidden>
              </a>
            </div>
          </div>
        </div>
      )
    )}

    <Button bg={Color['stratosphere-400']}>See Course in Canvas</Button>
  </MyDialog>
);

export default Course;
