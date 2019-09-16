import React from 'react';
import { fireEvent, waitForElement } from '@testing-library/react';
import { render } from '../../util/test-utils';
import Header from '../Header';
import Dashboard from '../../pages/Dashboard';
import { mockGAEvent } from '../../setupTests';

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

// !TODO revise this test - passing/failing is inconsistent
xtest('User Button and profile link are in the menu and tracked via GA', async () => {
  const { getByText, getByTestId, debug } = render(<Header />);

  const userLink = await waitForElement(() => getByTestId('user-btn'));
  expect(userLink).toBeInTheDocument();
  fireEvent.click(userLink);

  const profileLink = await waitForElement(() => getByText(/Profile/));
  expect(profileLink).toBeInTheDocument();
  fireEvent.click(profileLink);

  expect(mockGAEvent).toHaveBeenCalledTimes(2);
});
