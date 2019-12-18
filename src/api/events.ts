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

// Employee Events for use in the EmployeeDashboard
const getEmployeeEvents = (): Promise<IEvents> =>
  axios.get('/api/events/employee').then(res => res.data);

const useEmployeeEvents = () => useAPICall<IEvents>(getEmployeeEvents, undefined, data => data, []);

const getStudentExperienceEvents = () => axios.get('/api/events').then(res => res.data);

const useStudentExperienceEvents = () =>
  useAPICall(getStudentExperienceEvents, undefined, data => data, []);

const getCampusEvents = (name: string) =>
  axios.get(`/api/events/campus/${name}`).then(res => res.data);

const useCampusEvents = (name: string) => useAPICall(getCampusEvents, name, data => data, []);

export {
  useStudentExperienceEvents,
  useAcademicCalendarEvents,
  useCampusEvents,
  useEmployeeEvents
};
