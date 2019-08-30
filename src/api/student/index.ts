import axios from 'axios';
import { getCourseSchedule } from './course-schedule';
import { getGrades } from './grades';
import { getGpa } from './gpa';
import { getAccountHolds } from './holds';
import { getAccountBalance } from './account-balance';
import { getAcademicStatus } from './academic-status';
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
  category: string;
  description: string;
  entryDate: Date;
  term: string;
  transactionType: string;
}

export const getAccountTransactions = (): Promise<IAccountTransactions> =>
  axios.get('/api/student/account-transactions').then(res => res.data);

export {
  getAccountHolds,
  getAcademicStatus,
  getGrades,
  getCourseSchedule,
  getAccountBalance,
  getPlannerItems,
  getGpa
};
