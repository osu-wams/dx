/* eslint-disable react/forbid-prop-types */

import React, { useState, useEffect } from 'react';
import { Router as ReachRouter, Location } from '@reach/router';
import styled, { ThemeProvider } from 'styled-components';
import posed, { PoseGroup } from 'react-pose';
import axios from 'axios';
import GlobalStyles from './GlobalStyles';
import theme from './theme';
import Header from './components/layout/Header';
import MainNav from './components/layout/MainNav';
import Dashboard from './components/pages/Dashboard';
import Profile from './components/pages/Profile';
import Academics from './components/pages/Academics';
import Events from './components/pages/Events';
import Finances from './components/pages/Finances';
import Services from './components/pages/Services';
import PageNotFound from './components/pages/PageNotFound';

const Router = styled(ReachRouter)`
  padding: ${props => props.theme.spacing.unit * 2}px;
  width: 100%;
`;

const ContentWrapper = styled.div`
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
  background-color: #fff;
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

const UserContext = React.createContext();

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get('/api/user')
      .then(res => {
        setUser(res.data);
      })
      .catch(() => {
        window.location.href = '/login';
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={user}>
        <GlobalStyles />
        <Header />
        <ContentWrapper>
          <MainNav />
          <Location>
            {({ location }) => (
              <PoseGroup>
                <RouteContainer key={location.key} style={{ width: '100%' }}>
                  <Router location={location}>
                    <Dashboard path="/" />
                    <Profile path="profile" />
                    <Academics path="academics" />
                    <Events path="events" />
                    <Finances path="finances" />
                    <Services path="services" />
                    <PageNotFound default />
                  </Router>
                </RouteContainer>
              </PoseGroup>
            )}
          </Location>
        </ContentWrapper>
      </UserContext.Provider>
    </ThemeProvider>
  );
};

export default App;
