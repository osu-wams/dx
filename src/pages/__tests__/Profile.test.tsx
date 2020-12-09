import React from 'react';
import { render, mockAdminUser } from 'src/util/test-utils';
import { screen } from '@testing-library/react';
import Profile from '../Profile';

it('Regular user cannot see the Admin Settings card', async () => {
  render(<Profile />);
  expect(screen.getByTestId('profile-page')).toBeInTheDocument();
  expect(screen.queryByText(/Admin Settings/i)).not.toBeInTheDocument();
});

it('Admin user can see the Admin Settings card', async () => {
  render(<Profile />, { user: mockAdminUser });
  expect(await screen.findByText(/Admin Settings/i)).toBeInTheDocument();
});
