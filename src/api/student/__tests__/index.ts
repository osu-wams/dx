import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  getAcademicStatus,
  getAccountBalance,
  getAccountHolds,
  getAccountTransactions,
  getCourseSchedule,
  getGrades,
  getGpa,
  getPlannerItems
} from '..';
import courses from '../__mocks__/courses.data';
import grades from '../__mocks__/grades.data';
import holds from '../__mocks__/holds.data';
import gpa from '../__mocks__/gpa.data';
import accountTransactions from '../__mocks__/accountTransactions.data';
import accountBalance from '../__mocks__/accountBalance.data';
import academicStatus from '../__mocks__/academicStatus.data';
import plannerItems from '../__mocks__/plannerItems.data';

jest.unmock('..');
const mockAxios = new MockAdapter(axios);

describe('Student API', () => {
  // Course Schedule
  it('should get the course schedule for the current user', async () => {
    mockAxios.onGet(/\/api\/student\/class-schedule/).replyOnce(200, courses);
    const res = await getCourseSchedule();
    expect(res).toEqual(courses);
  });

  // Account Transactions
  it('should get account transactions for the current user', async () => {
    mockAxios.onGet('/api/student/account-transactions').replyOnce(200, accountTransactions);
    const res = await getAccountTransactions();
    expect(res).toEqual(accountTransactions);
  });

  // Grades
  it('should get the course schedule for the current user', async () => {
    mockAxios.onGet(/\/api\/student\/grades/).replyOnce(200, grades);
    const res = await getGrades();
    expect(res).toEqual(grades);
  });

  // Account Balance
  it('should get the account balance for the current user', async () => {
    mockAxios.onGet('/api/student/account-balance').replyOnce(200, accountBalance);
    const res = await getAccountBalance();
    expect(res).toEqual(accountBalance);
  });

  // Account Holds
  it('should get the account hold(s) and details for the current user', async () => {
    mockAxios.onGet('/api/student/holds').replyOnce(200, holds);
    const res = await getAccountHolds();
    expect(res).toEqual(holds);
  });

  // Academic Status
  it('should get the academic status for the current user', async () => {
    mockAxios.onGet(/\/api\/student\/academic-status/).replyOnce(200, academicStatus);
    const res = await getAcademicStatus();
    expect(res).toEqual(academicStatus);
  });

  it('should get the gpa for the current user', async () => {
    mockAxios.onGet('/api/student/gpa').replyOnce(200, gpa);
    const res = await getGpa();
    expect(res).toEqual(gpa);
  });

  it('should get the planner items for the current user', async () => {
    mockAxios.onGet('/api/student/planner-items').replyOnce(200, plannerItems);
    const res = await getPlannerItems();
    expect(res).toEqual(plannerItems);
  });
});
