import React from 'react';
import { render } from '../../util/test-utils';
import Profile from '../Profile';

test('renders', () => {
  const { getByTestId } = render(<Profile />);
  expect(getByTestId('profile-page')).toBeInTheDocument();
});
