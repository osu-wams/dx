import React from 'react';
import { waitForElement } from '@testing-library/react';
import { render, renderWithUserContext } from '../../util/test-utils';
import Dashboard from '../Dashboard';

test('renders', () => {
  const { getByTestId } = renderWithUserContext(<Dashboard />);
  expect(getByTestId('dashboard-page')).toBeInTheDocument();
});

test('should display the title Student Dashboard', async () => {
  const { getByText } = render(<Dashboard />);
  await waitForElement(() => getByText('Student Dashboard'));
});

