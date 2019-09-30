import axios from 'axios';
import useAPICall from './useAPICall';

const getRaveAlerts = () => axios.get('/api/alerts').then(res => res.data);
const getDxAlerts = () => axios.get('/api/alerts/dx').then(res => res.data);
const useRaveAlerts = () => useAPICall<Alert[]>(getRaveAlerts, undefined, data => data, []);
const useDxAlerts = () => useAPICall<Alert[]>(getDxAlerts, undefined, data => data, []);

export type Alert = {
  title: string;
  date: Date;
  content: string;
  type: string;
};

export { useRaveAlerts, useDxAlerts };
