import React from 'react';
import PageTitle from '../ui/PageTitle';
import OSUProfile from '../features/profile/OSUProfile';
import PageGrid from '../ui/PageGrid';

const Profile = () => (
  <div data-testid="profile-page">
    <PageTitle title="My Profile" />
    <PageGrid>
      <OSUProfile />
    </PageGrid>
  </div>
);

export default Profile;
