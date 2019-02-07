import axios from 'axios';
import getCourseSchedule from './course-schedule';

export { getCourseSchedule };

// Todo: Replace rest of API calls with properly-typed versions.

export const getUpcomingAssignments = () =>
  axios.get('/api/student/assignments').then(res => res.data);

export const getAcademicStatus = () =>
  axios.get(`/api/student/academic-status`).then(res => res.data);

export const getAccountBalance = () =>
  axios.get('/api/student/account-balance').then(res => res.data);

export const getAccountTransactions = () =>
  axios.get('/api/student/account-transactions').then(res => res.data);

export const getGrades = (term = 'current') =>
  axios.get(`/api/student/grades?term=${term}`).then(res => res.data);

export const getAccountHolds = () => axios.get('/api/student/holds').then(res => res.data);
