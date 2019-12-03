import React from 'react';
import { waitForElement } from '@testing-library/react';
import { render } from '../../util/test-utils';
import Dashboard from '../Dashboard';

it('renders', async () => {
  const { getByTestId } = render(<Dashboard />);
  expect(getByTestId('dashboard-page')).toBeInTheDocument();
});

it('should display the title Student Dashboard', async () => {
  const { getByText } = render(<Dashboard />);
  const title = await waitForElement(() => getByText('Student Dashboard'));
  const badge = await waitForElement(() => getByText('Beta'));
  expect(title).toBeInTheDocument();
  expect(badge).toBeInTheDocument();
  expect(badge.closest('a')).toHaveAttribute('href', '/beta');
});
