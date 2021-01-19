import React, { useEffect, useRef, useState } from 'react';
import Loadable, { LoadableComponent } from 'react-loadable';
import { HelmetProvider } from 'react-helmet-async';
import { Router, Location, navigate, RouteComponentProps } from '@reach/router';
import styled, { ThemeProvider } from 'styled-components/macro';
import { AnimatePresence } from 'framer-motion';
import ReactGA from 'react-ga';
import Header from './ui/Header';
import Alerts from './features/Alerts';
import Footer from './ui/Footer';
import {
  Constants,
  useInfoButtons,
  useUser,
  usePlannerItems,
  useCards,
  useResources,
} from '@osu-wams/hooks';
import { themesLookup } from './theme/themes';
import { GlobalStyles } from './theme';
import {
  userState,
  themeState,
  infoButtonState,
  plannerItemState,
  dynamicCardState,
  resourceState,
} from './state';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { User, Types } from '@osu-wams/lib';
import { ReactQueryDevtools } from 'react-query-devtools/dist/react-query-devtools.production.min';
import { ApplicationMessages } from 'src/ui/ApplicationMessages';
import { RouterPage } from './routers';
import Profile from './pages/Profile';
import About from './pages/About';
import Notifications from './pages/Notifications';
import PageNotFound from './pages/PageNotFound';
import MobileCovid from './pages/mobile-app/MobileCovid';
import { useApplicationMessages } from './util/useApplicationMessages';
import { changeAffiliation } from './util/user';
import { WARN_STUDENT_ACCESS_EMPLOYEE_DASHBOARD } from './state/messages';

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

const EmployeeRouter = Loadable({
  loader: () => import('./routers/Employee'),
  loading: Loading,
  delay: 200,
}) as React.FunctionComponent<RouteComponentProps> & LoadableComponent;

const StudentRouter = Loadable({
  loader: () => import('./routers/Student'),
  loading: Loading,
  delay: 200,
}) as React.FunctionComponent<RouteComponentProps> & LoadableComponent;

const App = (props: AppProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [initialRoute, setInitialRoute] = useState<string | undefined>();
  const [user, setUser] = useRecoilState<Types.UserState>(userState);
  const [theme, setTheme] = useRecoilState<string>(themeState);
  const [infoButtonData, setInfoButtonData] = useRecoilState(infoButtonState);
  const [plannerItemData, setPlannerItemData] = useRecoilState(plannerItemState);
  const setCards = useSetRecoilState(dynamicCardState);
  const setResources = useSetRecoilState(resourceState);
  const containerElementRef = useRef(props.containerElement);
  const { addMessage } = useApplicationMessages();
  const cardsHook = useCards();
  const resHook = useResources();
  const userHook = useUser();
  const infoButtons = useInfoButtons();
  const plannerItems = usePlannerItems({
    ...Constants.REACT_QUERY_DEFAULT_CONFIG,
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
        // This hook needs to reach into the UserState and call the underlying
        // setter on the user object rather than the `setUser` on the
        // recoil state itself.
        user.setUser!((prevUser) => ({
          ...prevUser,
          isCanvasOptIn: false,
          data: { ...prevUser.data, isCanvasOptIn: false },
        }));
      }
    },
  });

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
    if (cardsHook.isSuccess && cardsHook.data) {
      setCards({
        data: cardsHook.data,
        isLoading: cardsHook.isLoading,
        isSuccess: cardsHook.isSuccess,
      });
    }
  }, [cardsHook.data, cardsHook.isSuccess]);

  useEffect(() => {
    if (resHook.isSuccess && resHook.data) {
      setResources({
        data: resHook.data,
        isLoading: resHook.isLoading,
        isSuccess: resHook.isSuccess,
        isError: resHook.isError,
      });
    }
  }, [resHook.data, resHook.isSuccess]);

  /**
   * User Bootstrap for User setup
   */
  useEffect(() => {
    if (!userHook.loading && userHook.data !== user.data) {
      setUser(userHook);
    }
    if (!userHook.loading && !userHook.error && userHook.data.osuId) {
      const userSetDashboard = User.getAffiliation(userHook.data).toLowerCase();
      const { pathname } = window.location;
      // Visiting root of the application which should be a dashboard overview (/student or /employee), redirect
      // user to the dashboard they were last one or what matches their primaryAffiliation, set application loaded to
      // make it visible
      if (pathname === '/') {
        navigate(`/${userSetDashboard}`);
        setIsLoaded(true);
      } else {
        const onStudentDashboard = pathname.toLowerCase().startsWith('/student');
        const onEmployeeDashboard = pathname.toLowerCase().startsWith('/employee');
        // Visiting any route that doesn't start with /student or /employee just loads the application
        if (!onStudentDashboard && !onEmployeeDashboard) {
          setIsLoaded(true);
        } else {
          // User is a student (non-employee type) visiting an employee dashboard link, redirect them to the student dashboard
          if (!User.isEmployee(userHook.data) && onEmployeeDashboard) {
            addMessage(WARN_STUDENT_ACCESS_EMPLOYEE_DASHBOARD);
            navigate('/student');
            setIsLoaded(true);
          } else {
            // changeAffiliation to match the dashboard they are attempting to visit, which will cause the effect to re-run
            // and finally be handled the by the last else-statement to setIsLoaded(true)
            if (userSetDashboard !== 'student' && onStudentDashboard) {
              changeAffiliation('student', userHook);
            } else if (userSetDashboard !== 'employee' && onEmployeeDashboard) {
              changeAffiliation('employee', userHook);
            } else {
              // The user is visiting the dashboard matching thier setting, the application is ready for rendering
              if (initialRoute && initialRoute !== '/') {
                navigate(initialRoute);
              }
              setIsLoaded(true);
            }
          }
        }
      }
    }
  }, [userHook.data, userHook.loading, userHook.error, initialRoute]);

  // After userHook useEffect resolves the user and dashboard context, it tells the app to become visible
  useEffect(() => {
    if (isLoaded) {
      containerElementRef.current.style.opacity = '1';
      setInitialRoute(undefined);
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

    setInitialRoute(window.location.pathname);
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
                    <EmployeeRouter path="employee/*" />
                    <StudentRouter path="student/*" />
                    <RouterPage path="profile" pageComponent={<Profile />} />
                    <RouterPage path="about" pageComponent={<About />} />
                    <RouterPage path="notifications" pageComponent={<Notifications />} />
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
