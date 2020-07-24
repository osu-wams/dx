import React from 'react';
import user from '@testing-library/user-event';
import { render, authUser } from 'src/util/test-utils';
import PlannerItems from '../PlannerItems';
import { mockGAEvent } from 'src/setupTests';
import { Student } from '@osu-wams/hooks';
import { infoButtonState } from 'src/state/application';

const mockPlannerItems = Student.PlannerItems.mockPlannerItems;
const mockUsePlannerItems = jest.fn();
const mockNoData = { data: [], loading: false, error: false };
const mockInitialState = jest.fn();

jest.mock('@osu-wams/hooks', () => {
  return {
    // @ts-ignore spread object
    ...jest.requireActual('@osu-wams/hooks'),
    usePlannerItems: () => mockUsePlannerItems(),
  };
});

describe('<PlannerItems />', () => {
  it('should have a "Week 5 Lab Discussion" assignment on our mock data', async () => {
    mockUsePlannerItems.mockReturnValue(mockPlannerItems);
    const { findByText } = render(<PlannerItems />);
    await findByText('Week 5 Lab Discussion');
  });

  it('should track analytics when footer link and assignment is clicked', async () => {
    mockUsePlannerItems.mockReturnValue(mockPlannerItems);
    const { getByText, findByText } = render(<PlannerItems />);

    // Planner Item
    await findByText('Week 5 Lab Discussion');

    const PlannerItem = getByText('Week 5 Lab Discussion');
    user.click(PlannerItem);
    expect(mockGAEvent).toHaveBeenCalled();

    // Footer link
    const CanvasLink = await findByText('View more in Canvas');
    user.click(CanvasLink);
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
    mockUsePlannerItems.mockReturnValueOnce(mockPlannerItems);
  });

  it('does not display the button when the infoButtonData is missing it', async () => {
    mockInitialState.mockReturnValue([
      {
        state: infoButtonState,
        value: [{ content: '...', id: 'some-other-id', title: '...' }],
      },
    ]);
    const { queryByTestId, findByText } = render(<PlannerItems />, {
      initialStates: mockInitialState(),
    });
    const noAssignments = await findByText(/You have no upcoming Canvas assignments/);
    expect(noAssignments).toBeInTheDocument();

    const element = queryByTestId('canvas');
    expect(element).not.toBeInTheDocument();
  });

  it('displays the button when the infoButtonData is included', async () => {
    mockInitialState.mockReturnValue([
      {
        state: infoButtonState,
        value: [{ content: 'Info Button Content', id: 'canvas', title: 'Info Button Title' }],
      },
    ]);
    const { findByTestId } = render(<PlannerItems />, { initialStates: mockInitialState() });

    const element = await findByTestId('canvas');
    expect(element).toBeInTheDocument();
  });
});

describe('with a user who has not opted-in Canvas', () => {
  it('hides the badge count and shows the authorization call to action', async () => {
    mockUsePlannerItems.mockReturnValueOnce(mockPlannerItems);
    const mockUser = authUser;
    mockUser.data.isCanvasOptIn = false;
    mockUser.isCanvasOptIn = false;

    const { queryByTestId, findAllByText } = render(<PlannerItems />, { user: mockUser });

    const element = queryByTestId('icon-counter');
    expect(element).not.toBeInTheDocument();
    const authorizeElements = await findAllByText(/Authorize Canvas/i);
    expect(authorizeElements.length).toBe(2);
  });
});
