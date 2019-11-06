import React from 'react';
import PageTitle from '../ui/PageTitle';
import OSUProfile from '../features/profile/OSUProfile';
import Settings from '../features/profile/Settings';
import { MainGridWrapper, MainGrid, MainGridCol } from '../ui/PageGrid';

const Profile = () => (
  <div data-testid="profile-page">
    <MainGridWrapper>
      <PageTitle title="My Profile" />
      <MainGrid>
        <MainGridCol>
          <OSUProfile />
        </MainGridCol>
        <MainGridCol>
          <Settings />
        </MainGridCol>
      </MainGrid>
    </MainGridWrapper>
  </div>
);

export default Profile;
