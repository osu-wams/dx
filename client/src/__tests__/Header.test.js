import React from 'react';
import { render } from '../componentTestUtils';
import { fireEvent, waitForElement } from 'react-testing-library';
import Header from '../components/layout/Header';
import App from '../App';

test('renders', () => {
  render(<Header />);
});
test('Masquerade Overlay opens from the user menu dropdown', async () => {
  const { getByText, getByTestId, queryByTestId } = render(<App />);

  expect(getByTestId('dashboard-page')).toBeInTheDocument();

  //Profile icon click - this text is visually hidden
  fireEvent.click(getByTestId('user-btn'));
  const maskLink = await waitForElement(() => getByText('Masquerade'));
  fireEvent.click(maskLink);

  const maskOverlay = await waitForElement(() => getByTestId('masquerade-dialog'));

  // Masquerade overlay shows up
  expect(maskOverlay).toBeInTheDocument();

  // Make sure we can close to overlay too
  const cancelBtn = getByText('Cancel');
  fireEvent.click(cancelBtn);
  expect(queryByTestId('masquerade-dialog')).toBeNull();
});
