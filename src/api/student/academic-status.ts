import axios from 'axios';
import useAPICall from '../useAPICall';

const getAcademicStatus = (): Promise<AcademicStatus> =>
  axios.get(`/api/student/academic-status`).then(res => res.data);
export const useAcademicStatus = () =>
  useAPICall<AcademicStatus>(getAcademicStatus, undefined, data => data, {} as AcademicStatus);

export type AcademicStatus = {
  academicStanding: string;
  term: string;
};
