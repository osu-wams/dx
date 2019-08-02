/* eslint-disable react/forbid-prop-types */

import React, { useState, useEffect } from 'react';
import { Router as ReachRouter, Location, RouteComponentProps } from '@reach/router';
import styled from 'styled-components';
import posed, { PoseGroup } from 'react-pose';
import axios from 'axios';
import GlobalStyles from './GlobalStyles';
import { theme, breakpoints } from './theme';
import Header from './ui/Header';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Academics from './pages/Academics';
import Finances from './pages/Finances';
import Resources from './pages/Resources';
import PageNotFound from './pages/PageNotFound';
import Alerts from './features/Alerts';

const Router = styled(ReachRouter)`
  padding: ${theme.spacing.unit * 2}px;
  width: 100%;
`;

const ContentWrapper = styled.div`
  max-width: ${breakpoints[1024]};
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  flex-grow: 1;
`;

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 100, beforeChildren: true },
  exit: { opacity: 0 }
});

interface User {
  email: String;
}

export const UserContext = React.createContext<any>(null);

const RouterPage = (props: { pageComponent: JSX.Element } & RouteComponentProps) =>
  props.pageComponent;

const App = () => {
  const [user, setUser] = useState<User | {}>({});

  useEffect(() => {
    axios
      .get('/api/user')
      .then(res => {
        // if canvas opt in and expiered need to refresh
        console.log(res.data);
        setUser(res.data);
      })
      .catch(() => {
        window.location.href = '/login';
      });

    // Manage focus styles on keyboard navigable elements.
    //   - Add focus styles if tab used to navigate.
    //   - Start listening for clicks to remove focus styles.
    const handleTabOnce = e => {
      if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleTabOnce);
        window.addEventListener('mousedown', handleMouseDownOnce);
      }
    };
    //   - Remove focus styles if mouse used to navigate.
    //   - Start listening for keydown to add focus styles.
    const handleMouseDownOnce = () => {
      document.body.classList.remove('user-is-tabbing');
      window.removeEventListener('mousedown', handleMouseDownOnce);
      window.addEventListener('keydown', handleTabOnce);
    };

    //   - Listen for keyboard navigation to start.
    window.addEventListener('keydown', handleTabOnce);
  }, []);

  return (
    <UserContext.Provider value={user}>
      <GlobalStyles />
      <Header />
      <Alerts />
      <ContentWrapper>
        <Location>
          {({ location }) => (
            <PoseGroup>
              <RouteContainer key={location.key} style={{ width: '100%' }}>
                <Router location={location}>
                  <RouterPage path="/" pageComponent={<Dashboard />} />
                  <RouterPage path="profile" pageComponent={<Profile />} />
                  <RouterPage path="academics/*" pageComponent={<Academics />} />
                  <RouterPage path="finances" pageComponent={<Finances />} />
                  <RouterPage path="resources" pageComponent={<Resources />} />
                  <RouterPage default pageComponent={<PageNotFound />} />
                </Router>
              </RouteContainer>
            </PoseGroup>
          )}
        </Location>
      </ContentWrapper>
    </UserContext.Provider>
  );
};

export default App;
