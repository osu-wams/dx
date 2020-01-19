import axios from 'axios';
import { useAPICall } from '@osu-wams/hooks';
import postError from './errors';

const getRaveAlerts = () => axios.get('/api/alerts').then(res => res.data);
const getDxAlerts = () => axios.get('/api/alerts/dx').then(res => res.data);
const useRaveAlerts = () =>
  useAPICall<Alert[]>({
    api: getRaveAlerts,
    dataTransform: data => data,
    initialState: [],
    postError
  });
const useDxAlerts = () =>
  useAPICall<Alert[]>({
    api: getDxAlerts,
    dataTransform: data => data,
    initialState: [],
    postError
  });

export type Alert = {
  title: string;
  date: Date;
  content: string;
  type: string;
};

export { useRaveAlerts, useDxAlerts };
