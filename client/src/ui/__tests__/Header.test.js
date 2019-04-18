import React from 'react';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import MockAdapter from 'axios-mock-adapter';
import { render, fireEvent, waitForElement } from 'react-testing-library';
import Header from '../Header';
import App from '../../App';

const mockAxios = new MockAdapter(axios);

mockAxios.onGet(/\/api\/masquerade/).reply(200, { masqueradeId: null });
mockAxios.onPost(/\/api\/masquerade/).reply(200, '');

test('renders', () => {
  render(<Header />);
});
test('Masquerade Overlay opens from the user menu dropdown', async () => {
  const { getByText, getByTestId, queryByTestId } = render(<App />);

  //Profile icon click - this text is visually hidden
  await act(async () => {
    expect(getByTestId('dashboard-page')).toBeInTheDocument();
    fireEvent.click(getByTestId('user-btn'));
    const maskLink = await waitForElement(() => getByText('Masquerade'));
    fireEvent.click(maskLink);

    const maskOverlay = await waitForElement(() => getByTestId('masquerade-dialog'));

    // Masquerade overlay shows up
    expect(maskOverlay).toBeInTheDocument();

    // Make sure we can close to overlay too
    const cancelBtn = getByText('Cancel');
    fireEvent.click(cancelBtn);
  });
  expect(queryByTestId('masquerade-dialog')).toBeNull();
});
