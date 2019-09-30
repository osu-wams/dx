import axios from 'axios';
import useAPICall from '../useAPICall';

export const getGpa = (): Promise<GpaLevel> => axios.get(`/api/student/gpa`).then(res => res.data);
export const useGpa = () =>
  useAPICall<GpaLevel>(getGpa, undefined, data => data, { gpa: '' });

export type GpaLevel = {
  gpa: string;
};
