import React from 'react';
import { render, fireEvent, waitForElement, act } from '@testing-library/react';
import Header from '../Header';
import App from '../../App';

test('renders', () => {
  render(<Header />);
});

test('Logout Link is in the menu', async () => {
  const { getByText, getByTestId } = render(<App />);

  await (async () => {
    expect(getByTestId('dashboard-page')).toBeInTheDocument();

    fireEvent.click(getByTestId('user-btn'));

    const logoutLink = await waitForElement(() => getByText('Logout'));
    expect(logoutLink).toBeInTheDocument();
  });
});
