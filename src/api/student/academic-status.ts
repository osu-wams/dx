import axios from 'axios';

export const getAcademicStatus = (): Promise<AcademicStatus> =>
  axios.get(`/api/student/academic-status`).then(res => res.data);

export type AcademicStatus = {
  academicStanding: string;
  term: string;
  creditHoursAttempted: number;
};
