import axios from 'axios';

export const getAccountHolds = (): Promise<Hold[]> =>
  axios.get('/api/student/holds').then(res => res.data);

export type Hold = {
  description: string;
};
