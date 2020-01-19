import axios from 'axios';
import { useAPICall } from '@osu-wams/hooks';
import { initialUser } from './user';

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
  useAPICall<IEvents>({
    api: getAcademicCalendarEvents,
    dataTransform: data => data,
    initialState: []
  });

// Employee Events for use in the EmployeeDashboard
const getEmployeeEvents = (): Promise<IEvents> =>
  axios.get('/api/events/employee').then(res => res.data);

const useEmployeeEvents = () =>
  useAPICall<IEvents>({ api: getEmployeeEvents, dataTransform: data => data, initialState: [] });

const getStudentExperienceEvents = () => axios.get('/api/events').then(res => res.data);

const useStudentExperienceEvents = () =>
  useAPICall({ api: getStudentExperienceEvents, dataTransform: data => data, initialState: [] });

const getCampusEvents = (name: string) =>
  axios.get(`/api/events/campus/${name}`).then(res => res.data);

const useCampusEvents = (name: string) =>
  useAPICall({ api: getCampusEvents, query: name, dataTransform: data => data, initialState: [] });

export {
  useStudentExperienceEvents,
  useAcademicCalendarEvents,
  useCampusEvents,
  useEmployeeEvents
};
