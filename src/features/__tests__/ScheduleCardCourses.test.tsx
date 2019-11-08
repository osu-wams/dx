import React from 'react';
import { fireEvent, waitForElement, cleanup } from '@testing-library/react';
import { render } from '../../util/test-utils';
import { ScheduleCardCourses } from '../schedule/ScheduleCardCourses';

const mockCourse = {
  attributes: {
    academicYear: '1920',
    academicYearDescription: 'Academic Year 2019-20',
    continuingEducation: false,
    courseNumber: '599',
    courseReferenceNumber: '19708',
    courseSubject: 'ENGR',
    courseSubjectDescription: 'Engineering Science',
    courseTitle: 'TEST COURSE',
    creditHours: 1,
    faculty: [
      {
        email: 'nobody@testing.com',
        name: 'N/A',
        primary: true
      }
    ],
    gradingMode: 'Normal Grading Mode',
    meetingTimes: [
      {
        beginDate: '2019-09-25',
        beginTime: '08:00:00',
        building: 'BEXL',
        buildingDescription: 'Bexell Hall',
        campus: ' Oregon State - Corvallis',
        campusCode: 'C',
        creditHourSession: 1,
        endDate: '2019-12-06',
        endTime: '08:50:00',
        hoursPerWeek: 0.83,
        room: '321',
        scheduleDescription: 'Lecture',
        scheduleType: 'A',
        weeklySchedule: ['Th']
      }
    ],
    registrationStatus: '**Web Registered**',
    scheduleDescription: 'Lecture',
    scheduleType: 'A',
    sectionNumber: '003',
    term: '202001',
    termDescription: 'Fall 2019'
  },
  id: 'bogus-id-4',
  links: { self: null },
  type: 'class-schedule'
};

describe('<ScheduleCardCourses />', () => {
  it('Renders both with a course, and with no courses', () => {
    render(<ScheduleCardCourses selectedCourses={[mockCourse]} />);
    cleanup();
    render(<ScheduleCardCourses selectedCourses={[]} />);
  });

  it('Specific course loads on click, close button closes', async () => {
    const { getByText, getByTestId, queryByTestId } = render(
      <ScheduleCardCourses selectedCourses={[mockCourse]} />
    );
    expect(() => getByText('ERROR')).toThrow(); // Testing to make sure stuff we aren't expecting will throw
    const OpSysBtn = await waitForElement(() => getByText('ENGR')); // Throws if mockCourse doesn't load
    fireEvent.click(OpSysBtn);
    const courseDialog = await waitForElement(() => getByTestId('course-dialog'));
    expect(courseDialog).toBeInTheDocument();
    expect(courseDialog).toHaveTextContent(/test course/i);
    const closeBtn = await waitForElement(() => getByText('Close'));
    fireEvent.click(closeBtn);
    expect(queryByTestId('course-dialog')).toBeNull();
  });
});
