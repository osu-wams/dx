import React from 'react';
import { render } from '../componentTestUtils';
import Profile from '../components/pages/Profile';

test('renders', () => {
  const { getByTestId } = render(<Profile />);
  expect(getByTestId('profile-page')).toBeInTheDocument();
});
