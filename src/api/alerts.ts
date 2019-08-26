import axios from 'axios';

export const getRaveAlerts = () => axios.get('/api/alerts').then(res => res.data);
export const getDxAlerts = () => axios.get('/api/alerts/dx').then(res => res.data);

export type Alert = {
  title: string;
  date: Date;
  content: string;
  type: string;
};
