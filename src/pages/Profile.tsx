import React from 'react';
import PageTitle from '../ui/PageTitle';
import OSUProfile from '../features/profile/OSUProfile';
import { MainGridWrapper, MainGrid } from '../ui/PageGrid';

const Profile = () => (
  <MainGridWrapper data-testid="profile-page">
    <PageTitle title="My Profile" />
    <MainGrid>
      <OSUProfile />
    </MainGrid>
  </MainGridWrapper>
);

export default Profile;
