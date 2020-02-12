import React from 'react';
import { wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockEmployeeUser, render } from '../../util/test-utils';
import MainNav from '../MainNav/';
import { mockGAEvent } from '../../setupTests';

it('Main Navigation Links for students are to be present and tracked in Google Analytics', async () => {
  const { getByText } = render(<MainNav />);

  const home = getByText('Home');
  const academics = getByText('Academics');
  const finances = getByText('Finances');
  const more = getByText('More');
  userEvent.click(home);
  userEvent.click(academics);
  userEvent.click(finances);
  userEvent.click(more);

  await wait(() => expect(mockGAEvent).toHaveBeenCalledTimes(4));
});

it('Main Navigation for Employee visible and tracked in Google Analytics', async () => {
  const { getByText, queryByText } = render(<MainNav />, {
    user: mockEmployeeUser
  });

  const home = getByText('Home');
  const beta = getByText('Beta');
  const resources = getByText('Resources');

  await expect(resources).toBeInTheDocument();

  // Not present in employee nav
  const more = queryByText('More');
  await expect(more).not.toBeInTheDocument();
  userEvent.click(home);
  userEvent.click(beta);
  userEvent.click(resources);

  await wait(() => expect(mockGAEvent).toHaveBeenCalledTimes(3));
});
