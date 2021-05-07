import React, { useEffect, useRef } from 'react';
import Loadable, { LoadableComponent } from 'react-loadable';
import { HelmetProvider } from 'react-helmet-async';
import { navigate, Router, Location, RouteComponentProps } from '@reach/router';
import styled, { ThemeProvider } from 'styled-components/macro';
import { AnimatePresence } from 'framer-motion';
import ReactGA from 'react-ga';
import Header from './ui/Header';
import Alerts from './features/Alerts';
import Footer from './ui/Footer';
import { themesLookup } from './theme/themes';
import { GlobalStyles } from './theme';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Types } from '@osu-wams/lib';
import { State, useUserState } from '@osu-wams/hooks';
import { Routes } from '@osu-wams/utils';
import { ReactQueryDevtools } from 'react-query-devtools/dist/react-query-devtools.production.min';
import { ApplicationMessages } from 'src/ui/ApplicationMessages';
import { RouterPage } from './routers';
import Profile from './pages/Profile';
import About from './pages/About';
import Search from './pages/Search';
import Notifications from './pages/Notifications';
import PageNotFound from './pages/PageNotFound';
import MobileCovid from './pages/mobile-app/MobileCovid';
import {
  useCardsState,
  useCourseScheduleState,
  useGradesState,
  useInfoButtonsState,
  usePlannerItemsState,
  useResourcesState,
  useTrainingsState,
  useSearchIndexState,
} from 'src/hooks';

const { initialRouteState, isLoadedState, userState, themeState } = State;

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

// TODO: Improve error state and "Loading" when it exceeds delay
const Loading = (props) => {
  if (props.error) {
    return (
      <div>
        Error! <button onClick={props.retry}>Retry</button>
      </div>
    );
  } else if (props.pastDelay) {
    return <div></div>;
  } else {
    return null;
  }
};

/* istanbul ignore next */
const EmployeeRouter = Loadable({
  loader: () => import('./routers/Employee'),
  loading: Loading,
  delay: 200,
}) as React.FunctionComponent<RouteComponentProps> & LoadableComponent;

/* istanbul ignore next */
const StudentRouter = Loadable({
  loader: () => import('./routers/Student'),
  loading: Loading,
  delay: 200,
}) as React.FunctionComponent<RouteComponentProps> & LoadableComponent;

const App = (props: AppProps) => {
  const isLoaded = useRecoilValue(isLoadedState);
  const setInitialRoute = useSetRecoilState(initialRouteState);
  const user = useRecoilValue<Types.UserState>(userState);
  const [theme, setTheme] = useRecoilState<string>(themeState);
  const containerElementRef = useRef(props.containerElement);
  useUserState(navigate);
  useGradesState();
  useCourseScheduleState();
  usePlannerItemsState();
  useResourcesState();
  useCardsState();
  useInfoButtonsState();
  useTrainingsState();
  useSearchIndexState();

  /* eslint-disable react-hooks/exhaustive-deps  */

  // After userHook useEffect resolves the user and dashboard context, it tells the app to become visible
  useEffect(() => {
    if (isLoaded) {
      containerElementRef.current.style.opacity = '1';
      setInitialRoute('');
    }
  }, [isLoaded]);

  /**
   * Targets Theme.tsx shared user state modifications
   */
  useEffect(() => {
    setTheme(user.data?.theme || theme);
  }, [theme, user.data.theme]);

  useEffect(() => {
    // Manage focus styles on keyboard navigable elements.
    //   - Add focus styles if tab used to navigate.
    //   - Start listening for clicks to remove focus styles.
    /* istanbul ignore next */
    const handleTabOnce = (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleTabOnce);
        window.addEventListener('mousedown', handleMouseDownOnce);
      }
    };

    //   - Remove focus styles if mouse used to navigate.
    //   - Start listening for keydown to add focus styles.
    /* istanbul ignore next */
    const handleMouseDownOnce = () => {
      document.body.classList.remove('user-is-tabbing');
      window.removeEventListener('mousedown', handleMouseDownOnce);
      window.addEventListener('keydown', handleTabOnce);
    };

    //   - Listen for keyboard navigation to start.
    window.addEventListener('keydown', handleTabOnce);

    setInitialRoute(`${window.location.pathname}${window.location.search}`);
  }, []);

  // If logged in through mobile app, this is true
  // We use this to conditionally load/strip the header and footer
  const mobileApp = user.data.isMobile;

  return (
    <HelmetProvider>
      <ThemeProvider theme={themesLookup[theme]}>
        <GlobalStyles />
        {!mobileApp && <Header />}
        <Alerts />
        <ApplicationMessages />
        <ContentWrapper>
          <Location>
            {({ location }) => (
              <PageGridWrapper key={location.key}>
                {ReactGA.pageview(location.pathname + location.search + location.hash)}
                <AnimatePresence exitBeforeEnter>
                  <Router>
                    <RouterPage default pageComponent={<PageNotFound />} />
                    <EmployeeRouter path={Routes.Routes().employee.path + '/*'} />
                    <StudentRouter path={Routes.Routes().student.path + '/*'} />
                    <RouterPage path={Routes.Routes().profile.path} pageComponent={<Profile />} />
                    <RouterPage path={Routes.Routes().about.path} pageComponent={<About />} />
                    <RouterPage path={Routes.Routes().search.path} pageComponent={<Search />} />
                    <RouterPage
                      path={Routes.Routes().notifications.path}
                      pageComponent={<Notifications />}
                    />
                    {process.env.REACT_APP_EXPERIMENTAL === 'true' && (
                      <RouterPage path="covid" pageComponent={<MobileCovid />} />
                    )}
                  </Router>
                </AnimatePresence>
              </PageGridWrapper>
            )}
          </Location>
        </ContentWrapper>
        {!mobileApp && <Footer />}
      </ThemeProvider>
      {user.data.isAdmin && user.data.devTools && <ReactQueryDevtools initialIsOpen={false} />}
    </HelmetProvider>
  );
};

export default App;
