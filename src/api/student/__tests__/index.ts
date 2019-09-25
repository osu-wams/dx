import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  getPlannerItems
} from '..';
import plannerItems from '../__mocks__/plannerItems.data';

jest.unmock('..');
const mockAxios = new MockAdapter(axios);

describe('Student API', () => {
  it('should get the planner items for the current user', async () => {
    mockAxios.onGet('/api/student/planner-items').replyOnce(200, plannerItems);
    const res = await getPlannerItems();
    expect(res).toEqual(plannerItems);
  });
});
