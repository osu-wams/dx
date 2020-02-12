import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render as testingLibraryRender } from '@testing-library/react';
import { UserContext, AppContext, IAppContext } from '../App';
import { themesLookup, defaultTheme } from '../theme/themes';
import { User } from '@osu-wams/hooks';
const { AFFILIATIONS } = User;

export const mockUser = User.mockUser.user;
export const authUserAudienceOverride = User.mockUser.userAudienceOverride;
export const authUserClassification = User.mockUser.userClassification;

export const mockEmployeeUser = {
  ...mockUser,
  data: {
    ...mockUser.data,
    email: 'testo@oregonstate.edu',
    groups: [],
    isAdmin: false,
    isCanvasOptIn: false,
    primaryAffiliation: AFFILIATIONS.employee,
    classification: {},
    audienceOverride: {}
  }
};

export const authUser = mockUser;

const renderWithUserContext = (ui, { user = authUser, ...options } = {}) => {
  const Wrapper = props => {
    return (
      <ThemeProvider theme={themesLookup[defaultTheme]}>
        <UserContext.Provider value={user} {...props} />
      </ThemeProvider>
    );
  };
  return testingLibraryRender(ui, { wrapper: Wrapper, ...options });
};

export const mockAppContext: IAppContext = {
  infoButtonData: [{ id: 'info-button-id', content: 'Info button content', title: 'Title' }],
  appVersions: {
    serverVersion: 'server-test-123',
    appVersion: 'client-test-123'
  },
  themes: Object.keys(themesLookup),
  selectedTheme: 'light',
  setTheme: () => {}
};

const renderWithAppContext = (ui, { appContext = mockAppContext, ...options } = {}) => {
  const Wrapper = props => {
    return (
      <ThemeProvider theme={themesLookup[defaultTheme]}>
        <AppContext.Provider value={appContext} {...props} />
      </ThemeProvider>
    );
  };
  return testingLibraryRender(ui, { wrapper: Wrapper, ...options });
};

const renderWithAllContexts = (
  ui,
  { appContext = mockAppContext, user = authUser, ...options } = {}
) => {
  const Wrapper = props => {
    return (
      <ThemeProvider theme={themesLookup[defaultTheme]}>
        <UserContext.Provider value={user} {...props}>
          <AppContext.Provider value={appContext} {...props}>
            {props.children}
          </AppContext.Provider>
        </UserContext.Provider>
      </ThemeProvider>
    );
  };
  return testingLibraryRender(ui, { wrapper: Wrapper, ...options });
};

// Adds a delay, sometimes necessary when running tests
const sleep = (ms: number) => {
  return new Promise(res => setTimeout(res, ms));
};

const render = renderWithAllContexts;
// Pass a different user
// const { getByTestId } = renderWithUserContext(<Dashboard />, { user: authUser });

export { renderWithUserContext, renderWithAppContext, renderWithAllContexts, sleep, render };
