import React from 'react';
import { ThemeProvider } from 'styled-components';
import { LocationProvider } from '@reach/router';
import { render as testingLibraryRender } from '@testing-library/react';
import { Context as ResponsiveContext } from 'react-responsive';
import { themesLookup, defaultTheme } from '../theme/themes';
import { User } from '@osu-wams/lib';
import { mobile, desktop } from 'src/util/useMediaQuery';
import { RecoilRoot } from 'recoil';
import { userState } from 'src/state';
import { rest } from 'msw';
import { server } from 'src/mocks/server';
import { HelmetProvider } from 'react-helmet-async';

// Helper method to change the mock responses by MSW
export const alterMock = (api: string, mock: any) => {
  server.use(
    rest.get(api, async (req, res, ctx) => {
      return res(ctx.json(mock));
    })
  );
};

const { mockUser } = User;
export const authUserAudienceOverride = mockUser.userAudienceOverride;

export const mockGradUser = {
  ...mockUser.userGraduate,
  refreshFavorites: jest.fn(),
};

export const authUserClassification = mockUser.userClassification;

export const mockEmployeeUser = {
  ...mockUser.userEmployee,
  refreshFavorites: jest.fn(),
};

export const mockStudentEmployeeUser = {
  ...mockUser.userStudentEmployee,
  refreshFavorites: jest.fn(),
};

export const mockGradStudentEmployeeUser = {
  ...mockUser.userGraduateStudentEmployee,
  refreshFavorites: jest.fn(),
};

// The default undegraduate user with canvas opted in
export const authUser = {
  ...mockUser.user,
  refreshFavorites: jest.fn(),
};

// The default undegraduate user with canvas opted in
export const mockAdminUser = {
  ...mockUser.userAdmin,
  refreshFavorites: jest.fn(),
};

const renderWithUserContext = (
  ui,
  { user = authUser, initialStates = new Array(), ...options } = {}
) => {
  const Wrapper = (props) => {
    return (
      <RecoilRoot
        initializeState={(snap) => {
          snap.set(userState, user);
          initialStates.forEach((s: { state: any; value: any }) => snap.set(s.state, s.value));
        }}
      >
        <LocationProvider>
          <HelmetProvider>
            <ThemeProvider theme={themesLookup[defaultTheme]} {...props} />
          </HelmetProvider>
        </LocationProvider>
      </RecoilRoot>
    );
  };
  return testingLibraryRender(ui, { wrapper: Wrapper, ...options });
};

const renderWithAppContext = (ui, { initialStates = new Array(), ...options } = {}) => {
  const Wrapper = (props) => {
    return (
      <RecoilRoot
        initializeState={(snap) => {
          snap.set(userState, authUser);
          initialStates.forEach((s: { state: any; value: any }) => snap.set(s.state, s.value));
        }}
      >
        <LocationProvider>
          <HelmetProvider>
            <ThemeProvider theme={themesLookup[defaultTheme]} {...props} />
          </HelmetProvider>
        </LocationProvider>
      </RecoilRoot>
    );
  };
  return testingLibraryRender(ui, { wrapper: Wrapper, ...options });
};

const renderWithAllContexts = (
  ui,
  { user = authUser, isDesktop = false, initialStates = new Array(), ...options } = {}
) => {
  const Wrapper = (props) => {
    return (
      <RecoilRoot
        initializeState={(snap) => {
          snap.set(userState, user);
          initialStates.forEach((s: { state: any; value: any }) => snap.set(s.state, s.value));
        }}
      >
        <LocationProvider>
          <HelmetProvider>
            <ThemeProvider theme={themesLookup[defaultTheme]}>
              <ResponsiveContext.Provider
                value={{ width: isDesktop ? desktop : mobile }}
                {...props}
              />
            </ThemeProvider>
          </HelmetProvider>
        </LocationProvider>
      </RecoilRoot>
    );
  };
  return testingLibraryRender(ui, { wrapper: Wrapper, ...options });
};

const render = renderWithAllContexts;
// Pass a different user
// const { getByTestId } = renderWithUserContext(<Dashboard />, { user: authUser });

export { renderWithUserContext, renderWithAppContext, renderWithAllContexts, render };
