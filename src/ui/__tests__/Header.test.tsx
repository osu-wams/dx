import React from 'react';
import { fireEvent, waitForElement } from '@testing-library/react';
import { render } from '../../util/test-utils';
import Header from '../Header';
import Dashboard from '../../pages/Dashboard';

test('renders', () => {
  render(<Header />);
});

test('Logout Link is in the menu', async () => {
  const { getByText, getByTestId } = render(<Dashboard />);

  await (async () => {
    expect(getByTestId('dashboard-page')).toBeInTheDocument();

    fireEvent.click(getByTestId('user-btn'));

    const logoutLink = await waitForElement(() => getByText('Logout'));
    expect(logoutLink).toBeInTheDocument();
  });
});
