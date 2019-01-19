import React from 'react';
import { render } from '../../componentTestUtils';
import Dashboard from '../Dashboard';

test('renders', () => {
  const { getByTestId } = render(<Dashboard />);
  expect(getByTestId('dashboard-page')).toBeInTheDocument();
});
