import React from 'react';
import { waitForElement } from '@testing-library/react';
import { renderWithUserContext, renderWithAllContexts } from '../../util/test-utils';
import Dashboard from '../Dashboard';

test('renders', () => {
  const { getByTestId } = renderWithUserContext(<Dashboard />);
  expect(getByTestId('dashboard-page')).toBeInTheDocument();
});

test('should display the title Student Dashboard', async () => {
  const { getByText } = renderWithAllContexts(<Dashboard />);
  const title = await waitForElement(() => getByText('Student Dashboard'));
  const badge = await waitForElement(() => getByText('Beta'));
  expect(title).toBeInTheDocument();
  expect(badge).toBeInTheDocument();
  expect(badge.closest('a')).toHaveAttribute('href', '/beta');
});
