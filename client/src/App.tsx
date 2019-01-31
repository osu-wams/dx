/* eslint-disable react/forbid-prop-types */

import React, { useState, useEffect } from 'react';
import { Router as ReachRouter, Location, RouteComponentProps } from '@reach/router';
import styled, { ThemeProvider } from 'styled-components';
import posed, { PoseGroup } from 'react-pose';
import axios from 'axios';
import GlobalStyles from './GlobalStyles';
import { theme } from './theme';
import Header from './ui/Header';
import MainNav from './ui/MainNav';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Academics from './pages/Academics';
import Events from './pages/Events';
import Finances from './pages/Finances';
import Services from './pages/Services';
import PageNotFound from './pages/PageNotFound';

const Router = styled(ReachRouter)`
  margin-top: -58px;
  padding: ${theme.spacing.unit * 2}px;
  width: 100%;
`;

const ContentWrapper = styled.div`
  max-width: 1024px;
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

const UserContext = React.createContext<User>({} as User);

const RouterPage = (props: { pageComponent: JSX.Element } & RouteComponentProps) =>
  props.pageComponent;

const App = () => {
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    axios
      .get('/api/user')
      .then(res => {
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
      <ContentWrapper>
        <Location>
          {({ location }) => (
            <PoseGroup>
              <RouteContainer key={location.key} style={{ width: '100%' }}>
                <Router location={location}>
                  <RouterPage path="/" pageComponent={<Dashboard />} />
                  <RouterPage path="profile" pageComponent={<Profile />} />
                  <RouterPage path="academics" pageComponent={<Academics />} />
                  <RouterPage path="events" pageComponent={<Events />} />
                  <RouterPage path="finances" pageComponent={<Finances />} />
                  <RouterPage path="services" pageComponent={<Services />} />
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
