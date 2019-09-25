import axios from 'axios';
import useAPICall from '../useAPICall';

export const getAccountHolds = (): Promise<Hold[]> =>
  axios.get('/api/student/holds').then(res => res.data);

export const useAccountHolds = () =>
  useAPICall<Hold[]>(getAccountHolds, undefined, data => data, []);

export type Hold = {
  description: string;
};
