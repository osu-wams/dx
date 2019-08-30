import React from 'react';
import { waitForElement } from '@testing-library/react';
import { renderWithUserContext } from '../../util/test-utils';
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
    const { getByText } = renderWithUserContext(<PlannerItems />);
    await waitForElement(() => getByText('Week 5 Lab Discussion'));
  });

  it('should find "NO ASSIGNMENTS" if our promise returns empty', async () => {
    mockGetPlannerItems.mockResolvedValue(Promise.resolve([]));
    const { getByText } = renderWithUserContext(<PlannerItems />);
    const element = await waitForElement(() => getByText('NO ASSIGNMENTS'));
    expect(element).toBeInTheDocument();
  });
});
