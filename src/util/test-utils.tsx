import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render as testingLibraryRender } from '@testing-library/react';
import { UserContext, AppContext, IAppContext } from '../App';
import { themesLookup, defaultTheme } from '../theme/themes';
import {
  IUserAudienceOverride,
  IUserClassification,
  AFFILIATIONS,
  defaultCampus,
  GROUPS
} from '../api/user';

export const authUserAudienceOverride: IUserAudienceOverride = {
  campusCode: 'C',
  graduate: true,
  international: true,
  firstYear: true
};

export const authUserClassification: IUserClassification = {
  id: '123',
  attributes: {
    level: 'Graduate',
    campus: '',
    campusCode: defaultCampus,
    classification: 'Freshman',
    isInternational: true
  }
};

export const mockUser = {
  osuId: '123',
  email: 'testo@oregonstate.edu',
  firstName: 'Testo',
  lastName: 'LastTesto',
  isAdmin: true,
  groups: [GROUPS.admin, GROUPS.masquerade],
  isCanvasOptIn: true,
  theme: defaultTheme,
  primaryAffiliation: AFFILIATIONS.student,
  classification: authUserClassification,
  audienceOverride: authUserAudienceOverride
};

export const mockEmployeeUser = {
  data: {
    osuId: '123',
    email: 'testo@oregonstate.edu',
    firstName: 'Testo',
    lastName: 'LastTesto',
    isAdmin: false,
    groups: [],
    isCanvasOptIn: false,
    theme: defaultTheme,
    primaryAffiliation: AFFILIATIONS.employee,
    classification: {},
    audienceOverride: {}
  },
  error: false,
  loading: false,
  isCanvasOptIn: false,
  setUser: jest.fn()
};

export const authUser = {
  data: mockUser,
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

// Adds a delay, sometimes necessary when running tests
const sleep = (ms: number) => {
  return new Promise(res => setTimeout(res, ms));
};

const render = renderWithAllContexts;
// Pass a different user
// const { getByTestId } = renderWithUserContext(<Dashboard />, { user: authUser });

export { renderWithUserContext, renderWithAppContext, renderWithAllContexts, sleep, render };
