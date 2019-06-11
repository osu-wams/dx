import React from 'react';
import { render, fireEvent, waitForElement, act } from '@testing-library/react';
import Header from '../Header';
import App from '../../App';

test('renders', () => {
  render(<Header />);
});

test('Masquerade Overlay opens from the user menu dropdown', async () => {
  const { getByText, getByTestId, queryByTestId } = render(<App />);

  //Profile icon click - this text is visually hidden
  await (async () => {
    expect(getByTestId('dashboard-page')).toBeInTheDocument();
    act(() => {
      fireEvent.click(getByTestId('user-btn'));
    });
    const maskLink = await waitForElement(() => getByText('Masquerade'));

    act(() => {
      fireEvent.click(maskLink);
    });

    const maskOverlay = await waitForElement(() => getByTestId('masquerade-dialog'));

    // Masquerade overlay shows up
    expect(maskOverlay).toBeInTheDocument();

    // Make sure we can close to overlay too
    const cancelBtn = getByText('Cancel');
    fireEvent.click(cancelBtn);
  });
  expect(queryByTestId('masquerade-dialog')).toBeNull();
});
