import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from 'src/util/test-utils';
import { NotificationsMenu } from '../HeaderNav/NotificationsMenu';
import { mockGAEvent } from 'src/setupTests';
import { screen } from '@testing-library/react';
import { alterMock } from 'src/util/test-utils';
import { USER_MESSAGES_API } from 'src/mocks/apis';
import { User } from '@osu-wams/hooks';

describe('With 1 SENT notifications', () => {
  beforeEach(() => {
    render(<NotificationsMenu />);
  });

  it('Finds the main notification bell button with 1 notification', async () => {
    expect(await screen.findByRole('button', { name: /1 notification/i }));
  });

  it('Notification menu opens and finds 1 clickable notification tracked via GA', async () => {
    userEvent.click(screen.getByRole('button', { name: /notifications/i }));
    expect(await screen.findByRole('heading', { name: 'Notifications (1)' })).toBeInTheDocument();

    const date = await screen.findByRole('menuitem', { name: /Jan 1st at 4 PM/i });
    expect(date).toBeInTheDocument();

    userEvent.click(date);
    expect(await screen.findByText(/content/i)).toBeInTheDocument();

    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });

  it('Help button dismiss link are in the menu and tracked via GA', async () => {
    userEvent.click(screen.getByRole('button', { name: /notifications/i }));
    expect(await screen.findByRole('heading', { name: 'Notifications (1)' })).toBeInTheDocument();

    const dismiss = await screen.findByRole('menuitem', { name: /dismiss title/i });
    expect(dismiss).toBeInTheDocument();

    // This click is not counted towards a gaEvent because the menu item fires the event "onSelect"
    userEvent.click(dismiss);

    expect(mockGAEvent).toHaveBeenCalledTimes(1);
  });

  it('Link to all notifications is present', async () => {
    userEvent.click(screen.getByRole('button', { name: /notifications/i }));
    expect(await screen.findByRole('heading', { name: 'Notifications (1)' })).toBeInTheDocument();

    const all = await screen.findByRole('menuitem', { name: /view all notifications/i });
    expect(all).toBeInTheDocument();
    userEvent.click(all);

    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });
});

describe('Without unread notifications', () => {
  beforeEach(() => {
    alterMock(USER_MESSAGES_API, User.mockUser.userReadMessage);
    render(<NotificationsMenu />);
  });

  it('Main notification bell button with 1 notification since it is read', async () => {
    expect(await screen.findByRole('button', { name: /notification/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /1 notification/i })).toBeNull();
  });

  it('No notifications present when there are only READ notifications', async () => {
    userEvent.click(screen.getByRole('button', { name: /notifications/i }));
    expect(await screen.findByRole('heading', { name: 'Notifications (0)' })).toBeInTheDocument();
    expect(await screen.findByText(/You have no new notifications/i)).toBeInTheDocument();
    expect(mockGAEvent).toHaveBeenCalledTimes(1);
  });

  it('Link to all notifications is present without notifications', async () => {
    userEvent.click(screen.getByRole('button', { name: /notifications/i }));
    expect(await screen.findByText(/You have no new notifications/i)).toBeInTheDocument();

    const all = await screen.findByRole('menuitem', { name: /view all notifications/i });
    expect(all).toBeInTheDocument();
    userEvent.click(all);

    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });
});

it('With 3 notifications, 2 unread 1 read', async () => {
  alterMock(USER_MESSAGES_API, User.mockUser.userThreeMessages);
  render(<NotificationsMenu />);

  // finds 2 indicator in menu
  const menu = await screen.findByRole('button', { name: /2 notification/i });
  expect(menu).toBeInTheDocument();

  userEvent.click(menu);
  expect(await screen.findByRole('heading', { name: 'Notifications (2)' })).toBeInTheDocument();

  // finds dismiss button
  expect(await screen.findByRole('menuitem', { name: /Dismiss Title/i })).toBeInTheDocument();

  // finds second title
  expect(
    await screen.findByRole('menuitem', { name: /Third Message Title Jan 1st at 4 PM/i })
  ).toBeInTheDocument();

  // finds dismiss button
  expect(
    await screen.findByRole('menuitem', { name: /Dismiss Third Message Title/i })
  ).toBeInTheDocument();

  // Does not find Second Message since it's READ
  expect(screen.queryByRole('menuitem', { name: /Second Message Title/i })).toBeNull();
});
