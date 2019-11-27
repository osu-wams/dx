import React from 'react';
import { render } from '../../util/test-utils';
import Profile from '../Profile';

xtest('renders', () => {
  const { getByTestId } = render(<Profile />);
  expect(getByTestId('profile-page')).toBeInTheDocument();
});
