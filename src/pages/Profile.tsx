import React from 'react';
import PageTitle from '../ui/PageTitle';
import OSUProfile from '../features/profile/OSUProfile';
import Settings from '../features/profile/Settings';
import { MainGridWrapper, Masonry } from '../theme';

const Profile = () => (
  <div data-testid="profile-page">
    <MainGridWrapper>
      <PageTitle title="My Profile" />
      <Masonry>
        <OSUProfile />
        <Settings />
      </Masonry>
    </MainGridWrapper>
  </div>
);

export default Profile;
