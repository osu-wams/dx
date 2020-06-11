import React from 'react';
import userEvent from '@testing-library/user-event';
import {
  render,
  authUserClassification,
  mockEmployeeUser,
  authUserAudienceOverride,
} from 'src/util/test-utils';
import Header from '../Header';
import { mockGAEvent } from 'src/setupTests';
import { act, screen } from '@testing-library/react';

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
  render(<Header />);
  const title = screen.getByText('Student Dashboard');
  expect(title).toBeInTheDocument();
});

it('has employee dashboard title', () => {
  render(<Header />, { user: mockEmployeeUser });
  const title = screen.getByText('Employee Dashboard');
  expect(title).toBeInTheDocument();
});

// This test adds a lot of ACT warnings
it('Employees can toggle between Student and Employee dashboards', async () => {
  act(() => {
    mockPostSettings.mockReturnValue(Promise.resolve());
    render(<Header />, {
      user: mockEmployeeUser,
    });
  });
  await act(async () => {
    userEvent.click(screen.getByRole('button', { name: /profile/i }));
  });
  const studentDashboard = await screen.findByText('Student Dashboard');
  await act(async () => {
    userEvent.click(studentDashboard);
  });
  expect(mockPostSettings).toHaveBeenCalledTimes(1);
  expect(mockPostSettings).toHaveBeenCalledWith({ primaryAffiliationOverride: 'student' });
});

it('has a logout link in the menu', async () => {
  render(<Header />);

  userEvent.click(screen.getByRole('button', { name: /profile/i }));
  const logoutLink = await screen.findByText('Logout');
  act(() => {
    userEvent.click(logoutLink);
  });
  expect(mockGAEvent).toHaveBeenCalledTimes(2);
});

it('User Button and profile link are in the menu and tracked via GA', async () => {
  render(<Header />);

  act(() => {
    userEvent.click(screen.getByRole('button', { name: /profile/i }));
  });

  const profileLink = await screen.findByText('Profile', { selector: 'a' });
  act(() => {
    userEvent.click(profileLink);
    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });
});

// This test adds act warnings in conjunction with other tests
describe('Help Menu', () => {
  it('Help button and Get Help link are in the menu and tracked via GA', async () => {
    render(<Header />);

    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: /help/i }));
    });

    const helpLink = await screen.findByText('Get Help', { selector: 'a' });

    expect(helpLink).toBeInTheDocument();

    await act(async () => {
      userEvent.click(helpLink);
    });
    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });

  it('Feedback link tracked via GA', async () => {
    render(<Header />);

    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: /help/i }));
    });

    const feedbackLink = await screen.findByText('Give feedback', { selector: 'a' });

    expect(feedbackLink).toBeInTheDocument();

    await act(async () => {
      userEvent.click(feedbackLink);
    });
    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });

  it('Getting Started link tracked via GA', async () => {
    render(<Header />);

    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: /help/i }));
    });

    const gettingStartedLink = await screen.findByText('Getting Started', { selector: 'a' });

    expect(gettingStartedLink).toBeInTheDocument();

    await act(async () => {
      userEvent.click(gettingStartedLink);
    });
    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });
});

describe('Student mobile menu interactions', () => {
  it('Student Dashboard title only visible in when menu is expanded', async () => {
    render(<Header />);

    const title = 'Student Dashboard';
    const studentDashboard = screen.queryByText(title);
    expect(studentDashboard).not.toBeVisible();

    const menu = screen.getByRole('button', { name: /menu/i });

    act(() => {
      userEvent.click(menu);
    });

    const studentDashboardMenu = await screen.findByText(title, { selector: 'h2' });
    expect(studentDashboardMenu).toBeVisible();

    expect(mockGAEvent).toHaveBeenCalledTimes(1);
  });

  it('Clicking "menu" opens and clicking the close dismisses the modal', async () => {
    render(<Header />);

    const menu = screen.getByText('Menu');
    act(() => {
      userEvent.click(menu);
    });

    const close = await screen.findByText(/close/i);
    act(() => {
      userEvent.click(close);
    });

    const studentDashboard = await screen.findByText('Student Dashboard');
    expect(studentDashboard).not.toBeVisible();

    expect(mockGAEvent).toHaveBeenCalledTimes(1);
  });

  it('Clicking main link inside the modal dismisses the modal', async () => {
    render(<Header />);

    const menu = screen.getByText('Menu');
    act(() => {
      userEvent.click(menu);
    });

    const overview = await screen.findByText(/overview/i, { selector: '[role="dialog"] a' });
    act(() => {
      userEvent.click(overview);
    });

    const studentDashboard = await screen.findByText('Student Dashboard');
    expect(studentDashboard).not.toBeVisible();

    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });

  it('Clicking footer link inside the modal dismisses the modal', async () => {
    render(<Header />);

    const menu = screen.getByText('Menu');
    act(() => {
      userEvent.click(menu);
    });

    const beta = await screen.findByText(/beta/i, { selector: '[role="dialog"] nav a' });
    act(() => {
      userEvent.click(beta);
    });
    const studentDashboard = await screen.findByText('Student Dashboard');
    expect(studentDashboard).not.toBeVisible();

    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });

  it('Cannot find mobile menu in desktop version, all links visible immediately', async () => {
    act(() => {
      render(<Header />, { isDesktop: true });
    });

    const menu = screen.queryByText('Menu');
    expect(menu).toBeNull();

    expect(await screen.findByText(/beta/i, { selector: 'nav a' })).toBeInTheDocument();
    expect(await screen.findByText(/overview/i, { selector: 'nav a' })).toBeInTheDocument();
    expect(await screen.findByText(/academics/i, { selector: 'nav a' })).toBeInTheDocument();
    expect(await screen.findByText(/finances/i, { selector: 'nav a' })).toBeInTheDocument();
    expect(await screen.findByText(/resources/i, { selector: 'nav a' })).toBeInTheDocument();
  });

  it('Help and Profile menu open and have their respective menu items', async () => {
    render(<Header />);

    const helpMenu = screen.getByText('Help');
    act(() => {
      userEvent.click(helpMenu);
    });
    expect(await screen.findByText(/get help/i)).toBeInTheDocument();
    expect(await screen.findByText(/give feedback/i)).toBeInTheDocument();
    expect(await screen.findByText(/getting started/i)).toBeInTheDocument();

    const profileMenu = screen.getByRole('button', { name: /profile/i });

    // When clicking to open a modal updates state, you still need the act wrapper or warnings pop up
    act(() => {
      userEvent.click(profileMenu);
    });
    expect(await screen.findByRole('menuitem', { name: /logout/i })).toBeInTheDocument();
    expect(await screen.findByRole('menuitem', { name: /profile/i })).toBeInTheDocument();

    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });
});

describe('as a Corvallis user', () => {
  it('renders the appropriate header logo', () => {
    act(() => {
      render(<Header />);
      const appHeader = screen.getByTestId('app-header-logo');
      expect(appHeader).toBeInTheDocument();

      const src = appHeader.getAttribute('src');
      expect(src).toEqual('osu-logo.svg');
      expect(screen.getByRole('img', { name: 'Oregon State University' }));
    });
  });

  it('renders the appropriate header logo with another campus code', async () => {
    act(() => {
      authUserClassification!.attributes!.campusCode = 'J';
      authUserAudienceOverride.campusCode = 'J';
      render(<Header />);

      const appHeader = screen.getByTestId('app-header-logo');
      expect(appHeader).toBeInTheDocument();
      const src = appHeader.getAttribute('src');
      expect(src).toEqual('osu-logo.svg');
      expect(screen.getByRole('img', { name: 'Oregon State University' }));
    });
  });
});

describe('as a Bend user', () => {
  it('renders the appropriate header logo', async () => {
    act(() => {
      authUserClassification!.attributes!.campusCode = 'B';
      authUserAudienceOverride.campusCode = 'B';
      render(<Header />);

      const appHeader = screen.getByTestId('app-header-logo');
      expect(appHeader).toBeInTheDocument();
      const src = appHeader.getAttribute('src');
      expect(src).toEqual('osu-cascades.svg');
      expect(screen.getByRole('img', { name: 'Oregon State University Cascades' }));
    });
  });
});

describe('as an Ecampus user', () => {
  it('renders the appropriate header logo', async () => {
    act(() => {
      authUserClassification!.attributes!.campusCode = 'DSC';
      authUserAudienceOverride.campusCode = 'DSC';
      render(<Header />);

      const appHeader = screen.getByTestId('app-header-logo');
      expect(appHeader).toBeInTheDocument();

      const src = appHeader.getAttribute('src');
      expect(src).toEqual('osu-ecampus.svg');
      expect(screen.getByRole('img', { name: 'Oregon State University Ecampus' }));
    });
  });
});
