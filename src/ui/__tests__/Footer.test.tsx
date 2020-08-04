import React from 'react';
import { waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithUserContext, render, renderWithAllContexts } from 'src/util/test-utils';
import Footer from '../Footer';
import { mockGAEvent } from 'src/setupTests';
import {
  mockAdminUser,
  authUser,
  mockEmployeeUser,
  mockStudentEmployeeUser,
  mockGradUser,
} from 'src/util/test-utils';

const mockGetMasqueradeUser = jest.fn();
const mockPostMasqueradeUser = jest.fn();
const mockUseAppVersions = jest.fn();
const mockUser = jest.fn();

jest.mock('@osu-wams/hooks', () => {
  return {
    // @ts-ignore spread object
    ...jest.requireActual('@osu-wams/hooks'),
    useAppVersions: () => mockUseAppVersions(),
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
  mockUser.mockReturnValue(authUser);
  mockUseAppVersions.mockReturnValue({
    data: {
      serverVersion: 'server-test-123',
      appVersion: 'client-test-123',
    },
  });
});

it('Masquerade link is present for administrators and they can open and close the modal', async () => {
  render(<Footer />, { user: mockAdminUser });

  //Profile icon click - this text is visually hidden
  const maskLink = await screen.findByText('Masquerade');
  userEvent.click(maskLink);
  const maskOverlay = await screen.findByTestId('masquerade-dialog');

  // Masquerade overlay shows up
  await waitFor(() => expect(maskOverlay).toBeInTheDocument());

  // Make sure we can close to overlay too
  const cancelBtn = await screen.findByText('Cancel');
  userEvent.click(cancelBtn);

  await waitFor(() => expect(screen.queryByTestId('masquerade-dialog')).toBeNull());
});

it('As an administrator, I can click "masquerade" and trigger the api calls', async () => {
  const { findByText, findByTestId } = renderWithUserContext(<Footer />, { user: mockAdminUser });
  //Profile icon click - this text is visually hidden
  const maskLink = await findByText('Masquerade');
  userEvent.click(maskLink);

  const maskOverlay = await findByTestId('masquerade-dialog');
  // Masquerade overlay shows up
  expect(maskOverlay).toBeInTheDocument();

  // Make sure we can close to overlay too
  const masqueradeSubmit = document.querySelector(`button[type='submit']`) as HTMLElement;
  const idInput = document.getElementById('osu-id') as HTMLInputElement;
  userEvent.type(idInput, '111');
  userEvent.click(masqueradeSubmit);

  expect(Storage.prototype.clear).toHaveBeenCalledTimes(1);
  await waitFor(() => expect(mockPostMasqueradeUser).toHaveBeenCalledTimes(1));
});

it('Links to be present and tracked in Google Analytics', async () => {
  const { getByText } = renderWithUserContext(<Footer />, { user: mockUser() });
  //Profile icon click - this text is visually hidden
  const supportLink = getByText('Get Support');
  const feedbackLink = getByText('Give Feedback');
  const copyrightLink = getByText('Copyright');
  const disclaimerLink = getByText('Disclaimer');
  const accessibilityLink = getByText(/Accessibility Information/);

  userEvent.click(supportLink);
  userEvent.click(feedbackLink);
  userEvent.click(copyrightLink);
  userEvent.click(disclaimerLink);
  userEvent.click(accessibilityLink);

  await waitFor(() => expect(mockGAEvent).toHaveBeenCalledTimes(5));
});

it('Application deployed versions', async () => {
  mockUseAppVersions.mockReturnValue({
    data: {
      serverVersion: 'server-test-123',
      appVersion: 'client-test-123',
    },
  });
  const { getByText } = renderWithAllContexts(<Footer />, { user: mockAdminUser });

  const appText = getByText('server-test-123');
  const serverText = getByText('client-test-123');
  expect(appText).toBeInTheDocument();
  expect(serverText).toBeInTheDocument();
});

describe('Masquerade', () => {
  [authUser, mockStudentEmployeeUser, mockEmployeeUser, mockGradUser].forEach((user) => {
    it('Masquerade link should not be present for ' + user, async () => {
      const { queryByText } = renderWithUserContext(<Footer />, { user: user });

      const maskLink = queryByText('Masquerade');
      expect(maskLink).not.toBeInTheDocument();
    });
  });

  it('Masquerade link should be present for administrators with masquerade access', async () => {
    render(<Footer />, { user: mockAdminUser });

    const maskLink = screen.getByText('Masquerade');
    expect(maskLink).toBeInTheDocument();
    userEvent.click(maskLink);
    await waitFor(() => expect(mockGAEvent).toHaveBeenCalledTimes(1));
  });
});
