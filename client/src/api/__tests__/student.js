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
import accountTransactions from '../__mocks__/accountTransactions.data';

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
});
