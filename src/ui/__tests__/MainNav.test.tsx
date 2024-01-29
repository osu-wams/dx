import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { mockEmployeeUser, renderWithRouter as render } from 'src/util/test-utils';
import MainNav from '../MainNav/';
import { mockGAEvent } from 'src/setupTests';

it('Main Navigation for Employee visible and tracked in Google Analytics', async () => {
  render(<MainNav />, {
    user: mockEmployeeUser,
  });

  const home = screen.getByText('Overview');
  const resources = screen.getByText('Resources');

  expect(home).toBeInTheDocument();
  expect(resources).toBeInTheDocument();

  // Not present in employee nav
  expect(screen.queryByText('More')).not.toBeInTheDocument();

  userEvent.click(home);
  userEvent.click(resources);

  expect(mockGAEvent).toHaveBeenCalledTimes(2);
});
