import axios from 'axios';
import { useAPICall } from '@osu-wams/hooks';

const getRaveAlerts = () => axios.get('/api/alerts').then(res => res.data);
const getDxAlerts = () => axios.get('/api/alerts/dx').then(res => res.data);
const useRaveAlerts = () =>
  useAPICall<Alert[]>({
    api: getRaveAlerts,
    dataTransform: data => data,
    initialState: []
  });
const useDxAlerts = () =>
  useAPICall<Alert[]>({
    api: getDxAlerts,
    dataTransform: data => data,
    initialState: []
  });

export type Alert = {
  title: string;
  date: Date;
  content: string;
  type: string;
};

export { useRaveAlerts, useDxAlerts };
