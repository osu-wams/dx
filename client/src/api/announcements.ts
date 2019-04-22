import axios from 'axios';

export const getAnnouncements = (): Promise<any> =>
  axios.get('/api/announcements').then(res => res.data);
