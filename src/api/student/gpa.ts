import axios from 'axios';
import useAPICall from '../useAPICall';

export const gpaInitialState: GpaLevel[] = [{ gpa: '', gpaType: '', level: '' }];
export const getGpa = (): Promise<GpaLevel> => axios.get(`/api/student/gpa`).then(res => res.data);
export const useGpa = () =>
  useAPICall<GpaLevel[]>(getGpa, undefined, data => data, gpaInitialState);

export type GpaLevel = {
  gpa: string;
  gpaType: string;
  level: string;
};
