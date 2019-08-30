import axios from 'axios';

interface IEvent {
  content: string;
  contentSnippet: string;
  isoDate: string;
  link: string;
  pubDate: string;
  title: string;
}

export type IEvents = IEvent[];

const getAcademicCalendarEvents = (): Promise<IEvents> =>
  axios.get('/api/events/academic-calendar').then(res => res.data);

const getStudentExperienceEvents = () =>
  axios
    .get('/api/events', {
      params: {
        type: 115613,
        days: 30
      }
    })
    .then(res => res.data);

export { getAcademicCalendarEvents, getStudentExperienceEvents };
