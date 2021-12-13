/* eslint-disable testing-library/no-node-access */
import React from 'react';
import userEvent from '@testing-library/user-event';
import {
  renderWithAllContexts as render,
  mockEmployeeUser,
  mockStudentEmployeeUser,
  authUser,
} from 'src/util/test-utils';
import Header from '../Header';
import { State } from '@osu-wams/hooks';
import { mockGAEvent } from 'src/setupTests';
import { screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('Dashboard Headers', () => {
  it('Student has "Student Dashboard" title', async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(await screen.findByText('Student Dashboard')).toBeInTheDocument();
    expect(screen.queryByTestId('masquerade-banner')).not.toBeInTheDocument();
  });

  it('Employee has "Employee Dashboard" title', async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
      { user: mockEmployeeUser }
    );
    const DashboardTitle = await screen.findByTestId('dashboard-title');
    expect(DashboardTitle).toHaveTextContent('Employee Dashboard');
    expect(screen.queryByTestId('masquerade-banner')).not.toBeInTheDocument();
  });

  it('Employee has a masquerade banner when masquerading', async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
      {
        user: {
          ...mockEmployeeUser,
          data: {
            ...mockEmployeeUser.data,
            isMasquerade: true,
          },
        },
      }
    );
    expect(await screen.findAllByText('Employee Dashboard')).toHaveLength(2);
    expect(await screen.findByText('Masqueraded as Employee')).toBeInTheDocument();
    expect(await screen.findByTestId('masquerade-banner')).toBeInTheDocument();
  });
});

describe('Student mobile menu interactions', () => {
  it('Student Dashboard title only visible when menu is expanded', async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const title = 'Student Dashboard';
    const studentDashboard = screen.queryByText(title);
    expect(studentDashboard).toBeInTheDocument(); // !TODO:  check visibile?

    const menu = screen.getByRole('button', { name: /menu/i });

    userEvent.click(menu);

    const studentDashboardMenu = screen.getByText(title, { selector: 'h2' });
    expect(studentDashboardMenu).toBeVisible();

    expect(mockGAEvent).toHaveBeenCalledTimes(1);
  });

  it('Clicking "menu" opens and clicking the close dismisses the modal', async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const menu = screen.getByText('Menu');
    userEvent.click(menu);

    const close = screen.getByText(/close/i);
    userEvent.click(close);

    const studentDashboard = screen.getByText('Student Dashboard');
    expect(studentDashboard).toBeInTheDocument(); // !TODO:  check visibile?

    expect(mockGAEvent).toHaveBeenCalledTimes(1);
  });

  it('Clicking main link inside the modal dismisses the modal', async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const menu = screen.getByText('Menu');
    userEvent.click(menu);

    const overview = screen.getByText(/overview/i, { selector: '[role="dialog"] a' });
    userEvent.click(overview);

    const studentDashboard = screen.getByText('Student Dashboard');
    expect(studentDashboard).toBeInTheDocument(); // !TODO:  check visibile?

    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });

  it('Clicking footer link inside the modal dismisses the modal', async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const menu = screen.getByText('Menu');
    userEvent.click(menu);

    const about = screen.getByText(/about/i, { selector: '[role="dialog"] nav a' });
    userEvent.click(about);
    const studentDashboard = screen.getByText('Student Dashboard');
    expect(studentDashboard).toBeInTheDocument(); // !TODO:  check visibile?

    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });

  it('Cannot find mobile menu in desktop version, all links visible immediately', async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
      { isDesktop: true }
    );

    const menu = screen.queryByText('Menu');
    expect(menu).not.toBeInTheDocument();

    expect(await screen.findByText(/overview/i, { selector: 'nav a' })).toBeInTheDocument();
    expect(await screen.findByText(/academics/i, { selector: 'nav a' })).toBeInTheDocument();
    expect(await screen.findByText(/finances/i, { selector: 'nav a' })).toBeInTheDocument();
    expect(await screen.findByText(/resources/i, { selector: 'nav a' })).toBeInTheDocument();
  });

  it('Help and Profile menu open and have their respective menu items', async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const helpMenu = screen.getByText('Help');
    userEvent.click(helpMenu);

    expect(await screen.findByText(/get help/i)).toBeInTheDocument();
    expect(await screen.findByText(/give feedback/i)).toBeInTheDocument();
    expect(await screen.findByText(/about myoregonstate/i)).toBeInTheDocument();

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
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );
      const appHeader = screen.getByTestId('app-header-logo');
      expect(appHeader).toBeInTheDocument();

      const src = appHeader.getAttribute('src');
      expect(src).toEqual('osu-logo.svg');
      expect(screen.getByRole('img', { name: 'Oregon State University' }));
    });

    it('render the appropriate header logo in dark mode', async () => {
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>,
        {
          initialStates: [
            {
              state: State.themeState,
              value: 'dark',
            },
          ],
        }
      );
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
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );

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
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>,
        { user: mockUser() }
      );

      const appHeader = screen.getByTestId('app-header-logo');
      expect(appHeader).toBeInTheDocument();
      const src = appHeader.getAttribute('src');
      expect(src).toEqual('osu-cascades.svg');
      expect(screen.getByRole('img', { name: 'Oregon State University Cascades' }));
    });

    it('render the appropriate header logo in dark mode', async () => {
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>,
        {
          user: mockUser(),
          initialStates: [
            {
              state: State.themeState,
              value: 'dark',
            },
          ],
        }
      );
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
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>,
        { user: mockUser() }
      );

      const appHeader = screen.getByTestId('app-header-logo');
      expect(appHeader).toBeInTheDocument();

      const src = appHeader.getAttribute('src');
      expect(src).toEqual('osu-ecampus.svg');
      expect(screen.getByRole('img', { name: 'Oregon State University Ecampus' }));
    });

    it('render the appropriate header logo in dark mode', async () => {
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>,
        {
          user: mockUser(),
          initialStates: [
            {
              state: State.themeState,
              value: 'dark',
            },
          ],
        }
      );
      const appHeader = screen.getByTestId('app-header-logo');
      expect(appHeader).toBeInTheDocument();

      const src = appHeader.getAttribute('src');
      expect(src).toEqual('osu-ecampus-dark.svg');
    });
  });
});

describe('with a dashboard context', () => {
  describe('as a student', () => {
    it('renders the appropriate header link', () => {
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );
      const appLink = screen.getByTestId('app-header-logo').parentElement!;
      expect(appLink).toBeInTheDocument();

      const href = appLink.getAttribute('href');
      expect(href).toEqual('/student');
    });
  });
  describe('as an employee', () => {
    it('renders the appropriate header link', () => {
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>,
        { user: mockEmployeeUser }
      );
      const appLink = screen.getByTestId('app-header-logo').parentElement!;
      expect(appLink).toBeInTheDocument();

      const href = appLink.getAttribute('href');
      expect(href).toEqual('/employee');
    });
    it('opens dashboard toggle menu when clicking site title', async () => {
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>,
        { user: mockEmployeeUser }
      );
      const ToggleDashboardIcon = await screen.findByTestId('dashboard-toggle-icon');
      expect(ToggleDashboardIcon).toBeInTheDocument();
      userEvent.click(ToggleDashboardIcon);
      expect(await screen.findByTestId('dashboard-toggle-menu')).toBeInTheDocument();
      const DashboardTitle = await screen.findByTestId('dashboard-title');
      expect(DashboardTitle).toHaveTextContent('Employee Dashboard');
      expect(await screen.findAllByText('Student Dashboard')).toHaveLength(2);
    });
  });
  describe('as a student employee', () => {
    it('opens dashboard toggle menu when clicking site title', async () => {
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>,
        { user: mockStudentEmployeeUser }
      );
      const ToggleDashboardIcon = await screen.findByTestId('dashboard-toggle-icon');
      expect(ToggleDashboardIcon).toBeInTheDocument();
      userEvent.click(ToggleDashboardIcon);
      expect(await screen.findByTestId('dashboard-toggle-menu')).toBeInTheDocument();
      expect(await screen.findAllByText('Student Dashboard')).toHaveLength(2);
    });

    it('checkmark should appear next to active dashboard in toggle menu', async () => {
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>,
        { user: mockStudentEmployeeUser }
      );
      const ToggleDashboardIcon = await screen.findByTestId('dashboard-toggle-icon');
      userEvent.click(ToggleDashboardIcon);
      const StudentDashboardOption = await screen.findByTestId('student-toggle-option');
      const checkmarkIcon = within(StudentDashboardOption).getByTestId('active-icon');
      expect(checkmarkIcon).toBeInTheDocument();

      // icon should not show up for the non-toggled dashboard option
      const EmployeeDashboardOption = await screen.findByTestId('employee-toggle-option');
      const checkmarkIcon2 = within(EmployeeDashboardOption).getByTestId('inactive-icon');
      expect(checkmarkIcon2).toBeInTheDocument();
    });

    // student employee with employee primary override shows employee dashboard
    it('student employee with override shows employee dashboard', async () => {
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>,
        {
          user: {
            ...mockStudentEmployeeUser,
            data: { ...mockStudentEmployeeUser.data, primaryAffiliationOverride: 'employee' },
          },
        }
      );

      const DashboardTitle = await screen.findByTestId('dashboard-title');
      expect(DashboardTitle).toHaveTextContent('Employee Dashboard');
    });
  });
});
