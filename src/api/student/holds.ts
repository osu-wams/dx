import axios from 'axios';
import { useAPICall } from '@osu-wams/hooks';

export const getAccountHolds = (): Promise<Hold[]> =>
  axios.get('/api/student/holds').then(res => res.data);

export const useAccountHolds = () =>
  useAPICall<Hold[]>({ api: getAccountHolds, dataTransform: data => data, initialState: [] });

export type Hold = {
  description: string;
};
