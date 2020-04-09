import React from 'react';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithUserContext, renderWithAllContexts } from 'src/util/test-utils';
import Footer from '../Footer';
import { mockGAEvent } from '../../setupTests';
import { authUser } from 'src/util/test-utils';

const mockGetMasqueradeUser = jest.fn();
const mockPostMasqueradeUser = jest.fn();

jest.mock('@osu-wams/hooks', () => {
  return {
    ...jest.requireActual('@osu-wams/hooks'),
    Masquerade: {
      getMasqueradeUser: () => mockGetMasqueradeUser(),
      postMasqueradeUser: () => mockPostMasqueradeUser(),
    },
  };
});

beforeEach(() => {
  Storage.prototype.clear = jest.fn();
  mockGetMasqueradeUser.mockResolvedValue({ masqueradeId: 'Testo' });
  mockPostMasqueradeUser.mockResolvedValue({ masqueradeId: 'Testo Post' });
});

it('Masquerade link is present for administrators and they can open and close the modal', async () => {
  const { findByText, findByTestId, queryByTestId } = renderWithAllContexts(<Footer />);

  //Profile icon click - this text is visually hidden
  const maskLink = await findByText('Masquerade');
  userEvent.click(maskLink);
  const maskOverlay = await findByTestId('masquerade-dialog');

  // Masquerade overlay shows up
  await waitFor(() => expect(maskOverlay).toBeInTheDocument());

  // Make sure we can close to overlay too
  const cancelBtn = await findByText('Cancel');
  userEvent.click(cancelBtn);

  await waitFor(() => expect(queryByTestId('masquerade-dialog')).toBeNull());
});

it('As an administrator, I can click "masquerade" and trigger the api calls', async () => {
  const { findByText, findByTestId } = renderWithUserContext(<Footer />);
  //Profile icon click - this text is visually hidden
  const maskLink = await findByText('Masquerade');
  userEvent.click(maskLink);

  const maskOverlay = await findByTestId('masquerade-dialog');
  // Masquerade overlay shows up
  expect(maskOverlay).toBeInTheDocument();

  // Make sure we can close to overlay too
  const masqueradeSubmit = document.querySelector(`button[type='submit']`) as HTMLElement;
  const idInput = document.getElementById('osu-id') as HTMLInputElement;
  await userEvent.type(idInput, '111');
  userEvent.click(masqueradeSubmit);

  expect(Storage.prototype.clear).toHaveBeenCalledTimes(1);
  await waitFor(() => expect(mockPostMasqueradeUser).toHaveBeenCalledTimes(1));
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

  userEvent.click(supportLink);
  userEvent.click(feedbackLink);
  userEvent.click(copyrightLink);
  userEvent.click(disclaimerLink);
  userEvent.click(accessibilityLink);
  userEvent.click(maskLink);

  await waitFor(() => expect(mockGAEvent).toHaveBeenCalledTimes(6));
});

it('Application deployed versions', async () => {
  const { getByText } = renderWithAllContexts(<Footer />);

  const appText = getByText('server-test-123');
  const serverText = getByText('client-test-123');
  expect(appText).toBeInTheDocument();
  expect(serverText).toBeInTheDocument();
});

describe('as a user who does not belong to masquerade group', () => {
  let regularUser;
  beforeEach(() => {
    regularUser = authUser;
    regularUser.data.groups = [];
  });

  it('Masquerade link should not be present if user is not an admin', async () => {
    const { queryByText } = renderWithUserContext(<Footer />, { user: regularUser });

    const maskLink = queryByText('Masquerade');
    expect(maskLink).not.toBeInTheDocument();
  });
});
