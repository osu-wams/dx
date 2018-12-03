import React from 'react';
import { render } from '../componentTestUtils';
import { fireEvent, waitForElement } from 'react-testing-library';
import Academics from '../components/pages/Academics';

// This will be our mock data to be used later and what the tests are based on
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

test('renders', () => {
  render(<Academics />);
});

test('Specific course loads on click, close button closes', async () => {
  const { getByText, getByTestId, queryByTestId } = render(<Academics />);

  const OpSysBtn = getByText('Operating Systems I');

  // Dialgo is present and matches the particular course CRN
  fireEvent.click(OpSysBtn);
  const courseDialog = await waitForElement(() => getByTestId('course-dialog'));
  expect(courseDialog).toBeInTheDocument();
  expect(courseDialog).toHaveTextContent(/CRN: 17851/i);

  // Close dialog
  const closeBtn = getByText('Close');
  fireEvent.click(closeBtn);
  expect(queryByTestId('course-dialog')).toBeNull();
});
