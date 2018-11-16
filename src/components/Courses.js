import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import { Card, CardHeader, CardHeaderTitle, CardHeaderSubtitle, CardContent } from './layout/Card';
import Icon from './layout/Icon';
import Badge from './layout/Badge';
import List from './layout/List';
import Course from './Course';
import { titleCase } from '../util/helpers';

const allCourses = [
  {
    id: 'BOGUS-DATA',
    type: 'class-schedule',
    attributes: {
      academicYear: '1617',
      academicYearDescription: 'Academic Year 2016-17',
      courseReferenceNumber: '14126',
      courseSubject: 'CS',
      courseSubjectDescription: 'Computer Science',
      courseNumber: '372',
      courseTitle: 'INTRODUCTION TO COMPUTER NETWORKS',
      sectionNumber: '001',
      term: '201701',
      termDescription: 'Fall 2016',
      scheduleDescription: 'Lecture',
      scheduleType: 'A',
      creditHours: 4,
      registrationStatus: '**Web Registered**',
      gradingMode: 'Normal Grading Mode',
      continuingEducation: false,
      faculty: [
        {
          osuID: '12345678',
          name: 'Broeg, Robert',
          email: 'fake.emailg@oregonstate.edu',
          primary: true
        }
      ],
      meetingTimes: [
        {
          beginDate: '2016-09-21',
          beginTime: '13:00:00',
          endDate: '2016-12-02',
          endTime: '13:50:00',
          room: '212',
          building: 'KEAR',
          buildingDescription: 'Kearney Hall',
          campus: ' Oregon State - Corvallis',
          hoursPerWeek: 2.5,
          creditHourSession: 4,
          scheduleType: 'A',
          weeklySchedule: ['M', 'W', 'F']
        },
        {
          beginDate: '2016-12-06',
          beginTime: '09:30:00',
          endDate: '2016-12-06',
          endTime: '11:20:00',
          room: '212',
          building: 'KEAR',
          buildingDescription: 'Kearney Hall',
          campus: ' Oregon State - Corvallis',
          hoursPerWeek: 1.83,
          creditHourSession: 0,
          scheduleType: 'FNL',
          weeklySchedule: ['T']
        }
      ]
    },
    links: {
      self: null
    }
  },
  {
    id: '123123123-123-123',
    type: 'class-schedule',
    attributes: {
      academicYear: '1617',
      academicYearDescription: 'Academic Year 2016-17',
      courseReferenceNumber: '17851',
      courseSubject: 'CS',
      courseSubjectDescription: 'Computer Science',
      courseNumber: '344',
      courseTitle: 'OPERATING SYSTEMS I',
      sectionNumber: '001',
      term: '201701',
      termDescription: 'Fall 2016',
      scheduleDescription: 'Lecture',
      scheduleType: 'A',
      creditHours: 4,
      registrationStatus: '**Web Registered**',
      gradingMode: 'Normal Grading Mode',
      continuingEducation: false,
      faculty: [
        {
          osuID: '123456',
          name: 'Brewster, Benjamin',
          email: 'bogusAddress@onid.oregonstate.edu',
          primary: true
        },
        {
          osuID: '1234567',
          name: 'Testo, Tester',
          email: 'superbogus@oregonstate.edu',
          primary: true
        }
      ],
      meetingTimes: [
        {
          beginDate: '2016-09-21',
          beginTime: '16:00:00',
          endDate: '2016-12-02',
          endTime: '16:50:00',
          room: '200',
          building: 'LINC',
          buildingDescription: 'Learning Innovation Center',
          campus: ' Oregon State - Corvallis',
          hoursPerWeek: 2.5,
          creditHourSession: 4,
          scheduleType: 'A',
          weeklySchedule: ['M', 'W', 'F']
        }
      ]
    },
    links: {
      self: null
    }
  }
];

const totalCredits = allCourses.reduce(
  (accumulator, current) => accumulator + current.attributes.creditHours,
  0
);

export default class Courses extends Component {
  state = {
    courses: allCourses,
    courseAttributes: null,
    showCourse: false
  };

  // Hides or shows course details
  toggleCourse = courseAttributes => {
    this.setState(state => ({
      showCourse: !state.showCourse,
      courseAttributes
    }));
  };

  render() {
    const { courses, showCourse, courseAttributes } = this.state;
    const term = courses[0].attributes.termDescription;
    return (
      <Card color="stratosphere">
        <CardHeader>
          <CardHeaderTitle>
            <Icon icon={faChalkboardTeacher} color="stratosphere" />
            Courses
          </CardHeaderTitle>
          <CardHeaderSubtitle>
            <Badge inline badgeContent={totalCredits} bg="stratosphere">
              Credits
            </Badge>
          </CardHeaderSubtitle>
        </CardHeader>
        <CardContent>
          {term}
          <List>
            {courses.map(
              ({ id, attributes, attributes: { courseTitle, courseNumber, courseSubject } }) => (
                <li key={id}>
                  <button type="button" onClick={() => this.toggleCourse(attributes)}>
                    <span>
                      {titleCase(courseTitle)}
                      <div>
                        {courseSubject} {courseNumber}
                      </div>
                    </span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </li>
              )
            )}
          </List>
          {showCourse && <Course attributes={courseAttributes} toggleCourse={this.toggleCourse} />}
        </CardContent>
      </Card>
    );
  }
}
