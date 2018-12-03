import React from 'react';
import { render } from '../componentTestUtils';
import Dashboard from '../components/pages/Dashboard';

test('renders', () => {
  const { getByTestId } = render(<Dashboard />);
  expect(getByTestId('dashboard-page')).toBeInTheDocument();
});
