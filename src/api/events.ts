import axios from 'axios';
import useAPICall from './useAPICall';

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
const useAcademicCalendarEvents = () =>
  useAPICall<IEvents>(getAcademicCalendarEvents, undefined, data => data, []);

const getStudentExperienceEvents = () =>
  axios
    .get('/api/events', {
      params: {
        type: 115613,
        days: 30
      }
    })
    .then(res => res.data);

const getBendEvents = () => 
    axios
      .get('/api/events/bend-events', {
        params: {
          campus_id: 273,
          days: 30
        }
      })
      .then(res => res.data);


const useStudentExperienceEvents = () =>
  useAPICall(getStudentExperienceEvents, undefined, data => data, []);

const useBendEvents = () =>
  useAPICall(getBendEvents, undefined, data => data, []);

export { useStudentExperienceEvents, useAcademicCalendarEvents, useBendEvents };
