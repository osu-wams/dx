/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithUserContext, renderWithAllContexts as render } from 'src/util/test-utils';
import Footer from '../Footer';
import { mockGAEvent } from 'src/setupTests';
import {
  mockAdminUser,
  authUser,
  mockEmployeeUser,
  mockStudentEmployeeUser,
  mockGradUser,
} from 'src/util/test-utils';

const mockUseMasqueradeUser = jest.fn();
const mockPostMasqueradeUser = jest.fn();

const mockUser = jest.fn();

jest.mock('@osu-wams/hooks', () => {
  return {
    // @ts-ignore spread object
    ...jest.requireActual('@osu-wams/hooks'),

    Masquerade: {
      useMasqueradeUser: () => mockUseMasqueradeUser(),
      postMasqueradeUser: () => mockPostMasqueradeUser(),
    },
  };
});

beforeEach(() => {
  Storage.prototype.clear = jest.fn();
  mockUseMasqueradeUser.mockReturnValue({ data: { masqueradeId: 'Testo' }, isLoading: false });
  mockPostMasqueradeUser.mockResolvedValue({ masqueradeId: 'Testo Post' });
  mockUser.mockReturnValue(authUser);
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

  await waitFor(() => expect(screen.queryByTestId('masquerade-dialog')).not.toBeInTheDocument());
});

it('As an administrator, I can click "masquerade" and trigger the api calls', async () => {
  renderWithUserContext(<Footer />, { user: mockAdminUser });
  //Profile icon click - this text is visually hidden
  const maskLink = await screen.findByText('Masquerade');
  userEvent.click(maskLink);

  const maskOverlay = await screen.findByTestId('masquerade-dialog');
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
  renderWithUserContext(<Footer />, { user: mockUser() });
  //Profile icon click - this text is visually hidden
  const supportLink = screen.getByText('Get Support');
  const feedbackLink = screen.getByText('Give Feedback');
  const copyrightLink = screen.getByText('Copyright');
  const disclaimerLink = screen.getByText('Disclaimer');
  const accessibilityLink = screen.getByText(/Accessibility Information/);

  userEvent.click(supportLink);
  userEvent.click(feedbackLink);
  userEvent.click(copyrightLink);
  userEvent.click(disclaimerLink);
  userEvent.click(accessibilityLink);

  await waitFor(() => expect(mockGAEvent).toHaveBeenCalledTimes(5));
});

it('Application deployed versions', async () => {
  render(<Footer />, { user: mockAdminUser });
  expect(await screen.findByText('server-test-123')).toBeInTheDocument();
  expect(await screen.findByText('client-test-123')).toBeInTheDocument();
});

describe('Masquerade', () => {
  [authUser, mockStudentEmployeeUser, mockEmployeeUser, mockGradUser].forEach((user) => {
    it('Masquerade link should not be present for ' + user, async () => {
      renderWithUserContext(<Footer />, { user: user });

      const maskLink = screen.queryByText('Masquerade');
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
