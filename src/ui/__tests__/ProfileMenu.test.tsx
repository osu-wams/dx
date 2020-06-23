import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, mockEmployeeUser, mockStudentEmployeeUser } from 'src/util/test-utils';
import { ProfileMenu } from '../HeaderNav/ProfileMenu';
import { mockGAEvent } from 'src/setupTests';
import { act, screen } from '@testing-library/react';

const mockPostSettings = jest.fn(async (args) => Promise.resolve(args));
jest.mock('@osu-wams/hooks', () => {
  const original = jest.requireActual('@osu-wams/hooks');
  return {
    ...original,
    User: {
      ...original.User,
      postSettings: (args) => mockPostSettings(args),
    },
  };
});

it('Employees can toggle between Student and Employee dashboards', async () => {
  act(() => {
    mockPostSettings.mockReturnValue(Promise.resolve());
    render(<ProfileMenu />, {
      user: mockEmployeeUser,
    });
  });
  await act(async () => {
    userEvent.click(screen.getByRole('button', { name: /profile/i }));
  });
  const studentDashboard = await screen.findByText('Student Dashboard');
  await act(async () => {
    userEvent.click(studentDashboard);
  });
  expect(mockPostSettings).toHaveBeenCalledTimes(1);
  expect(mockPostSettings).toHaveBeenCalledWith({ primaryAffiliationOverride: 'student' });
});

it('has a logout link in the menu', async () => {
  render(<ProfileMenu />);

  userEvent.click(screen.getByRole('button', { name: /profile/i }));
  const logoutLink = await screen.findByText('Logout');
  userEvent.click(logoutLink);

  expect(mockGAEvent).toHaveBeenCalledTimes(2);
});

it('User Button and profile link are in the menu and tracked via GA', async () => {
  render(<ProfileMenu />);

  act(() => {
    userEvent.click(screen.getByRole('button', { name: /profile/i }));
  });

  const profileLink = await screen.findByText('Profile', { selector: 'a' });
  act(() => {
    userEvent.click(profileLink);
    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });
});

describe('Menu items per role', () => {
  it('Student menu items', async () => {
    render(<ProfileMenu />);

    // When clicking to open a modal updates state, you still need the act wrapper or warnings pop up
    act(() => {
      userEvent.click(screen.getByRole('button', { name: /profile/i }));
    });
    expect(await screen.findByRole('menuitem', { name: /logout/i })).toBeInTheDocument();
    expect(await screen.findByRole('menuitem', { name: /profile/i })).toBeInTheDocument();

    // Students cannot toggle to employee dashboard
    expect(screen.queryByRole('menuitem', { name: /dashboard/i })).toBeNull();

    expect(mockGAEvent).toHaveBeenCalledTimes(1);
  });

  it('Employee menu items', async () => {
    render(<ProfileMenu />, { user: mockEmployeeUser });

    // When clicking to open a modal updates state, you still need the act wrapper or warnings pop up
    act(() => {
      userEvent.click(screen.getByRole('button', { name: /profile/i }));
    });
    expect(await screen.findByRole('menuitem', { name: /logout/i })).toBeInTheDocument();
    expect(await screen.findByRole('menuitem', { name: /profile/i })).toBeInTheDocument();

    // Employees can toggle to student dashboard
    expect(screen.queryByRole('menuitem', { name: /student dashboard/i })).toBeInTheDocument();

    expect(mockGAEvent).toHaveBeenCalledTimes(1);
  });

  it('Student Employee menu items', async () => {
    render(<ProfileMenu />, { user: mockStudentEmployeeUser });

    // When clicking to open a modal updates state, you still need the act wrapper or warnings pop up
    act(() => {
      userEvent.click(screen.getByRole('button', { name: /profile/i }));
    });
    expect(await screen.findByRole('menuitem', { name: /logout/i })).toBeInTheDocument();
    expect(await screen.findByRole('menuitem', { name: /profile/i })).toBeInTheDocument();

    // Student Employees can toggle to employee dashboard
    expect(
      await screen.findByRole('menuitem', { name: /employee dashboard/i })
    ).toBeInTheDocument();

    // They should not see student dashboard toggle initially
    expect(screen.queryByRole('menuitem', { name: /student dashboard/i })).toBeNull();

    expect(mockGAEvent).toHaveBeenCalledTimes(1);
  });
});
