import React from 'react';
import { waitForElement, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render, authUserClassification, authUserAudienceOverride } from '../../util/test-utils';
import Header from '../Header';
import { mockGAEvent } from '../../setupTests';

// required because of the overlay from Reakit
global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document
  }
});

it('has a logout link in the menu', async () => {
  const { getByText, getByTestId } = render(<Header />);

  userEvent.click(getByTestId('user-btn'));
  const logoutLink = await waitForElement(() => getByText('Logout'));

  await wait(() => expect(logoutLink).toBeInTheDocument());
});

it('User Button and profile link are in the menu and tracked via GA', async () => {
  const { getByText, getByTestId } = render(<Header />);

  const userLink = getByTestId('user-btn');
  userEvent.click(userLink);

  const profileLink = await waitForElement(() => getByText('Profile'));
  userEvent.click(profileLink);

  await wait(() => expect(mockGAEvent).toHaveBeenCalledTimes(2));
});

describe('as a logged in user', () => {
  it('renders the appropriate header logo', async () => {
    const { getByTestId } = render(<Header />);
    const appHeader = await waitForElement(() => getByTestId('app-header-logo'));
    expect(appHeader).toBeInTheDocument();
    expect(appHeader.getAttribute('src')).toBe('osu-logo.svg');
  });
});

describe('as a Bend user', () => {
  it('renders the appropriate header logo', async () => {
    authUserClassification!.attributes!.campusCode = 'B';
    authUserAudienceOverride.campusCode = 'B';
    const { getByTestId } = render(<Header />);
    const appHeader = await waitForElement(() => getByTestId('app-header-logo'));
    expect(appHeader).toBeInTheDocument();
    expect(appHeader.getAttribute('src')).toBe('osu-cascades.svg');
  });
});

describe('as an Ecampus user', () => {
  it('renders the appropriate header logo', async () => {
    authUserClassification!.attributes!.campusCode = 'DSC';
    authUserAudienceOverride.campusCode = 'DSC';
    const { getByTestId } = render(<Header />);
    const appHeader = await waitForElement(() => getByTestId('app-header-logo'));
    expect(appHeader).toBeInTheDocument();
    expect(appHeader.getAttribute('src')).toBe('osu-ecampus.svg');
  });
});
