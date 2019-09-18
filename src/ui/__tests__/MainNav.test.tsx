import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithUserContext } from '../../util/test-utils';
import MainNav from '../MainNav';
import { mockGAEvent } from '../../setupTests';

// required because of the overlay from Reakit
global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document
  }
});

test('Main Navigation Links to be present and tracked in Google Analytics', async () => {
  const { getByText } = renderWithUserContext(<MainNav />);

  //Profile icon click - this text is visually hidden
  const home = getByText('Home');
  const academics = getByText('Academics');
  const finances = getByText('Finances');
  const more = getByText('More');
  fireEvent.click(home);
  fireEvent.click(academics);
  fireEvent.click(finances);
  fireEvent.click(more);

  expect(mockGAEvent).toHaveBeenCalledTimes(4);
});
