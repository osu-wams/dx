import React from 'react';
import { fireEvent, waitForElement, act, getByLabelText, wait } from '@testing-library/react';
import { render, renderWithUserContext, renderWithAllContexts } from '../../util/test-utils';
import Footer from '../Footer';
import { mockGAEvent } from '../../setupTests';
import { authUser } from '../../util/test-utils';

const mockGetMasqueradeUser = jest.fn();
const mockPostMasqueradeUser = jest.fn();

jest.mock('../../api/masquerade', () => ({
  getMasqueradeUser: () => mockGetMasqueradeUser(),
  postMasqueradeUser: () => mockPostMasqueradeUser()
}));

beforeEach(() => {
  Storage.prototype.clear = jest.fn();
  mockGetMasqueradeUser.mockResolvedValue({ masqueradeId: 'Testo' });
  mockPostMasqueradeUser.mockResolvedValue({ masqueradeId: 'Testo Post' });
});

it('renders', () => {
  render(<Footer />);
});

it('Masquerade link is present for administrators and they can open and close the modal', async () => {
  const { getByText, getByTestId, queryByTestId } = renderWithAllContexts(<Footer />);

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

it('As an administrator, I can click "masquerade" and trigger the api calls', async () => {
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
  expect(Storage.prototype.clear).toHaveBeenCalled();
  expect(mockPostMasqueradeUser).toHaveBeenCalled();
});

it('Links to be present and tracked in Google Analytics', async () => {
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

it('Application deployed versions', async () => {
  const { getByText } = renderWithAllContexts(<Footer />);
  const appText = await waitForElement(() => getByText('server-test-123'));
  const serverText = await waitForElement(() => getByText('client-test-123'));
  expect(appText).toBeInTheDocument();
  expect(serverText).toBeInTheDocument();
});

describe('as a user who is not an admin', () => {
  let regularUser;
  beforeEach(() => {
    regularUser = authUser;
    regularUser.data.isAdmin = false;
  });

  it('Masquerade link should not be present if user is not an admin', async () => {
    const { queryByText } = renderWithUserContext(<Footer />, { user: regularUser });
    //Profile icon click - this text is visually hidden
    const maskLink = queryByText('Masquerade');
    expect(maskLink).not.toBeInTheDocument();
  });
});
