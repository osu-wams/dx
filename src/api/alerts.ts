import axios from 'axios';

export const getAlerts = () => axios.get('/api/alerts').then(res => res.data);

export type RaveAlert = {
  title: string;
  date: Date;
  content: string;
};
