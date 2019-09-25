import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  getAccountHolds,
  getPlannerItems
} from '..';
import courses from '../__mocks__/courses.data';
import grades from '../__mocks__/grades.data';
import holds from '../__mocks__/holds.data';
import gpa from '../__mocks__/gpa.data';
import plannerItems from '../__mocks__/plannerItems.data';

jest.unmock('..');
const mockAxios = new MockAdapter(axios);

describe('Student API', () => {

  // Account Holds
  it('should get the account hold(s) and details for the current user', async () => {
    mockAxios.onGet('/api/student/holds').replyOnce(200, holds);
    const res = await getAccountHolds();
    expect(res).toEqual(holds);
  });

  it('should get the planner items for the current user', async () => {
    mockAxios.onGet('/api/student/planner-items').replyOnce(200, plannerItems);
    const res = await getPlannerItems();
    expect(res).toEqual(plannerItems);
  });
});
