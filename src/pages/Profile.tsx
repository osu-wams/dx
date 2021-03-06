import React from 'react';
import { State } from '@osu-wams/hooks';
import PageTitle from '../ui/PageTitle';
import OSUProfile from '../features/profile/OSUProfile';
import { AdminSettings } from 'src/features/profile/AdminSettings';
import Settings from '../features/profile/Settings';
import { MainGridWrapper, Masonry } from 'src/ui/grid';
import { useRecoilValue } from 'recoil';
import { DynamicCard } from 'src/ui/Card/variants/DynamicCard';

const { filteredCards, userState } = State;

const Profile = () => {
  const user = useRecoilValue(userState);
  const cards = useRecoilValue(filteredCards('Profile'));

  return (
    <div data-testid="profile-page">
      <MainGridWrapper>
        <PageTitle title="My Profile" />
        <Masonry>
          <OSUProfile />
          <Settings />
          {user.data.isAdmin && <AdminSettings />}
          {cards.map((c) => (
            <DynamicCard key={c.id} data={c} />
          ))}
        </Masonry>
      </MainGridWrapper>
    </div>
  );
};

export default Profile;
