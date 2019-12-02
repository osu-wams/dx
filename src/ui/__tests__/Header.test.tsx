import React from 'react';
import { fireEvent, waitForElement } from '@testing-library/react';
import { render, authUserClassification, authUserAudienceOverride } from '../../util/test-utils';
import Header from '../Header';
import Dashboard from '../../pages/Dashboard';
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

it('renders', () => {
  render(<Header />);
});

it('has a logout link in the menu', async () => {
  const { getByText, getByTestId } = render(<Dashboard />);

  await (async () => {
    expect(getByTestId('dashboard-page')).toBeInTheDocument();

    fireEvent.click(getByTestId('user-btn'));

    const logoutLink = await waitForElement(() => getByText('Logout'));
    expect(logoutLink).toBeInTheDocument();
  });
});

it('User Button and profile link are in the menu and tracked via GA', async () => {
  const { getByText, getByTestId } = render(<Header />);

  const userLink = await waitForElement(() => getByTestId('user-btn'));
  expect(userLink).toBeInTheDocument();
  fireEvent.click(userLink);

  const profileLink = await waitForElement(() => getByText(/Profile/));
  expect(profileLink).toBeInTheDocument();
  fireEvent.click(profileLink);

  expect(mockGAEvent).toHaveBeenCalledTimes(2);
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
