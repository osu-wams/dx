import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render as testingLibraryRender } from '@testing-library/react';
import { Context as ResponsiveContext } from 'react-responsive';
import { themesLookup, defaultTheme } from '../theme/themes';
import { User } from '@osu-wams/lib';
import { mobile, desktop } from 'src/util/useMediaQuery';
import { AppContext, IAppContext } from 'src/contexts/app-context';
import { RecoilRoot } from 'recoil';
import { userState } from 'src/state/application';

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

export const mockAppContext: IAppContext = {
  user: authUser,
};

const renderWithUserContext = (ui, { user = authUser, ...options } = {}) => {
  mockAppContext.user = user;
  const Wrapper = (props) => {
    return (
      <RecoilRoot initializeState={(snap) => snap.set(userState, user)}>
        <ThemeProvider theme={themesLookup[defaultTheme]}>
          <AppContext.Provider value={mockAppContext} {...props} />
        </ThemeProvider>
      </RecoilRoot>
    );
  };
  return testingLibraryRender(ui, { wrapper: Wrapper, ...options });
};

const renderWithAppContext = (ui, { appContext = mockAppContext, ...options } = {}) => {
  const Wrapper = (props) => {
    return (
      <RecoilRoot initializeState={(snap) => snap.set(userState, authUser)}>
        <ThemeProvider theme={themesLookup[defaultTheme]}>
          <AppContext.Provider value={appContext} {...props} />
        </ThemeProvider>
      </RecoilRoot>
    );
  };
  return testingLibraryRender(ui, { wrapper: Wrapper, ...options });
};

const renderWithAllContexts = (
  ui,
  { appContext = mockAppContext, user = authUser, isDesktop = false, ...options } = {}
) => {
  appContext.user = user;

  const Wrapper = (props) => {
    return (
      <RecoilRoot initializeState={(snap) => snap.set(userState, user)}>
        <ThemeProvider theme={themesLookup[defaultTheme]}>
          <AppContext.Provider value={appContext} {...props}>
            <ResponsiveContext.Provider value={{ width: isDesktop ? desktop : mobile }} {...props}>
              <AppContext.Provider value={appContext} {...props}>
                {props.children}
              </AppContext.Provider>
            </ResponsiveContext.Provider>
          </AppContext.Provider>
        </ThemeProvider>
      </RecoilRoot>
    );
  };
  return testingLibraryRender(ui, { wrapper: Wrapper, ...options });
};

const render = renderWithAllContexts;
// Pass a different user
// const { getByTestId } = renderWithUserContext(<Dashboard />, { user: authUser });

export { renderWithUserContext, renderWithAppContext, renderWithAllContexts, render };
