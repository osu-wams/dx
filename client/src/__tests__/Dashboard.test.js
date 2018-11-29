import React from 'react';
import { render } from '../componentTestUtils';
import Dashboard from '../components/pages/Dashboard';

test('renders', () => {
  const { container } = render(<Dashboard />);
  expect(container.firstChild).toMatchSnapshot();
});
