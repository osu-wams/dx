import axios from 'axios';
import { getCourseSchedule } from './course-schedule';
import { getGrades } from './grades';
import { getAccountBalance } from './account-balance';
import { getPlannerItems } from './planner-items';

// Todo: Replace rest of API calls with properly-typed versions.
export interface IAccountTransactions {
  attributes: { transactions: [ITransaction] };
  id: String;
  links: { self: null };
  type: String;
}

export interface ITransaction {
  amount: number;
  description: String;
  entryDate: Date;
}

export const getAcademicStatus = () =>
  axios.get(`/api/student/academic-status`).then(res => res.data);

export const getAccountTransactions = (): Promise<IAccountTransactions> =>
  axios.get('/api/student/account-transactions').then(res => res.data);

export const getAccountHolds = () => axios.get('/api/student/holds').then(res => res.data);

export { getGrades, getCourseSchedule, getAccountBalance, getPlannerItems };
