import React, { FC } from 'react';
import { ThemeProvider } from 'styled-components';
import { render as testingLibraryRender } from '@testing-library/react';

import { UserContext, AppContext, IAppContext } from '../App';
import { IUserClassification } from '../api/resources'; // eslint-disable-line no-unused-vars
import { themesLookup, defaultTheme } from '../theme/themes';
import { IUserAudienceOverride } from '../api/user';

export const authUserAudienceOverride: IUserAudienceOverride = {
  campusCode: 'B',
  graduate: false,
  international: false,
  firstYear: false
};

export const authUserClassification: IUserClassification = {
  id: '123',
  attributes: {
    level: 'Graduate',
    campus: '',
    campusCode: 'C',
    classification: 'Freshman',
    isInternational: true
  }
};

export const authUser = {
  data: {
    osuId: '123',
    email: 'testo@oregonstate.edu',
    firstName: 'Testo',
    lastName: 'LastTesto',
    isAdmin: true,
    isCanvasOptIn: true,
    theme: 'light',
    classification: authUserClassification,
    audienceOverride: authUserAudienceOverride
  },
  error: false,
  loading: false,
  setUser: jest.fn(),
  isCanvasOptIn: true
};

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

const render = renderWithAllContexts;
// Pass a different user
// const { getByTestId } = renderWithUserContext(<Dashboard />, { user: authUser });

export { renderWithUserContext, renderWithAppContext, renderWithAllContexts, render };
