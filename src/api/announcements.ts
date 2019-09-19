import axios from 'axios';
import useAPICall from './useAPICall';

// TODO: once refactoring is done for use of hooks, remove export
export const getAnnouncements = (type): Promise<any> =>
  axios.get(`/api/announcements/${type}`).then(res => res.data);
export const useAnnouncements = (type: string) =>
  useAPICall<any[]>(getAnnouncements, type, data => data, []);
