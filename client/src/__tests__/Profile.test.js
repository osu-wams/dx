import React from 'react';
import { render } from '../componentTestUtils';
import Profile from '../components/pages/Profile';

test('renders', () => {
  const { container } = render(<Profile />);
  expect(container.firstChild).toMatchSnapshot();
});
