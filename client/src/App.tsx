/* eslint-disable react/forbid-prop-types */

import React, { useState, useEffect } from 'react';
import { Router as ReachRouter, Location, RouteComponentProps } from '@reach/router';
import styled, { ThemeProvider } from 'styled-components';
import posed, { PoseGroup } from 'react-pose';
import axios from 'axios';
import GlobalStyles from './GlobalStyles';
import theme from './theme';
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
    </ThemeProvider>
  );
};

export default App;
