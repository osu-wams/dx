import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { User } from '@osu-wams/lib';
import { useUser } from '@osu-wams/hooks';
import { dashboardState, initialRouteState, isLoadedState, userState } from 'src/state/application';
import { changeAffiliation } from 'src/util/user';
import { useApplicationMessages } from 'src/hooks/useApplicationMessages';
import { navigate } from '@reach/router';
import { WARN_STUDENT_ACCESS_EMPLOYEE_DASHBOARD } from 'src/state/messages';

export const useUserState = () => {
  const userHook = useUser();
  const { addMessage } = useApplicationMessages();
  const [dashboard, setDashboard] = useRecoilState(dashboardState);
  const setIsLoaded = useSetRecoilState(isLoadedState);
  const [user, setUser] = useRecoilState(userState);
  const initialRoute = useRecoilValue(initialRouteState);

  useEffect(() => {
    if (!user.loading) {
      const currentAffiliation = User.getAffiliation(user.data);
      const { affiliation, navigateTo } = dashboard;
      if (currentAffiliation !== affiliation) {
        changeAffiliation(affiliation, user, navigateTo);
      }
    }
  }, [dashboard]);

  /**
   * User Bootstrap for User setup
   */
  useEffect(() => {
    if (!userHook.loading && userHook.data !== user.data) {
      setUser(userHook);
    }
    if (!userHook.loading && !userHook.error && userHook.data.osuId) {
      const userSetDashboard = User.getAffiliation(userHook.data).toLowerCase();
      const { pathname, search } = window.location;

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
              setDashboard({ affiliation: 'student', navigateTo: `${pathname}${search}` });
            } else if (userSetDashboard !== 'employee' && onEmployeeDashboard) {
              setDashboard({ affiliation: 'employee', navigateTo: `${pathname}${search}` });
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
};

export default useUserState;
