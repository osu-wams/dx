import React from 'react';
import { ThemeProvider } from 'styled-components';
import { createHistory, createMemorySource, LocationProvider } from '@reach/router';
import { render as testingLibraryRender } from '@testing-library/react';
import { Context as ResponsiveContext } from 'react-responsive';
import { themesLookup, defaultTheme } from '@osu-wams/theme';
import { User } from '@osu-wams/lib';
import { State, updateQueryClientOptions } from '@osu-wams/hooks';
import { mobile, desktop } from 'src/hooks/useMediaQuery';
import { RecoilRoot } from 'recoil';
import { rest } from 'msw';
import { server } from 'src/mocks/server';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from 'react-query';

// Helper method to change the mock responses by MSW
export const alterMock = (api: string, mock: any, status: number = 200) => {
  server.use(
    rest.get('*' + api, async (req, res, ctx) => {
      return res(ctx.status(status), ctx.json(mock));
    })
  );
};

const { mockUser } = User;
export const authUserAudienceOverride = mockUser.userAudienceOverride;

export const mockEcampusUser = {
  ...mockUser.user,
  data: {
    ...mockUser.user.data,
    audienceOverride: {
      campusCode: User.CAMPUS_CODES['ecampus'][0],
    },
  },
  refreshFavorites: jest.fn(),
};

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
    const queryClient = new QueryClient();
    updateQueryClientOptions(queryClient, {
      baseUrl: '/',
      enabled: true,
      headers: {},
      retry: true,
    });

    return (
      <QueryClientProvider client={queryClient}>
        <RecoilRoot
          initializeState={(snap) => {
            snap.set(State.userState, user);
            initialStates.forEach((s: { state: any; value: any }) => snap.set(s.state, s.value));
          }}
        >
          <LocationProvider>
            <HelmetProvider>
              <ThemeProvider theme={themesLookup[defaultTheme]} {...props} />
            </HelmetProvider>
          </LocationProvider>
        </RecoilRoot>
      </QueryClientProvider>
    );
  };
  return testingLibraryRender(ui, { wrapper: Wrapper, ...options });
};

const renderWithAppContext = (ui, { initialStates = new Array(), ...options } = {}) => {
  const Wrapper = (props) => {
    const queryClient = new QueryClient();
    updateQueryClientOptions(queryClient, {
      baseUrl: '/',
      enabled: true,
      headers: {},
      retry: true,
    });

    return (
      <QueryClientProvider client={queryClient}>
        <RecoilRoot
          initializeState={(snap) => {
            snap.set(State.userState, authUser);
            initialStates.forEach((s: { state: any; value: any }) => snap.set(s.state, s.value));
          }}
        >
          <LocationProvider>
            <HelmetProvider>
              <ThemeProvider theme={themesLookup[defaultTheme]} {...props} />
            </HelmetProvider>
          </LocationProvider>
        </RecoilRoot>
      </QueryClientProvider>
    );
  };
  return testingLibraryRender(ui, { wrapper: Wrapper, ...options });
};

const renderWithAllContexts = (
  ui,
  {
    user = authUser,
    isDesktop = false,
    initialStates = new Array(),
    route = '/',
    history = createHistory(createMemorySource(route)),
    ...options
  } = {}
) => {
  const Wrapper = (props) => {
    const queryClient = new QueryClient();
    updateQueryClientOptions(queryClient, {
      baseUrl: '/',
      enabled: true,
      headers: {},
      retry: true,
    });

    return (
      <QueryClientProvider client={queryClient}>
        <RecoilRoot
          initializeState={(snap) => {
            snap.set(State.userState, user);
            initialStates.forEach((s: { state: any; value: any }) => snap.set(s.state, s.value));
          }}
        >
          <LocationProvider history={history}>
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
      </QueryClientProvider>
    );
  };
  return { ...testingLibraryRender(ui, { wrapper: Wrapper, ...options }), history };
};

export { renderWithUserContext, renderWithAppContext, renderWithAllContexts };
