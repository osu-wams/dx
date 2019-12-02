import React from 'react';
import { waitForElement, fireEvent } from '@testing-library/react';
import { render, mockAppContext, authUser } from '../../util/test-utils';
import mockPlannerItems from '../../api/student/__mocks__/plannerItems.data';
import PlannerItems from '../PlannerItems';
import { mockGAEvent } from '../../setupTests';

const mockUsePlannerItems = jest.fn();
const mockNoData = { data: [], loading: false, error: false };

jest.mock('../../api/student/planner-items', () => ({
  usePlannerItems: () => mockUsePlannerItems()
}));

describe('<PlannerItems />', () => {
  it('should have a "Week 5 Lab Discussion" assignment on our mock data', async () => {
    mockUsePlannerItems.mockReturnValue(mockPlannerItems);
    const { findByText } = render(<PlannerItems />);
    await waitForElement(() => findByText('Week 5 Lab Discussion'));
  });

  it('should track analytics when footer link and assignment is clicked', async () => {
    mockUsePlannerItems.mockReturnValue(mockPlannerItems);
    const { getByText, findByText } = render(<PlannerItems />);

    // Planner Item
    await waitForElement(() => findByText('Week 5 Lab Discussion'));

    const PlannerItem = getByText('Week 5 Lab Discussion');
    await fireEvent.click(PlannerItem);
    expect(mockGAEvent).toHaveBeenCalled();

    // Footer link
    const CanvasLink = await waitForElement(() => getByText('View more in Canvas'));
    await fireEvent.click(CanvasLink);
    expect(mockGAEvent).toHaveBeenCalled();
  });

  it('should find empty state if our promise returns empty', async () => {
    mockUsePlannerItems.mockReturnValue(mockNoData);
    const { findByText } = render(<PlannerItems />);
    const noAssignments = await findByText(/You have no upcoming Canvas assignments/);
    expect(noAssignments).toBeInTheDocument();
  });
});

describe('with an InfoButton in the CardFooter', () => {
  // Set mock function result before running any tests
  beforeEach(() => {
    mockUsePlannerItems.mockReturnValue(mockPlannerItems);
  });

  const validIinfoButtonId = 'canvas';

  test('does not display the button when the infoButtonData is missing it', async () => {
    const testAppContext = {
      ...mockAppContext,
      infoButtonData: [{ id: 'invalid-id', content: 'content', title: 'title' }]
    };
    const { queryByTestId, findByText } = render(<PlannerItems />, {
      appContext: testAppContext
    });
    await findByText(/You have no upcoming Canvas assignments/);

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

describe('with a user who has not opted-in Canvas', () => {
  test('hides the badge count and shows the authorization call to action', async () => {
    mockUsePlannerItems.mockReturnValue(mockPlannerItems);
    const mockUser = authUser;
    mockUser.data.isCanvasOptIn = false;
    mockUser.isCanvasOptIn = false;

    const { queryByTestId, getAllByText } = render(<PlannerItems />, { user: mockUser });

    const element = queryByTestId('icon-counter');
    expect(element).not.toBeInTheDocument();
    const authorizeElements = await waitForElement(() => getAllByText(/Authorize Canvas/));
    expect(authorizeElements.length).toBe(2);
  });
});
