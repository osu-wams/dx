import React from 'react';
import { render } from '@testing-library/react';

import { UserContext } from '../App';

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

// Pass a different user
// const { getByTestId } = renderWithUserContext(<Dashboard />, { user: authUser });

export { renderWithUserContext };
