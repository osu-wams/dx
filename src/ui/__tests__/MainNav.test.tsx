import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithUserContext, mockEmployeeUser, render } from '../../util/test-utils';
import MainNav from '../MainNav/';
import { mockGAEvent } from '../../setupTests';

it('Main Navigation Links for students are to be present and tracked in Google Analytics', async () => {
  const { getByText } = renderWithUserContext(<MainNav />);

  const home = getByText('Home');
  const academics = getByText('Academics');
  const finances = getByText('Finances');
  const more = getByText('More');
  fireEvent.click(home);
  fireEvent.click(academics);
  fireEvent.click(finances);
  fireEvent.click(more);

  await expect(mockGAEvent).toHaveBeenCalledTimes(4);
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
  fireEvent.click(home);
  fireEvent.click(beta);
  fireEvent.click(resources);

  await expect(mockGAEvent).toHaveBeenCalledTimes(3);
});
