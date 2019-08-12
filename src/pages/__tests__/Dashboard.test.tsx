import React from 'react';
import { renderWithUserContext } from '../../util/test-utils';
import Dashboard from '../Dashboard';

test('renders', () => {
  const { getByTestId } = renderWithUserContext(<Dashboard />);
  expect(getByTestId('dashboard-page')).toBeInTheDocument();
});
