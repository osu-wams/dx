import axios from 'axios';

export const getAnnouncements = (type): Promise<any> =>
  axios.get(`/api/announcements/${type}`).then(res => res.data);
