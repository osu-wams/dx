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
  const title = await waitForElement(() => getByText('Student Dashboard'));
  const badge = await waitForElement(() => getByText('Beta'));
  expect(title).toBeInTheDocument();
  expect(badge).toBeInTheDocument();
});
