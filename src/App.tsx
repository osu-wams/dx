import React, { useState, useEffect, useRef } from 'react';
import { Router, Location, RouteComponentProps } from '@reach/router';
import styled, { ThemeProvider } from 'styled-components/macro';
import { AnimatePresence } from 'framer-motion';
import ReactGA from 'react-ga';
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
import { useUser, usePlannerItems } from '@osu-wams/hooks';
import { useInfoButtons } from '@osu-wams/hooks';
import { themesLookup } from './theme/themes';
import { GlobalStyles } from './theme';
import { userState, themeState, infoButtonState, plannerItemState } from './state/application';
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
  const [infoButtonData, setInfoButtonData] = useRecoilState(infoButtonState);
  const [plannerItemData, setPlannerItemData] = useRecoilState(plannerItemState);
  const userHook = useUser();
  const infoButtons = useInfoButtons();
  const plannerItems = usePlannerItems({
    enabled: user.isCanvasOptIn,
    retry: false,
    // If the user had previously approved Canvas, but planner-items fails on the server side due to invalid oauth,
    // a 403 is returned to the frontend, the user isCanvasOptIn should be changed to false and the hook disabled, causing the
    // component to render the "Authorize Canvas" button giving the user the ability to opt-in again.
    // @ts-ignore never read
    onError: (err) => {
      const {
        response: { status },
      } = err as any;
      if (user.isCanvasOptIn && status === 403) {
        setUser((prevUser) => ({
          ...prevUser,
          isCanvasOptIn: false,
          data: { ...prevUser.data, isCanvasOptIn: false },
        }));
      }
    },
  });

  const containerElementRef = useRef(props.containerElement);

  /* eslint-disable react-hooks/exhaustive-deps  */
  useEffect(() => {
    if (plannerItems.data && plannerItems.data !== plannerItemData.data) {
      setPlannerItemData({
        data: plannerItems.data,
        isLoading: plannerItems.isLoading,
        error: plannerItems.error,
      });
    }
  }, [plannerItems.data]);

  useEffect(() => {
    if (infoButtons.data !== infoButtonData) {
      setInfoButtonData(infoButtons.data);
    }
  }, [infoButtons.data]);

  useEffect(() => {
    if (!userHook.loading && userHook.data !== user.data) {
      setUser(userHook);
      setTheme(user.data?.theme ?? theme);
    }
    if (!userHook.loading && !userHook.error) {
      containerElementRef.current.style.opacity = '1';
    }
  }, [userHook.data, userHook.loading, userHook.error, theme]);

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
    </ThemeProvider>
  );
};

export default App;
