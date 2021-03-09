import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { User } from '@osu-wams/lib';
import { dashboardState, userState } from 'src/state/application';
import { changeAffiliation } from 'src/util/user';

export const useDashboardState = () => {
  const [dashboard, setDashboard] = useRecoilState(dashboardState);
  const user = useRecoilValue(userState);

  useEffect(() => {
    if (!user.loading) {
      console.log('useDashboardState#useEffect', dashboard, user);
      console.log(User.getAffiliation(user.data));
      const currentAffiliation = User.getAffiliation(user.data);
      const { affiliation, navigateTo } = dashboard;
      if (currentAffiliation !== affiliation) {
        changeAffiliation(affiliation, user, navigateTo);
      }
    }
  }, [dashboard]);

  return { dashboard, setDashboard };
};

export default useDashboardState;
