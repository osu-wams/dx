import React from 'react';
import { waitForElement, fireEvent } from '@testing-library/react';
import { render, mockAppContext } from '../../util/test-utils';
import mockPlannerItems from '../../api/student/__mocks__/plannerItems.data';
import PlannerItems from '../PlannerItems';
import { mockGAEvent } from '../../setupTests';

const mockUsePlannerItems = jest.fn();
const mockNoData = { data: [], loading: false, error: false };

jest.mock('../../api/student/planner-items', () => ({
  usePlannerItems: () => mockUsePlannerItems()
}));

describe('<PlannerItems />', () => {
  // Set mock function result before running any tests
  beforeAll(() => {
    mockUsePlannerItems.mockReturnValue(mockPlannerItems);
  });

  it('should have a "Week 5 Lab Discussion" assignment on our mock data', async () => {
    const { getByText } = render(<PlannerItems />);
    await waitForElement(() => getByText('Week 5 Lab Discussion'));
  });

  it('should track analytics when footer link and assignment is clicked', async () => {
    const { getByText } = render(<PlannerItems />);

    // Planner Item
    const PlannerItem = await waitForElement(() => getByText('Week 5 Lab Discussion'));
    fireEvent.click(PlannerItem);
    expect(mockGAEvent).toHaveBeenCalled();

    // Footer link
    const CanvasLink = await waitForElement(() => getByText('View all in Canvas'));
    fireEvent.click(CanvasLink);
    expect(mockGAEvent).toHaveBeenCalled();
  });

  it('should find empty state if our promise returns empty', async () => {
    mockUsePlannerItems.mockReturnValue(mockNoData);
    const { getByText } = render(<PlannerItems />);
    const element = await waitForElement(() =>
      getByText('You have no upcoming Canvas assignments')
    );
    expect(element).toBeInTheDocument();
  });
});

describe('with an InfoButton in the CardFooter', () => {
  const validIinfoButtonId = 'canvas';

  test('does not display the button when the infoButtonData is missing it', async () => {
    const testAppContext = {
      ...mockAppContext,
      infoButtonData: [{ id: 'invalid-id', content: 'content', title: 'title' }]
    };
    const { queryByTestId } = render(<PlannerItems />, { appContext: testAppContext });

    const element = queryByTestId(validIinfoButtonId);
    expect(element).not.toBeInTheDocument();
  });

  test('displays the button when the infoButtonData is included', async () => {
    const testAppContext = {
      ...mockAppContext,
      infoButtonData: [{ id: validIinfoButtonId, content: 'content', title: 'title' }]
    };
    const { getByTestId } = render(<PlannerItems />, { appContext: testAppContext });

    const element = await waitForElement(() => getByTestId(validIinfoButtonId));
    expect(element).toBeInTheDocument();
  });
});
