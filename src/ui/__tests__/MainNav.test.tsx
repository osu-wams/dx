import React from 'react';
import userEvent from '@testing-library/user-event';
import { mockEmployeeUser, render } from 'src/util/test-utils';
import MainNav from '../MainNav/';
import { mockGAEvent } from 'src/setupTests';

describe('student main navigation', () => {
  it('Main Navigation Links for students are to be present and tracked in Google Analytics', async () => {
    const { getByText } = render(<MainNav />);

    const home = getByText('Overview');
    const academics = getByText('Academics');
    const finances = getByText('Finances');
    const menu = getByText('Menu');
    userEvent.click(home);
    userEvent.click(academics);
    userEvent.click(finances);
    userEvent.click(menu);

    expect(mockGAEvent).toHaveBeenCalledTimes(4);
  });

  it('Main Navigation in desktop has 2 additional links that are tracked in Google Analytics', async () => {
    const { getByText, queryByText } = render(<MainNav />, { isDesktop: true });

    const beta = getByText('Beta');
    const resources = getByText('Resources');
    const menu = queryByText('Menu');

    expect(menu).toBeNull();

    userEvent.click(beta);
    userEvent.click(resources);

    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });
});

it('Main Navigation for Employee visible and tracked in Google Analytics', async () => {
  const { getByText, queryByText } = render(<MainNav />, {
    user: mockEmployeeUser,
  });

  const home = getByText('Overview');
  const beta = getByText('Beta');
  const resources = getByText('Resources');

  await expect(resources).toBeInTheDocument();

  // Not present in employee nav
  const more = queryByText('More');
  await expect(more).not.toBeInTheDocument();
  userEvent.click(home);
  userEvent.click(beta);
  userEvent.click(resources);

  expect(mockGAEvent).toHaveBeenCalledTimes(3);
});
