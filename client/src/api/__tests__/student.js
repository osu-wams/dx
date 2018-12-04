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

jest.unmock('../student');
const mockAxios = new MockAdapter(axios);

describe('Student API', () => {
  it('should get academic status for the current user', async () => {
    mockAxios.onGet('/api/student/academic-status').replyOnce(200, courses);
    const res = await getAcademicStatus();
    expect(res).toEqual(courses);
  });
});
