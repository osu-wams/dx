import React from 'react';
import { State } from '@osu-wams/hooks';
import { MainGridWrapper, Masonry } from 'src/ui/grid';
import { useRecoilValue } from 'recoil';
import BeaverhubCard from 'src/features/BeaverhubCard';

const { ANNOUNCEMENT_PAGES, filteredCards } = State;

const StudentDashboard = () => {
  const cards = useRecoilValue(filteredCards('Dashboard'));

  return (
    <>
      <MainGridWrapper data-testid="student-dashboard-page">
        <BeaverhubCard />
      </MainGridWrapper>
    </>
  );
};

export { StudentDashboard };
