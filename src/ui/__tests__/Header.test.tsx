import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, mockEmployeeUser, authUser } from 'src/util/test-utils';
import Header from '../Header';
import { themeState } from 'src/state/application';
import { mockGAEvent } from 'src/setupTests';
import { act, screen } from '@testing-library/react';

describe('Dashboard Headers', () => {
  it('Student has "Student Dashboard" title', async () => {
    render(<Header />);
    // !todo change to this line in the near future
    // const title = screen.getByRole('banner', { name: /Student Dashboard/i });
    const title = await screen.findByText('Student Dashboard');

    expect(title).toBeInTheDocument();
  });

  it('Employee has "Employee Dashboard" title', async () => {
    render(<Header />, { user: mockEmployeeUser });
    const title = await screen.findByText('Employee Dashboard');
    expect(title).toBeInTheDocument();
  });
});

describe('Student mobile menu interactions', () => {
  it('Student Dashboard title only visible when menu is expanded', async () => {
    render(<Header />);

    const title = 'Student Dashboard';
    const studentDashboard = screen.queryByText(title);
    expect(studentDashboard).toBeInTheDocument(); // !TODO:  check visibile?

    const menu = screen.getByRole('button', { name: /menu/i });

    userEvent.click(menu);

    const studentDashboardMenu = await screen.findByText(title, { selector: 'h2' });
    expect(studentDashboardMenu).toBeVisible();

    expect(mockGAEvent).toHaveBeenCalledTimes(1);
  });

  it('Clicking "menu" opens and clicking the close dismisses the modal', async () => {
    render(<Header />);

    const menu = screen.getByText('Menu');
    userEvent.click(menu);

    const close = await screen.findByText(/close/i);
    userEvent.click(close);

    const studentDashboard = await screen.findByText('Student Dashboard');
    expect(studentDashboard).toBeInTheDocument(); // !TODO:  check visibile?

    expect(mockGAEvent).toHaveBeenCalledTimes(1);
  });

  it('Clicking main link inside the modal dismisses the modal', async () => {
    render(<Header />);

    const menu = screen.getByText('Menu');
    userEvent.click(menu);

    const overview = await screen.findByText(/overview/i, { selector: '[role="dialog"] a' });
    userEvent.click(overview);

    const studentDashboard = await screen.findByText('Student Dashboard');
    expect(studentDashboard).toBeInTheDocument(); // !TODO:  check visibile?

    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });

  it('Clicking footer link inside the modal dismisses the modal', async () => {
    render(<Header />);

    const menu = screen.getByText('Menu');
    userEvent.click(menu);

    const beta = await screen.findByText(/beta/i, { selector: '[role="dialog"] nav a' });
    userEvent.click(beta);
    const studentDashboard = await screen.findByText('Student Dashboard');
    expect(studentDashboard).toBeInTheDocument(); // !TODO:  check visibile?

    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });

  it('Cannot find mobile menu in desktop version, all links visible immediately', async () => {
    render(<Header />, { isDesktop: true });

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
    userEvent.click(helpMenu);

    expect(await screen.findByText(/get help/i)).toBeInTheDocument();
    expect(await screen.findByText(/give feedback/i)).toBeInTheDocument();
    expect(await screen.findByText(/getting started/i)).toBeInTheDocument();

    const profileMenu = screen.getByRole('button', { name: /profile/i });

    userEvent.click(profileMenu);
    expect(await screen.findByRole('menuitem', { name: /logout/i })).toBeInTheDocument();
    expect(await screen.findByRole('menuitem', { name: /profile/i })).toBeInTheDocument();

    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });
});

describe('with a campus code', () => {
  const mockUser = jest.fn();

  describe('as a Corvallis user', () => {
    it('renders the appropriate header logo', () => {
      render(<Header />);
      const appHeader = screen.getByTestId('app-header-logo');
      expect(appHeader).toBeInTheDocument();

      const src = appHeader.getAttribute('src');
      expect(src).toEqual('osu-logo.svg');
      expect(screen.getByRole('img', { name: 'Oregon State University' }));
    });

    it('render the appropriate header logo in dark mode', async () => {
      render(<Header />, {
        initialStates: [
          {
            state: themeState,
            value: 'dark',
          },
        ],
      });
      const appHeader = screen.getByTestId('app-header-logo');
      expect(appHeader).toBeInTheDocument();

      const src = appHeader.getAttribute('src');
      expect(src).toEqual('osu-logo-dark.svg');
      expect(await screen.findByRole('img', { name: 'Oregon State University' }));
    });

    it('renders the appropriate header logo with another campus code', async () => {
      mockUser.mockReturnValue({
        ...authUser,
        data: {
          ...authUser.data,
          classification: {
            ...authUser.data.classification,
            attributes: {
              ...authUser.data.classification.attributes,
              campusCode: 'J',
            },
          },
        },
      });
      render(<Header />);

      const appHeader = screen.getByTestId('app-header-logo');
      expect(appHeader).toBeInTheDocument();
      const src = appHeader.getAttribute('src');
      expect(src).toEqual('osu-logo.svg');
      expect(screen.getByRole('img', { name: 'Oregon State University' }));
    });
  });

  describe('as a Bend user', () => {
    beforeEach(() => {
      mockUser.mockReturnValue({
        ...authUser,
        data: {
          ...authUser.data,
          classification: {
            ...authUser.data.classification,
            attributes: {
              ...authUser.data.classification.attributes,
              campusCode: 'B',
            },
          },
        },
      });
    });
    it('renders the appropriate header logo', async () => {
      render(<Header />, { user: mockUser() });

      const appHeader = screen.getByTestId('app-header-logo');
      expect(appHeader).toBeInTheDocument();
      const src = appHeader.getAttribute('src');
      expect(src).toEqual('osu-cascades.svg');
      expect(screen.getByRole('img', { name: 'Oregon State University Cascades' }));
    });

    it('render the appropriate header logo in dark mode', async () => {
      render(<Header />, {
        user: mockUser(),
        initialStates: [
          {
            state: themeState,
            value: 'dark',
          },
        ],
      });
      const appHeader = screen.getByTestId('app-header-logo');
      expect(appHeader).toBeInTheDocument();

      const src = appHeader.getAttribute('src');
      expect(src).toEqual('osu-cascades-dark.svg');
    });
  });

  describe('as an Ecampus user', () => {
    beforeEach(() => {
      mockUser.mockReturnValue({
        ...authUser,
        data: {
          ...authUser.data,
          classification: {
            ...authUser.data.classification,
            attributes: {
              ...authUser.data.classification.attributes,
              campusCode: 'DSC',
            },
          },
        },
      });
    });
    it('renders the appropriate header logo', async () => {
      render(<Header />, { user: mockUser() });

      const appHeader = screen.getByTestId('app-header-logo');
      expect(appHeader).toBeInTheDocument();

      const src = appHeader.getAttribute('src');
      expect(src).toEqual('osu-ecampus.svg');
      expect(screen.getByRole('img', { name: 'Oregon State University Ecampus' }));
    });

    it('render the appropriate header logo in dark mode', async () => {
      render(<Header />, {
        user: mockUser(),
        initialStates: [
          {
            state: themeState,
            value: 'dark',
          },
        ],
      });
      const appHeader = screen.getByTestId('app-header-logo');
      expect(appHeader).toBeInTheDocument();

      const src = appHeader.getAttribute('src');
      expect(src).toEqual('osu-ecampus-dark.svg');
    });
  });
});
