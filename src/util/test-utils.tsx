import React from 'react';
import { render } from '@testing-library/react';

import { UserContext, InfoButtonContext } from '../App';
import { InfoButtonState } from '../api/info-buttons';

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
  return render(ui, { wrapper: Wrapper, ...options });
};

const mockInfoButtons: InfoButtonState[] = [
  { id: 'info-button-id', content: 'Info button content', title: 'Title' }
];

const renderWithInfoButtonContext = (ui, { infoButtons = mockInfoButtons, ...options } = {}) => {
  const Wrapper = props => {
    return <InfoButtonContext.Provider value={infoButtons} {...props} />;
  };
  return render(ui, { wrapper: Wrapper, ...options });
};

const renderWithAllContexts = (
  ui,
  { infoButtons = mockInfoButtons, user = authUser, ...options } = {}
) => {
  const Wrapper = props => {
    return (
      <UserContext.Provider value={user} {...props}>
        <InfoButtonContext.Provider value={infoButtons} {...props}>
          {props.children}
        </InfoButtonContext.Provider>
      </UserContext.Provider>
    );
  };
  return render(ui, { wrapper: Wrapper, ...options });
};

// Pass a different user
// const { getByTestId } = renderWithUserContext(<Dashboard />, { user: authUser });

export { renderWithUserContext, renderWithInfoButtonContext, renderWithAllContexts };
