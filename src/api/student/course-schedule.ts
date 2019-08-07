import axios from 'axios';

const getCourseSchedule = (term = 'current'): Promise<CourseSchedule[]> =>
  axios.get(`/api/student/class-schedule?term=${term}`).then(res => res.data);

export type Faculty = {
  email: string;
  name: string;
  osuId: string;
  primary: boolean;
};

export type MeetingTime = {
  beginDate: string;
  beginTime: string;
  building: string;
  buildingDescription: string;
  campus: string;
  creditHourSession: number;
  endDate: string;
  endTime: string;
  hoursPerWeek: number;
  room: string;
  scheduleType: string;
  scheduleDescription: string;
  weeklySchedule: string[];
};

export type CourseSchedule = {
  id: string;
  attributes: CourseScheduleAttributes;
  links: string;
  type: string;
};

export type CourseScheduleAttributes = {
  academicYear: string;
  academicYearDescription: string;
  continuingEducation: boolean;
  courseNumber: string;
  courseReferenceNumber: string;
  courseSubject: string;
  courseSubjectDescription: string;
  courseTitle: string;
  creditHours: number;
  faculty: Faculty[];
  gradingMode: string;
  meetingTimes: MeetingTime[];
  registrationStatus: string;
  scheduleDescription: string;
  scheduleType: string;
  sectionNumber: string;
  term: string;
  termDescription: string;
};

export { getCourseSchedule };
