import axios from 'axios';

export const getGpa = (): Promise<GpaLevel> => axios.get(`/api/student/gpa`).then(res => res.data);

export type GpaLevel = {
  gpa: string;
};
