import React from 'react';
import { render } from 'react-testing-library';
import Profile from '../Profile';

test('renders', () => {
  const { getByTestId } = render(<Profile />);
  expect(getByTestId('profile-page')).toBeInTheDocument();
});
