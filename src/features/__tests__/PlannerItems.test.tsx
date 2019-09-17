import React from 'react';
import { waitForElement, fireEvent } from '@testing-library/react';
import { render } from '../../util/test-utils';
import mockPlannerItems from '../../api/student/__mocks__/plannerItems.data';
import PlannerItems from '../PlannerItems';
import { mockGAEvent } from '../../setupTests';

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

  it('should find "NO ASSIGNMENTS" if our promise returns empty', async () => {
    mockGetPlannerItems.mockResolvedValue(Promise.resolve([]));
    const { getByText } = render(<PlannerItems />);
    const element = await waitForElement(() => getByText('NO ASSIGNMENTS'));
    expect(element).toBeInTheDocument();
  });
});

describe('with an InfoButton in the CardFooter', () => {
  const validIinfoButtonId = 'canvas';

  test('does not display the button when the infoButtonData is missing it', async () => {
    const { queryByTestId } = render(<PlannerItems />, {
      appContext: {
        infoButtonData: [{ id: 'invalid-id', content: 'content', title: 'title' }]
      }
    });

    const element = queryByTestId(validIinfoButtonId);
    expect(element).not.toBeInTheDocument();
  });

  test('displays the button when the infoButtonData is included', async () => {
    const { getByTestId } = render(<PlannerItems />, {
      appContext: {
        infoButtonData: [{ id: validIinfoButtonId, content: 'content', title: 'title' }]
      }
    });

    const element = await waitForElement(() => getByTestId(validIinfoButtonId));
    expect(element).toBeInTheDocument();
  });
});
