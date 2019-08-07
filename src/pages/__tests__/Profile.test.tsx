import React from 'react';
import { render } from '@testing-library/react';
import Profile from '../Profile';

test('renders', () => {
  const { getByTestId } = render(<Profile />);
  expect(getByTestId('profile-page')).toBeInTheDocument();
});
