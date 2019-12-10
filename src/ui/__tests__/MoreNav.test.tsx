import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithUserContext } from '../../util/test-utils';
import MoreNav from '../MainNav/';
import { mockGAEvent } from '../../setupTests';

test('More menu has links that are tracked via Google Analytics', async () => {
  const { getByText } = renderWithUserContext(<MoreNav />);

  const resources = getByText('Resources');
  const beta = getByText('Beta');
  const support = getByText('Get Support');
  const feedback = getByText('Give Feedback');
  const myosu = getByText('Go to MyOSU');

  fireEvent.click(resources);
  fireEvent.click(beta);
  fireEvent.click(support);
  fireEvent.click(feedback);
  fireEvent.click(myosu);

  expect(mockGAEvent).toHaveBeenCalledTimes(5);
});
