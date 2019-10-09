import React from 'react';
import { render, fireEvent, waitForElement, act, getByLabelText } from '@testing-library/react';
import { renderWithUserContext, renderWithAllContexts } from '../../util/test-utils';
import Footer from '../Footer';
import { mockGAEvent } from '../../setupTests';

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

test('Links to be present and tracked in Google Analytics', async () => {
  const { getByText } = renderWithUserContext(<Footer />);

  //Profile icon click - this text is visually hidden
  const supportLink = getByText('Get Support');
  const feedbackLink = getByText('Give Feedback');
  const copyrightLink = getByText('Copyright');
  const disclaimerLink = getByText('Disclaimer');
  const maskLink = getByText('Masquerade');
  const accessibilityLink = getByText(/Accessibility Information/);
  fireEvent.click(supportLink);
  fireEvent.click(feedbackLink);
  fireEvent.click(copyrightLink);
  fireEvent.click(disclaimerLink);
  fireEvent.click(accessibilityLink);
  fireEvent.click(maskLink);

  expect(mockGAEvent).toHaveBeenCalledTimes(9);
});

test('Application deployed versions', async () => {
  const { getByText } = renderWithAllContexts(<Footer />);

  const appText = getByText('server-test-123');
  const serverText = getByText('client-test-123');

  expect(appText).toBeInTheDocument();
  expect(serverText).toBeInTheDocument();
});
