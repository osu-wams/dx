import React from 'react';
import { render, fireEvent, waitForElement, act, getByLabelText } from '@testing-library/react';
import { renderWithUserContext } from '../../util/test-utils';
import Footer from '../Footer';

const mockGetMasqueradeUser = jest.fn();
const mockPostMasqueradeUser = jest.fn();

jest.mock('../../api/masquerade', () => ({
  getMasqueradeUser: () => mockGetMasqueradeUser(),
  postMasqueradeUser: () => mockPostMasqueradeUser()
}));

const regularUser = {
  osuId: '123',
  email: 'testo@oregonstate.edu',
  firstName: 'Testo',
  lastName: 'LastTesto',
  isAdmin: false, // not an administrator
  isCanvasOptIn: true
};

test('renders', () => {
  render(<Footer />);
});

test('Masquerade link should not be present if user is not an admin', async () => {
  const { queryByText } = renderWithUserContext(<Footer />, { user: regularUser });

  //Profile icon click - this text is visually hidden
  const maskLink = queryByText('Masquerade');

  expect(maskLink).not.toBeInTheDocument();
});

test('Masquerade link is present for administrators and they can open and close the modal', async () => {
  const { getByText, getByTestId, queryByTestId } = renderWithUserContext(<Footer />);

  //Profile icon click - this text is visually hidden
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

test('As an administrator, I can click "masquerade" and trigger the api calls', async () => {
  mockGetMasqueradeUser.mockResolvedValue(Promise.resolve({ masqueradeId: 'Testo' }));
  mockPostMasqueradeUser.mockResolvedValue(Promise.resolve({ masqueradeId: 'Testo Post' }));

  const { getByText, getByTestId } = renderWithUserContext(<Footer />);

  //Profile icon click - this text is visually hidden
  const maskLink = await waitForElement(() => getByText('Masquerade'));
  fireEvent.click(maskLink);

  const maskOverlay = await waitForElement(() => getByTestId('masquerade-dialog'));

  // Masquerade overlay shows up
  expect(maskOverlay).toBeInTheDocument();

  // Make sure we can close to overlay too
  const masqueradeSubmit = document.querySelector(`button[type='submit']`) as HTMLElement;
  const idInput = document.getElementById('osu-id') as HTMLInputElement;
  idInput.value = '111';
  fireEvent.click(masqueradeSubmit);
  expect(mockPostMasqueradeUser).toHaveBeenCalled();
});
