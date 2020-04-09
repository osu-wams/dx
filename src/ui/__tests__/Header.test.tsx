import React from 'react';
import userEvent from '@testing-library/user-event';
import {
  render,
  authUserClassification,
  mockEmployeeUser,
  authUserAudienceOverride,
} from 'src/util/test-utils';
import Header from '../Header';
import { mockGAEvent } from '../../setupTests';
import { act } from '@testing-library/react';

// required because of the overlay from Reakit
global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
});

const mockPostSettings = jest.fn(async (args) => Promise.resolve(args));
jest.mock('@osu-wams/hooks', () => {
  const original = jest.requireActual('@osu-wams/hooks');
  return {
    ...original,
    User: {
      ...original.User,
      postSettings: (args) => mockPostSettings(args),
    },
  };
});

it('has student dashboard title', () => {
  const { getByText } = render(<Header />);
  const title = getByText('Student Dashboard');
  expect(title).toBeInTheDocument();
});

it('has employee dashboard title', () => {
  const { getByText } = render(<Header />, { user: mockEmployeeUser });
  const title = getByText('Employee Dashboard');
  expect(title).toBeInTheDocument();
});

it('Employees can toggle between Student and Employee dashboards', async () => {
  mockPostSettings.mockReturnValue(Promise.resolve());
  const { findByText, getByTestId } = render(<Header />, {
    user: mockEmployeeUser,
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
  act(() => {
    userEvent.click(logoutLink);

    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });
});

it('User Button and profile link are in the menu and tracked via GA', async () => {
  const { findByText, getByTestId } = render(<Header />);

  const userLink = getByTestId('user-btn');
  userEvent.click(userLink);

  const profileLink = await findByText('Profile', { selector: 'a' });
  act(() => {
    userEvent.click(profileLink);
    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });
});

it('Help button and help link are in the menu and tracked via GA', async () => {
  const { findByText, getByTestId } = render(<Header />);

  const userLink = getByTestId('help-btn');
  userEvent.click(userLink);

  const helpLink = await findByText('Get Help', { selector: 'a' });
  const feedbackLink = await findByText('Give feedback', { selector: 'a' });

  expect(feedbackLink).toBeInTheDocument();

  act(() => {
    userEvent.click(helpLink);

    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });
});

describe('Student mobile menu interactions', () => {
  it('Student Dashboard title only visible in when menu is expanded', async () => {
    const { queryByText, findByText } = render(<Header />);

    const title = 'Student Dashboard';
    const studentDashboard = queryByText(title);
    expect(studentDashboard).not.toBeVisible();

    const menu = await findByText('Menu');
    userEvent.click(menu);

    const studentDashboardMenu = await findByText(title, { selector: 'h2' });
    expect(studentDashboardMenu).toBeVisible();

    expect(mockGAEvent).toHaveBeenCalledTimes(1);
  });

  it('Clicking "menu" opens and clicking the close dismisses the modal', async () => {
    const { findByText } = render(<Header />);

    const menu = await findByText('Menu');
    userEvent.click(menu);

    const close = await findByText(/close/i);
    userEvent.click(close);

    const studentDashboard = await findByText('Student Dashboard');
    expect(studentDashboard).not.toBeVisible();

    expect(mockGAEvent).toHaveBeenCalledTimes(1);
  });

  it('Clicking main link inside the modal dismisses the modal', async () => {
    const { findByText } = render(<Header />);

    const menu = await findByText('Menu');
    userEvent.click(menu);

    const overview = await findByText(/overview/i, { selector: '[role="dialog"] a' });
    userEvent.click(overview);

    const studentDashboard = await findByText('Student Dashboard');
    expect(studentDashboard).not.toBeVisible();

    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });

  it('Clicking footer link inside the modal dismisses the modal', async () => {
    const { findByText } = render(<Header />);

    const menu = await findByText('Menu');
    userEvent.click(menu);

    const beta = await findByText(/beta/i, { selector: '[role="dialog"] nav a' });
    userEvent.click(beta);
    const studentDashboard = await findByText('Student Dashboard');
    expect(studentDashboard).not.toBeVisible();

    expect(mockGAEvent).toHaveBeenCalledTimes(2);
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

  it('Help and Profile menu open and have their respective menu items', async () => {
    const { findByText, getByText } = render(<Header />);

    const helpMenu = getByText('Help');

    userEvent.click(helpMenu);
    expect(await findByText(/get help/i)).toBeInTheDocument();
    expect(await findByText(/give feedback/i)).toBeInTheDocument();

    const profileMenu = getByText(/profile/i, { selector: 'button span' });

    // When clicking to open a modal updates state, you still need the act wrapper or warnings pop up
    act(() => {
      userEvent.click(profileMenu);
    });
    expect(await findByText(/logout/i)).toBeInTheDocument();
    expect(await findByText(/profile/i, { selector: '[role="menuitem"]' })).toBeInTheDocument();

    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });
});

describe('as a logged in user', () => {
  it('renders the appropriate header logo', () => {
    const { getByTestId } = render(<Header />);
    const appHeader = getByTestId('app-header-logo');
    expect(appHeader).toBeInTheDocument();
    expect(appHeader.getAttribute('src')).toBe('osu-logo.svg');
  });
});

describe('as a Bend user', () => {
  it('renders the appropriate header logo', async () => {
    authUserClassification!.attributes!.campusCode = 'B';
    authUserAudienceOverride.campusCode = 'B';
    const { getByTestId } = render(<Header />);
    const appHeader = getByTestId('app-header-logo');
    expect(appHeader).toBeInTheDocument();
    expect(appHeader.getAttribute('src')).toBe('osu-cascades.svg');
  });
});

describe('as an Ecampus user', () => {
  it('renders the appropriate header logo', async () => {
    authUserClassification!.attributes!.campusCode = 'DSC';
    authUserAudienceOverride.campusCode = 'DSC';
    const { getByTestId } = render(<Header />);
    const appHeader = getByTestId('app-header-logo');
    expect(appHeader).toBeInTheDocument();
    expect(appHeader.getAttribute('src')).toBe('osu-ecampus.svg');
  });
});
