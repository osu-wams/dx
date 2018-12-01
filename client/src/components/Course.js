import React from 'react';
import PropTypes from 'prop-types';
import VisuallyHidden from '@reach/visually-hidden';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChalkboardTeacher,
  faCalendarAlt,
  faEdit,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import Button from './layout/Button';
import MyDialog from './layout/MyDialog';
import Icon from './layout/Icon';
import { titleCase, formatTime, formatDate } from '../util/helpers';

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
  showCourse,
  toggleCourse
}) => (
  <MyDialog isOpen={showCourse} color="stratosphere" data-testid="course-dialog">
    <Button type="cancel" onClick={() => toggleCourse()} bg="stratosphere" outline>
      <Icon icon={faTimes} />
      <VisuallyHidden>Close</VisuallyHidden>
    </Button>
    <h2>{titleCase(courseTitle)}</h2>
    <div className="details">
      {courseSubject} {courseNumber} &bull; CRN: {courseReferenceNumber} &bull; Section{' '}
      {sectionNumber} &bull; {creditHours} Credits
    </div>
    <Button as="a" href="#canvasDeepLink" bg="stratosphere">
      View in canvas
    </Button>
    <Button outline href="#canvasDeepLink" bg="stratosphere">
      Actions <FontAwesomeIcon icon={faChevronRight} />
    </Button>

    <h3>
      <FontAwesomeIcon icon={faChalkboardTeacher} /> Instructor(s)
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
      <FontAwesomeIcon icon={faCalendarAlt} /> Meeting Times(s)
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

    <h3>
      <FontAwesomeIcon icon={faEdit} /> Grading
    </h3>
  </MyDialog>
);

Course.propTypes = {
  attributes: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.array])
  ).isRequired,
  showCourse: PropTypes.bool,
  toggleCourse: PropTypes.func.isRequired
};

Course.defaultProps = {
  showCourse: true
};

export default Course;
