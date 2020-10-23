import React from 'react';
import PageTitle from '../ui/PageTitle';
import OSUProfile from '../features/profile/OSUProfile';
import { AdminSettings } from 'src/features/profile/AdminSettings';
import Settings from '../features/profile/Settings';
import { MainGridWrapper, Masonry } from '../theme';
import { useRecoilValue } from 'recoil';
import { userState } from 'src/state/application';

const Profile = () => {
  const user = useRecoilValue(userState);

  return (
    <div data-testid="profile-page">
      <MainGridWrapper>
        <PageTitle title="My Profile" />
        <Masonry>
          <OSUProfile />
          <Settings />
          {user.data.isAdmin && <AdminSettings />}
        </Masonry>
      </MainGridWrapper>
    </div>
  );
};

export default Profile;
