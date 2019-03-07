import axios from 'axios';

export const getAcademicCalendarEvents = () =>
  axios.get('/api/events/academic-calendar').then(res => res.data);
