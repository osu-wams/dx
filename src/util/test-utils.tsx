import React from 'react';
import { render as testingLibraryRender } from '@testing-library/react';

import { UserContext, AppContext, IAppContext } from '../App';

const authUser = {
  osuId: '123',
  email: 'testo@oregonstate.edu',
  firstName: 'Testo',
  lastName: 'LastTesto',
  isAdmin: true,
  isCanvasOptIn: true
};

const renderWithUserContext = (ui, { user = authUser, ...options } = {}) => {
  const Wrapper = props => {
    return <UserContext.Provider value={user} {...props} />;
  };
  return testingLibraryRender(ui, { wrapper: Wrapper, ...options });
};

const mockAppContext: IAppContext = {
  infoButtonData: [{ id: 'info-button-id', content: 'Info button content', title: 'Title' }]
};

const renderWithAppContext = (ui, { appContext = mockAppContext, ...options } = {}) => {
  const Wrapper = props => {
    return <AppContext.Provider value={appContext} {...props} />;
  };
  return testingLibraryRender(ui, { wrapper: Wrapper, ...options });
};

const renderWithAllContexts = (
  ui,
  { appContext = mockAppContext, user = authUser, ...options } = {}
) => {
  const Wrapper = props => {
    return (
      <UserContext.Provider value={user} {...props}>
        <AppContext.Provider value={appContext} {...props}>
          {props.children}
        </AppContext.Provider>
      </UserContext.Provider>
    );
  };
  return testingLibraryRender(ui, { wrapper: Wrapper, ...options });
};

const render = renderWithAllContexts;
// Pass a different user
// const { getByTestId } = renderWithUserContext(<Dashboard />, { user: authUser });

export { renderWithUserContext, renderWithAppContext, renderWithAllContexts, render };
