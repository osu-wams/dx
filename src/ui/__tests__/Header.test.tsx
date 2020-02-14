import React from 'react';
import { waitForElement, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  render,
  authUserClassification,
  mockEmployeeUser,
  authUserAudienceOverride
} from '../../util/test-utils';
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

const mockPostSettings = jest.fn(async args => Promise.resolve(args));
jest.mock('@osu-wams/hooks', () => {
  const original = jest.requireActual('@osu-wams/hooks');
  return {
    ...original,
    User: {
      ...original.User,
      postSettings: args => mockPostSettings(args)
    }
  };
});

it('has student dashboard title', async () => {
  const { findByText } = render(<Header />);
  const title = await findByText('Student Dashboard');
  expect(title).toBeInTheDocument();
});

it('has employee dashboard title', async () => {
  const { findByText } = render(<Header />, { user: mockEmployeeUser });
  const title = await findByText('Employee Dashboard');
  expect(title).toBeInTheDocument();
});

it('Employees can toggle between Student and Employee dashboards', async () => {
  mockPostSettings.mockReturnValue(Promise.resolve());
  const { findByText, getByTestId } = render(<Header />, {
    user: mockEmployeeUser
  });

  userEvent.click(getByTestId('user-btn'));
  const studentDashboard = await findByText('Student Dashboard');

  userEvent.click(studentDashboard);
  expect(mockPostSettings).toHaveBeenCalledTimes(1);

  expect(mockPostSettings).toHaveBeenCalledWith({ primaryAffiliationOverride: 'student' });
});

it('has a logout link in the menu', async () => {
  const { findByText, getByTestId } = render(<Header />);

  userEvent.click(getByTestId('user-btn'));
  const logoutLink = await findByText('Logout');
  userEvent.click(logoutLink);

  await wait(() => expect(mockGAEvent).toHaveBeenCalledTimes(2));
});

it('User Button and profile link are in the menu and tracked via GA', async () => {
  const { getByText, getByTestId } = render(<Header />);

  const userLink = getByTestId('user-btn');
  userEvent.click(userLink);

  const profileLink = await waitForElement(() => getByText('Profile', { selector: 'a' }));
  userEvent.click(profileLink);

  await wait(() => expect(mockGAEvent).toHaveBeenCalledTimes(2));
});

it('Help button and help link are in the menu and tracked via GA', async () => {
  const { findByText, getByTestId } = render(<Header />);

  const userLink = getByTestId('help-btn');
  userEvent.click(userLink);

  const helpLink = await findByText('Get Help', { selector: 'a' });
  const feedbackLink = await findByText('Give feedback', { selector: 'a' });

  expect(feedbackLink).toBeInTheDocument();

  userEvent.click(helpLink);

  await wait(() => expect(mockGAEvent).toHaveBeenCalledTimes(2));
});

describe('Student mobile menu interactions', () => {
  it('Student Dashboard title only visible in when menu is expanded', async () => {
    const { queryByText, findByText } = render(<Header />);

    const title = 'Student Dashboard';
    const studentDashboard = queryByText(title);
    expect(studentDashboard).not.toBeVisible();

    const menu = await findByText('Menu');
    userEvent.click(menu);

    const studentDashboardMenu = queryByText(title, { selector: 'h2' });
    expect(studentDashboardMenu).toBeVisible();

    await wait(() => expect(mockGAEvent).toHaveBeenCalledTimes(1));
  });

  it('Clicking "menu" opens and clicking the close dismisses the modal', async () => {
    const { queryByText, findByText } = render(<Header />);

    const menu = await findByText('Menu');
    userEvent.click(menu);

    const close = await findByText(/close/i);
    userEvent.click(close);

    const studentDashboard = queryByText('Student Dashboard');
    expect(studentDashboard).not.toBeVisible();

    await wait(() => expect(mockGAEvent).toHaveBeenCalledTimes(1));
  });

  it('Clicking main link inside the modal dismisses the modal', async () => {
    const { queryByText, findByText } = render(<Header />);

    const menu = await findByText('Menu');
    userEvent.click(menu);

    const overview = await findByText(/overview/i, { selector: '[role="dialog"] a' });
    userEvent.click(overview);

    const studentDashboard = queryByText('Student Dashboard');
    expect(studentDashboard).not.toBeVisible();

    await wait(() => expect(mockGAEvent).toHaveBeenCalledTimes(2));
  });

  it('Clicking footer link inside the modal dismisses the modal', async () => {
    const { queryByText, findByText } = render(<Header />);

    const menu = await findByText('Menu');
    userEvent.click(menu);

    const beta = await findByText(/beta/i, { selector: '[role="dialog"] nav a' });
    userEvent.click(beta);
    const studentDashboard = queryByText('Student Dashboard');
    expect(studentDashboard).not.toBeVisible();

    await wait(() => expect(mockGAEvent).toHaveBeenCalledTimes(2));
  });

  it('Cannot find mobile menu in desktop version, all links visible immediately', async () => {
    const { queryByText, findByText } = render(<Header />, { isDesktop: true });

    const menu = queryByText('Menu');
    expect(menu).toBeNull();

    expect(await findByText(/beta/i, { selector: 'nav a' })).toBeInTheDocument();
    expect(await findByText(/overview/i, { selector: 'nav a' })).toBeInTheDocument();
    expect(await findByText(/academics/i, { selector: 'nav a' })).toBeInTheDocument();
    expect(await findByText(/finances/i, { selector: 'nav a' })).toBeInTheDocument();
    expect(await findByText(/resources/i, { selector: 'nav a' })).toBeInTheDocument();
  });

  it('Help and Profile menu open and close and have their respective menu items', async () => {
    const { queryByText, findByText } = render(<Header />);

    const helpMenu = await findByText(/help/i);

    userEvent.click(helpMenu);
    expect(await findByText(/get help/i)).toBeInTheDocument();
    expect(await findByText(/give feedback/i)).toBeInTheDocument();

    userEvent.click(helpMenu);
    expect(queryByText(/get help/i)).toBeNull();

    const profileMenu = await findByText(/profile/i);

    userEvent.click(profileMenu);
    expect(await findByText(/logout/i)).toBeInTheDocument();
    expect(await findByText(/profile/i, { selector: '[role="menuitem"]' })).toBeInTheDocument();

    userEvent.click(profileMenu);
    expect(queryByText(/logout/i)).toBeNull();

    await wait(() => expect(mockGAEvent).toHaveBeenCalledTimes(4));
  });
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
