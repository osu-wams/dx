import React from 'react';
import { render as rtlRender, waitForElement } from '@testing-library/react';
import mockPlannerItems from '../../api/student/__mocks__/plannerItems.data';
import PlannerItems from '../PlannerItems';

import { UserContext } from '../../App';

const auth = {
  osuId: '123',
  email: 'testo@oregonstate.edu',
  firstName: 'Testo',
  lastName: 'LastTesto',
  isAdmin: true,
  isCanvasOptIn: true
};

function render(ui, { user = auth, ...options } = {}) {
  function Wrapper(props) {
    return <UserContext.Provider value={user} {...props} />;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

const mockGetPlannerItems = jest.fn();

jest.mock('../../api/student/planner-items', () => ({
  getPlannerItems: () => mockGetPlannerItems()
}));

describe('<PlannerItems />', () => {
  // Set mock function result before running any tests
  beforeAll(() => {
    mockGetPlannerItems.mockResolvedValue(Promise.resolve(mockPlannerItems));
  });

  it('should have a "Week 5 Lab Discussion" assignment on our mock data', async () => {
    const { getByText } = render(<PlannerItems />);
    await waitForElement(() => getByText('Week 5 Lab Discussion'));
  });
});
