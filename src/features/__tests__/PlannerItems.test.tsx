import React from 'react';
import { waitForElement } from '@testing-library/react';
import { render } from '../../util/test-utils';
import mockPlannerItems from '../../api/student/__mocks__/plannerItems.data';
import PlannerItems from '../PlannerItems';

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
