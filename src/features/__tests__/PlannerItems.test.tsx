import React from 'react';
import user from '@testing-library/user-event';
import { render, authUser } from 'src/util/test-utils';
import PlannerItems from '../PlannerItems';
import { mockGAEvent } from 'src/setupTests';
import { Student } from '@osu-wams/hooks';
import { infoButtonState, plannerItemState } from 'src/state';

const mockPlannerItems = Student.PlannerItems.mockPlannerItems;
const mockInitialState = jest.fn();
const mockUser = jest.fn();

describe('<PlannerItems />', () => {
  // Set mock function result before running any tests
  beforeEach(() => {
    mockInitialState.mockReturnValue([
      {
        state: plannerItemState,
        value: {
          data: mockPlannerItems.data,
          isLoading: false,
          error: null,
        },
      },
    ]);
  });
  it('should have a "Week 5 Lab Discussion" assignment on our mock data', async () => {
    const { findByText } = render(<PlannerItems />, { initialStates: mockInitialState() });
    const el = await findByText('Week 5 Lab Discussion');
    const li = el.closest('li');
    expect(li).toMatchSnapshot('with hover');
  });

  it('should have a "My Awesome Planner Note" note on our mock data', async () => {
    mockInitialState.mockReturnValue([
      {
        state: plannerItemState,
        value: {
          data: [
            {
              ...mockPlannerItems.data[0],
              context_type: undefined,
              html_url: undefined,
              plannable_date: '2020-01-01T01:01:00Z',
              plannable: { title: 'My Awesome Planner Note' },
            },
          ],
          isLoading: false,
          error: null,
        },
      },
    ]);
    const { findByText } = render(<PlannerItems />, { initialStates: mockInitialState() });

    const el = await findByText('My Awesome Planner Note');
    const li = el.closest('li');
    expect(li).toMatchSnapshot('without hover');
  });

  it('should track analytics when footer link and assignment is clicked', async () => {
    const { getByText, findByText } = render(<PlannerItems />, {
      initialStates: mockInitialState(),
    });

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
    mockInitialState.mockReturnValue([
      {
        state: plannerItemState,
        value: {
          data: [],
          isLoading: false,
          error: null,
        },
      },
    ]);

    const { findByText } = render(<PlannerItems />, {
      initialStates: mockInitialState(),
    });
    const noAssignments = await findByText(/You have no upcoming Canvas assignments/);
    expect(noAssignments).toBeInTheDocument();
  });
});

describe('with an InfoButton in the CardFooter', () => {
  it('does not display the button when the infoButtonData is missing it', async () => {
    mockInitialState.mockReturnValue([
      {
        state: plannerItemState,
        value: {
          data: [],
          isLoading: false,
          error: null,
        },
      },
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
        state: plannerItemState,
        value: {
          data: mockPlannerItems.data,
          isLoading: false,
          error: null,
        },
      },
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
    mockInitialState.mockReturnValue([
      {
        state: plannerItemState,
        value: {
          data: mockPlannerItems.data,
          isLoading: false,
          error: null,
        },
      },
    ]);
    mockUser.mockReturnValue({
      ...authUser,
      data: {
        ...authUser.data,
        isCanvasOptIn: false,
      },
      isCanvasOptIn: false,
    });

    const { queryByTestId, findAllByText } = render(<PlannerItems />, {
      user: mockUser(),
      initialStates: mockInitialState(),
    });

    const element = queryByTestId('icon-counter');
    expect(element).not.toBeInTheDocument();
    const authorizeElements = await findAllByText(/Authorize Canvas/i);
    expect(authorizeElements.length).toBe(2);
  });
});
