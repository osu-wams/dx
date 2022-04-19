import React from 'react';
import { faStars } from '@fortawesome/pro-light-svg-icons';
import { State } from '@osu-wams/hooks';
import PageTitle from 'src/ui/PageTitle';
import EventCardContainer from 'src/ui/EventCardContainer';
import { MainGridWrapper, Masonry } from 'src/ui/grid';
import ResourcesCard from 'src/features/ResourcesCard';
import { EmployeeTools } from 'src/features/employee-only';
import { ITSystemStatus } from 'src/features/it-systems-status/ITSystemStatus';
import { FavoriteResources } from 'src/features/FavoriteResources';
import { SuccessFactors } from 'src/features/SuccessFactors';
import { TrendingResources } from 'src/features/TrendingResources';
import { FeaturedTrainingsCard } from 'src/features/training/FeaturedTrainingsCard';
import { useRecoilValue } from 'recoil';
import { DynamicCard } from 'src/ui/Card/variants/DynamicCard';

const { ANNOUNCEMENT_PAGES, filteredCards } = State;

const EmployeeDashboard = () => {
  const cards = useRecoilValue(filteredCards('Dashboard'));

  return (
    <>
      <MainGridWrapper data-testid="employee-dashboard-page">
        <PageTitle title="Overview" />
        <Masonry>
          <EmployeeTools />
          <FavoriteResources />
          <SuccessFactors />
          <ResourcesCard categ="employee_featured" icon={faStars} />
          <ITSystemStatus />
          <FeaturedTrainingsCard />
          <TrendingResources />
          {cards.map((c) => (
            <DynamicCard key={c.id} data={c} />
          ))}
        </Masonry>
      </MainGridWrapper>
      <EventCardContainer page={ANNOUNCEMENT_PAGES.dashboard} />
    </>
  );
};

export { EmployeeDashboard };
