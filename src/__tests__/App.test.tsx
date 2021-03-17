import React from 'react';
import ReactDOM from 'react-dom';
import { navigate } from '@reach/router';
import { screen, waitFor } from '@testing-library/react';
import { alterMock, mockEmployeeUser, render } from 'src/util/test-utils';
import { LocationProvider, createHistory, createMemorySource } from '@reach/router';
import App from '../App';
import { RecoilRoot } from 'recoil';
import { dashboardState, initialRouteState } from 'src/state/application';

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
jest.mock('@reach/router', () => {
  const original = jest.requireActual('@reach/router');
  return {
    ...original,
    navigate: (route) => mockNavigate(route),
  };
});

it('renders <App> without crashing', () => {
  const div = document.createElement('div');
  // Setup for ReachRouter
  const testHistory = createHistory(createMemorySource('/'));
  ReactDOM.render(
    <RecoilRoot>
      <LocationProvider history={testHistory}>
        <App containerElement={div} />
      </LocationProvider>
    </RecoilRoot>,
    div
  );
  // ReactDOM.unmountComponentAtNode(div);
});

it('changes from student dashboard (default user) to employee dashboard', () => {
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
        value: '/about',
      },
    ],
  });
  expect(mockNavigate).toBeCalledWith('/about');
});

it('navigates to root and redirects to student (default user) dashboard', async () => {
  window.location.pathname = '/';
  mockNavigate.mockResolvedValue(true);
  const div = document.createElement('div');
  render(<App containerElement={div} />);
  expect(mockNavigate).toBeCalledWith('/student');
});

it('navigates to root and redirects to student (default user) dashboard with warning', async () => {
  window.location.pathname = '/employee';
  mockNavigate.mockResolvedValue(true);
  const div = document.createElement('div');
  render(<App containerElement={div} />);
  expect(mockNavigate).toBeCalledWith('/student');
});
