import axios from 'axios';
import { useAPICall } from '@osu-wams/hooks';

export const getGrades = (): Promise<Grades[]> =>
  axios.get(`/api/student/grades`).then(res => res.data);
export const useGrades = ({ callback = data => data } = {}) =>
  useAPICall<Grades[]>({ api: getGrades, dataTransform: callback, initialState: [] });

export type Grades = {
  type: string;
  id: string;
  links: string;
  attributes: GradesAttributes;
};

export type GradesAttributes = {
  courseReferenceNumber: string;
  gradeFinal: string;
  gradeMode: string;
  gradeModeDescription: string;
  courseSubject: string;
  courseSubjectDescription: string;
  courseNumber: string;
  courseTitle: string;
  sectionNumber: string;
  term: string;
  termDescription: string;
  scheduleDescription: string;
  scheduleType: string;
  creditHours: number;
  registrationStatus: string;
  courseLevel: string;
};
