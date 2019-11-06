import React, { useState, useEffect, useRef } from 'react';
import { Router, Location, RouteComponentProps } from '@reach/router';
import styled from 'styled-components';
import posed, { PoseGroup } from 'react-pose';
import ReactGA from 'react-ga';
import GlobalStyles from './GlobalStyles';
import Header from './ui/Header';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Academics from './pages/Academics';
import Finances from './pages/Finances';
import Resources from './pages/Resources';
import BetaDashboard from './pages/BetaDashboard';
import PageNotFound from './pages/PageNotFound';
import Alerts from './features/Alerts';
import Footer from './ui/Footer';
import { useInfoButtons, InfoButtonState } from './api/info-buttons';
import { useUser } from './api/user';
import { useAppVersions, AppVersions } from './api/app-versions';

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  height: 100%;
  width: 100%;
  flex-grow: 1;
`;

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 100, beforeChildren: true },
  exit: { opacity: 0 }
});

const initialAppContext: IAppContext = {
  infoButtonData: [],
  appVersions: {
    serverVersion: '',
    appVersion: ''
  }
};

interface User {
  email: String;
}

interface AppProps {
  containerElement: HTMLElement;
}

export interface IAppContext {
  infoButtonData: InfoButtonState[];
  appVersions: AppVersions;
}

export const UserContext = React.createContext<any>(null);
export const AppContext = React.createContext<IAppContext>(initialAppContext);

const RouterPage = (props: { pageComponent: JSX.Element } & RouteComponentProps) =>
  props.pageComponent;

const App = (props: AppProps) => {
  const user = useUser();
  const infoButtons = useInfoButtons();
  const appVersions = useAppVersions(initialAppContext.appVersions);
  const [appContext, setAppContext] = useState<IAppContext>(initialAppContext);
  const containerElementRef = useRef(props.containerElement);

  useEffect(() => {
    setAppContext(previous => ({
      ...previous,
      infoButtonData: infoButtons.data,
      appVersions: appVersions.data
    }));

    if (user.error) {
      window.location.href = '/login';
    } else if (!user.loading) {
      containerElementRef.current.style.opacity = '1';
    }

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
  }, [infoButtons.data, user.error, user.loading, appVersions.data]);

  return (
    <UserContext.Provider value={user}>
      <AppContext.Provider value={appContext}>
        <GlobalStyles />
        <Header />
        <Alerts />
        <ContentWrapper>
          <Location>
            {({ location }) => (
              <PoseGroup>
                {ReactGA.pageview(location.pathname + location.search + location.hash)}
                <RouteContainer key={location.key} style={{ width: '100%' }}>
                  <Router location={location} style={{ height: '100%' }}>
                    <RouterPage path="/" pageComponent={<Dashboard />} />
                    <RouterPage path="profile" pageComponent={<Profile />} />
                    <RouterPage path="academics/*" pageComponent={<Academics />} />
                    <RouterPage path="finances" pageComponent={<Finances />} />
                    <RouterPage path="resources" pageComponent={<Resources />} />
                    <RouterPage path="beta" pageComponent={<BetaDashboard />} />
                    <RouterPage default pageComponent={<PageNotFound />} />
                  </Router>
                </RouteContainer>
              </PoseGroup>
            )}
          </Location>
        </ContentWrapper>
        <Footer />
      </AppContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
