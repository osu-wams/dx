import React from 'react';
import ReactDOM from 'react-dom';
import { screen, waitFor } from '@testing-library/react';
import { Routes } from '@osu-wams/utils';
import { State } from '@osu-wams/hooks';
import {
  mockEmployeeUser,
  mockStudentEmployeeUser,
  renderWithRouter as render,
} from 'src/util/test-utils';
import App from '../App';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

const { dashboardState, initialRouteState } = State;

const mockPostSettings = jest.fn();
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

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockNavigate,
}));

it('renders <App> without crashing', () => {
  const div = document.createElement('div');
  const queryClient = new QueryClient();
  ReactDOM.render(
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <BrowserRouter>
          <App containerElement={div} />
        </BrowserRouter>
      </RecoilRoot>
    </QueryClientProvider>,
    div
  );
  // ReactDOM.unmountComponentAtNode(div);
});

// TODO: Test behavior moved to @osu-wams/hooks package
xit('changes from student dashboard (default user) to employee dashboard', () => {
  mockPostSettings.mockResolvedValue(true);
  const div = document.createElement('div');
  render(<App containerElement={div} />, {
    initialStates: [
      {
        state: dashboardState,
        value: { affiliation: 'employee', navigateTo: `/employee` },
      },
    ],
  });
  expect(mockPostSettings).toBeCalledTimes(1);
  expect(mockPostSettings).toBeCalledWith({ primaryAffiliationOverride: 'employee' });
});

it('navigates to an initial route', async () => {
  mockNavigate.mockResolvedValue(true);
  const div = document.createElement('div');
  render(<App containerElement={div} />, {
    initialStates: [
      {
        state: initialRouteState,
        value: Routes.Routes().about.fullPath,
      },
    ],
  });
  expect(mockNavigate).lastCalledWith('/about', { replace: true });
});

it('navigates to root and redirects to student (default user) dashboard', async () => {
  window.location.pathname = '/';
  mockNavigate.mockResolvedValue(true);
  const div = document.createElement('div');
  render(<App containerElement={div} />);
  expect(mockNavigate).lastCalledWith('/student', { replace: true });
});

// TODO: Test behavior moved to @osu-wams/hooks package
xit('visiting employee dashboard redirects to student (default user) dashboard with warning', async () => {
  window.location.pathname = '/employee';
  mockNavigate.mockResolvedValue(true);
  const div = document.createElement('div');
  render(<App containerElement={div} />);
  expect(mockNavigate).toBeCalledWith('/student');
  expect(
    await screen.findByText(/You do not have permission to access this page/)
  ).toBeInTheDocument();
});

// TODO: Test behavior moved to @osu-wams/hooks package
xit('employee (previously on employee dashboard) visiting student dashboard changes the dashboard context', async () => {
  window.location.pathname = '/student';
  mockNavigate.mockResolvedValue(true);
  mockPostSettings.mockResolvedValue(true);
  const div = document.createElement('div');
  render(<App containerElement={div} />, {
    user: mockEmployeeUser,
  });
  expect(mockPostSettings).toBeCalledWith({ primaryAffiliationOverride: 'student' });
  await waitFor(() => {
    expect(mockNavigate).toBeCalledWith('/student');
  });
});

// TODO: Test behavior moved to @osu-wams/hooks package
xit('student employee (previously on student dashboard) visiting employee dashboard changes the dashboard context', async () => {
  window.location.pathname = '/employee';
  mockNavigate.mockResolvedValue(true);
  mockPostSettings.mockResolvedValue(true);
  const div = document.createElement('div');
  render(<App containerElement={div} />, {
    user: mockStudentEmployeeUser,
  });
  expect(mockPostSettings).toBeCalledWith({ primaryAffiliationOverride: 'employee' });
  await waitFor(() => {
    expect(mockNavigate).toBeCalledWith('/employee');
  });
});

it('student employee visiting student dashboard', async () => {
  window.location.pathname = '/student';
  mockNavigate.mockResolvedValue(true);
  mockPostSettings.mockResolvedValue(true);
  const div = document.createElement('div');
  render(<App containerElement={div} />, {
    user: mockStudentEmployeeUser,
  });
  expect(mockPostSettings).not.toBeCalled();
  await waitFor(() => {
    expect(mockNavigate).lastCalledWith('/student', { replace: true });
  });
});
