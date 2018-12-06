/* eslint-disable react/forbid-prop-types */

import React from 'react';
import { Router as ReachRouter } from '@reach/router';
import styled, { ThemeProvider } from 'styled-components';
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

const App = () => (
  <ThemeProvider theme={theme}>
    <div style={{ minHeight: '100vh' }}>
      <GlobalStyles />
      <Header />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            maxWidth: '1024px',
            width: '100%',
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
            minHeight: '100vh'
          }}
        >
          <MainNav />
          <Router>
            <Dashboard path="/" />
            <Profile path="profile" />
            <Academics path="academics" />
            <Events path="events" />
            <Finances path="finances" />
            <Services path="services" />
            <PageNotFound default />
          </Router>
        </div>
      </div>
    </div>
  </ThemeProvider>
);

export default App;
