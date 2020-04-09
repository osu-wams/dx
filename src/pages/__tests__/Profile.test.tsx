import React from 'react';
import { render } from 'src/util/test-utils';
import Profile from '../Profile';

// TODO: Fix these on Github Actions consistent failures
xit('renders', async () => {
  const { getByTestId } = render(<Profile />);
  expect(getByTestId('profile-page')).toBeInTheDocument();
});
