import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import Dashboard from '../Dashboard';

import { UserContext } from '../../App';

// const mockUser = jest.fn();
// jest.mock('../../App', () => {
//   return jest.fn().mockImplementation(() => {
//     return {user: mockUser}
//   })
// })
const auth = {
  osuId: '123',
  email: 'testo@oregonstate.edu',
  firstName: 'Testo',
  lastName: 'LastTesto',
  isAdmin: true,
  canvasOauthToken: '123',
  canvasOauthExpire: 1562889528,
  isCanvasOptIn: true
};

function render(ui, { user = auth, ...options } = {}) {
  function Wrapper(props) {
    return <UserContext.Provider value={user} {...props} />;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

test('renders', () => {
  const { getByTestId } = render(<Dashboard />, { user: auth });
  expect(getByTestId('dashboard-page')).toBeInTheDocument();
});
