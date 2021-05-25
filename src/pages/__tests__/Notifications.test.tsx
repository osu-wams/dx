import React from 'react';
import userEvent from '@testing-library/user-event';
import { renderWithAllContexts as render } from 'src/util/test-utils';
import Notifications from '../Notifications';
import { mockGAEvent } from 'src/setupTests';
import { screen } from '@testing-library/react';
import { State, User } from '@osu-wams/hooks';

// Mock recoi state
const mockInitialState = jest.fn();

describe('With 1 SENT notification', () => {
  beforeEach(() => {
    mockInitialState.mockReturnValue([
      {
        state: State.userMessagesState,
        value: {
          data: User.mockUser.userMessageItems.items,
          isLoading: false,
          error: null,
        },
      },
    ]);

    render(<Notifications />, { initialStates: mockInitialState() });
  });

  it('Notification menu opens and finds 1 clickable notification tracked via GA', async () => {
    expect(screen.getByRole('heading', { name: 'Notifications' })).toBeInTheDocument();

    // Finds button with status (open), title, and date received
    const noti = await screen.findByRole('button', {
      name: /opened previously: Title received Jan 1st at 4 pm/i,
    });
    expect(noti).toBeInTheDocument();

    // Finds the body
    expect(await screen.findByText(/content/i)).toBeInTheDocument();
    userEvent.click(noti);

    // Called 0 times, since GA should not fire if the message is read
    expect(mockGAEvent).toHaveBeenCalledTimes(0);
  });
});

describe('With 2 SENT and 1 READ notifications', () => {
  beforeEach(() => {
    mockInitialState.mockReturnValue([
      {
        state: State.userMessagesState,
        value: {
          data: User.mockUser.userThreeMessages.items,
          isLoading: false,
          error: null,
        },
      },
    ]);

    render(<Notifications />, { initialStates: mockInitialState() });
    // render(<Notifications />);
  });

  it('Finds all 3 messages. 2 READ 1 NEW', async () => {
    expect(screen.getByRole('heading', { name: 'Notifications' })).toBeInTheDocument();

    // Finds button with status (open), title, and date received
    const noti = await screen.findByRole('button', {
      name: /opened previously: Title received Jan 1st at 4 pm/i,
    });
    expect(noti).toBeInTheDocument();

    const noti2 = await screen.findByRole('button', {
      name: /opened previously: Second Message Title received Jan 1st at 4 pm/i,
    });
    expect(noti2).toBeInTheDocument();

    // New AKA unread
    const noti3 = await screen.findByRole('button', {
      name: /new: Third Message Title received Jan 1st at 4 pm/i,
    });
    expect(noti3).toBeInTheDocument();

    // Finds the body content of all 3 items
    expect(await screen.findAllByText(/content/i)).toHaveLength(3);
  });

  it('Tracks a clicks only for UNREAD messages', async () => {
    const noti2 = await screen.findByRole('button', {
      name: /opened previously: Second Message Title received Jan 1st at 4 pm/i,
    });
    expect(noti2).toBeInTheDocument();
    userEvent.click(noti2);

    const noti3 = await screen.findByRole('button', {
      name: /new: Third Message Title received Jan 1st at 4 pm/i,
    });
    expect(noti3).toBeInTheDocument();
    userEvent.click(noti3);

    // Only one click
    expect(mockGAEvent).toHaveBeenCalledTimes(1);
  });
});
