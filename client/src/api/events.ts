import axios from 'axios';

const getAcademicCalendarEvents = () =>
  axios.get('/api/events/academic-calendar').then(res => res.data);

const getStudentExperienceEvents = () =>
  axios
    .get('/api/events', {
      params: {
        type: 115613,
        days: 7
      }
    })
    .then(res => res.data);

export { getAcademicCalendarEvents, getStudentExperienceEvents };
