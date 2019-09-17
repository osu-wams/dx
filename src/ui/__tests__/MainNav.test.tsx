import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithUserContext } from '../../util/test-utils';
import MainNav from '../MainNav';
import { mockGAEvent } from '../../setupTests';

test('Main Navigation Links to be present and tracked in Google Analytics', async () => {
  const { getByText } = renderWithUserContext(<MainNav />);

  //Profile icon click - this text is visually hidden
  const home = getByText('Home');
  const academics = getByText('Academics');
  const finances = getByText('Finances');
  const resources = getByText('Resources');
  const beta = getByText('Beta');
  fireEvent.click(home);
  fireEvent.click(academics);
  fireEvent.click(finances);
  fireEvent.click(resources);
  fireEvent.click(beta);

  expect(mockGAEvent).toHaveBeenCalledTimes(5);
});
