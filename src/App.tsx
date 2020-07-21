import React, { useState, useEffect, useRef } from 'react';
import { Router, Location, RouteComponentProps } from '@reach/router';
import styled, { ThemeProvider } from 'styled-components/macro';
import { AnimatePresence } from 'framer-motion';
import ReactGA from 'react-ga';
import { InitialAppContext, IAppContext, AppContext } from './contexts/app-context';
import Header from './ui/Header';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Academics from './pages/Academics';
import Finances from './pages/Finances';
import Resources from './pages/Resources';
import BetaDashboard from './pages/BetaDashboard';
import Notifications from './pages/Notifications';
import PageNotFound from './pages/PageNotFound';
import Training from './pages/Training';
import Alerts from './features/Alerts';
import Footer from './ui/Footer';
import { useUser } from '@osu-wams/hooks';
import { useInfoButtons } from '@osu-wams/hooks';
import { themesLookup } from './theme/themes';
import { GlobalStyles } from './theme';
import { userState, themeState } from './state/application';
import { useRecoilState } from 'recoil';
import { Types } from '@osu-wams/lib';

const ContentWrapper = styled.main`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  height: 100%;
  width: 100%;
  flex-grow: 1;
`;

// Child of the ContentWrapper
const PageGridWrapper = styled.div`
  background-color: ${({ theme }) => theme.mainGrid.background};
  width: 100%;
`;

interface AppProps {
  containerElement: HTMLElement;
}

const RouterPage = (props: { pageComponent: JSX.Element } & RouteComponentProps) =>
  props.pageComponent;

const App = (props: AppProps) => {
  const [user, setUser] = useRecoilState<Types.UserState>(userState);
  const [theme, setTheme] = useRecoilState<string>(themeState);
  const userHook = useUser();
  const infoButtons = useInfoButtons();
  const [appContext, setAppContext] = useState<IAppContext>({
    ...InitialAppContext,
  });
  const containerElementRef = useRef(props.containerElement);

  useEffect(() => {
    if (!userHook.loading && userHook.data !== user.data) {
      setUser(userHook);
      setTheme(user.data?.theme ?? theme);
    }
    if (!userHook.loading && !userHook.error) {
      containerElementRef.current.style.opacity = '1';
    }
  }, [userHook.data, userHook.loading, userHook.error, theme]);

  /* eslint-disable react-hooks/exhaustive-deps  */
  useEffect(() => {
    setAppContext((previous) => ({
      ...previous,
      user,
      infoButtonData: infoButtons.data,
    }));
  }, [user.data, infoButtons.data]);

  useEffect(() => {
    // Manage focus styles on keyboard navigable elements.
    //   - Add focus styles if tab used to navigate.
    //   - Start listening for clicks to remove focus styles.
    const handleTabOnce = (e) => {
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
    <ThemeProvider theme={themesLookup[theme]}>
      <AppContext.Provider value={appContext}>
        <GlobalStyles />
        <Header />
        <Alerts />
        <ContentWrapper>
          <Location>
            {({ location }) => (
              <PageGridWrapper key={location.key}>
                {ReactGA.pageview(location.pathname + location.search + location.hash)}

                <AnimatePresence exitBeforeEnter>
                  <Router location={location} key={location.key} className="router-styles">
                    <RouterPage path="/" pageComponent={<Dashboard />} />
                    <RouterPage path="profile" pageComponent={<Profile />} />
                    <RouterPage path="academics/*" pageComponent={<Academics />} />
                    <RouterPage path="finances" pageComponent={<Finances />} />
                    <RouterPage path="resources" pageComponent={<Resources />} />
                    <RouterPage path="beta" pageComponent={<BetaDashboard />} />
                    {process.env.REACT_APP_EXPERIMENTAL === 'true' && (
                      <RouterPage path="training" pageComponent={<Training />} />
                    )}
                    {process.env.REACT_APP_EXPERIMENTAL === 'true' && (
                      <RouterPage path="notifications" pageComponent={<Notifications />} />
                    )}
                    <RouterPage default pageComponent={<PageNotFound />} />
                  </Router>
                </AnimatePresence>
              </PageGridWrapper>
            )}
          </Location>
        </ContentWrapper>
        <Footer />
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export default App;
