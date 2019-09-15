import axios from 'axios';

const getCourseSchedule = (term = 'current'): Promise<ICourseSchedule[]> =>
  axios.get(`/api/student/class-schedule?term=${term}`).then(res => res.data);

export interface IFaculty {
  email: string;
  name: string;
  primary: boolean;
}

export interface IMeetingTime {
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
}

export interface ICourseSchedule {
  id: string;
  attributes: ICourseScheduleAttributes;
  links: string;
  type: string;
}

export interface ICourseScheduleAttributes {
  academicYear: string;
  academicYearDescription: string;
  continuingEducation: boolean;
  courseNumber: string;
  courseReferenceNumber: string;
  courseSubject: string;
  courseSubjectDescription: string;
  courseTitle: string;
  creditHours: number;
  faculty: IFaculty[];
  gradingMode: string;
  meetingTimes: IMeetingTime[];
  registrationStatus: string;
  scheduleDescription: string;
  scheduleType: string;
  sectionNumber: string;
  term: string;
  termDescription: string;
}

export { getCourseSchedule };
