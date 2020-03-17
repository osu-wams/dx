import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render as testingLibraryRender } from '@testing-library/react';
import { Context as ResponsiveContext } from 'react-responsive';
import { themesLookup, defaultTheme } from '../theme/themes';
import { User } from '@osu-wams/hooks';
import { mobile, desktop } from 'src/util/useMediaQuery';
import { AppContext, IAppContext } from 'src/contexts/app-context';

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
    audienceOverride: {},
    favoriteResources: []
  },
  refreshFavorites: jest.fn()
};

export const authUser = {
  ...mockUser,
  refreshFavorites: jest.fn()
};

export const mockAppContext: IAppContext = {
  user: authUser,
  infoButtonData: [{ id: 'info-button-id', content: 'Info button content', title: 'Title' }],
  appVersions: {
    serverVersion: 'server-test-123',
    appVersion: 'client-test-123'
  },
  themes: Object.keys(themesLookup),
  selectedTheme: 'light',
  setTheme: () => {}
};

const renderWithUserContext = (ui, { user = authUser, ...options } = {}) => {
  mockAppContext.user = user;
  const Wrapper = props => {
    return (
      <ThemeProvider theme={themesLookup[defaultTheme]}>
        <AppContext.Provider value={mockAppContext} {...props} />
      </ThemeProvider>
    );
  };
  return testingLibraryRender(ui, { wrapper: Wrapper, ...options });
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
  { appContext = mockAppContext, user = authUser, isDesktop = false, ...options } = {}
) => {
  appContext.user = user;
  // console.log(user);
  const Wrapper = props => {
    return (
      <ThemeProvider theme={themesLookup[defaultTheme]}>
        <AppContext.Provider value={appContext} {...props}>
          <ResponsiveContext.Provider value={{ width: isDesktop ? desktop : mobile }} {...props}>
            <AppContext.Provider value={appContext} {...props}>
              {props.children}
            </AppContext.Provider>
          </ResponsiveContext.Provider>
        </AppContext.Provider>
      </ThemeProvider>
    );
  };
  return testingLibraryRender(ui, { wrapper: Wrapper, ...options });
};

const render = renderWithAllContexts;
// Pass a different user
// const { getByTestId } = renderWithUserContext(<Dashboard />, { user: authUser });

export { renderWithUserContext, renderWithAppContext, renderWithAllContexts, render };
