import React from 'react';
import PageTitle from '../ui/PageTitle';
import OSUProfile from '../features/profile/OSUProfile';
import { MainGridWrapper, MainGrid } from '../ui/PageGrid';

const Profile = () => (
  <div data-testid="profile-page">
    <MainGridWrapper>
      <PageTitle title="My Profile" />
      <MainGrid>
        <OSUProfile />
      </MainGrid>
    </MainGridWrapper>
  </div>
);

export default Profile;
