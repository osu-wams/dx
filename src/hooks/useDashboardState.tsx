import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { dashboardState } from 'src/state/application';

export const useDashboardState = () => {
  const [dashboard, setDashboard] = useRecoilState(dashboardState);

  useEffect(() => {
    setDashboard(dashboard);
  }, [dashboard]);

  return { dashboard, setDashboard };
};

export default useDashboardState;
