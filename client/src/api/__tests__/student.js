import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  getAcademicStatus,
  getAccountBalance,
  getAccountHolds,
  getAccountTransactions,
  getCourseSchedule,
  getGrades
} from '../student';
import courses from '../__mocks__/courses.data';
import grades from '../__mocks__/grades.data';
import holds from '../__mocks__/holds.data';
import accountTransactions from '../__mocks__/accountTransactions.data';
import accountBalance from '../__mocks__/accountBalance.data';

jest.unmock('../student');
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
});
