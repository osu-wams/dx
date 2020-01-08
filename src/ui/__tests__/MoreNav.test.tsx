import React from 'react';
import userEvent from '@testing-library/user-event';
import { wait } from '@testing-library/react';
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

  userEvent.click(resources);
  userEvent.click(beta);
  userEvent.click(support);
  userEvent.click(feedback);
  userEvent.click(myosu);

  await wait(() => expect(mockGAEvent).toHaveBeenCalledTimes(5));
});
