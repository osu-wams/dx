import React from 'react';
import { faStars } from '@fortawesome/pro-light-svg-icons';
import PageTitle from 'src/ui/PageTitle';
import EventCardContainer from 'src/ui/EventCardContainer';
import { MainGridWrapper, Masonry } from 'src/theme';
import ResourcesCard from 'src/features/ResourcesCard';
import { EmployeeTools } from 'src/features/employee-only';
import { ITSystemStatus } from 'src/features/it-systems-status/ITSystemStatus';
import { FavoriteResources } from 'src/features/FavoriteResources';
import { TrendingResources } from 'src/features/TrendingResources';
import { FeaturedTrainingsCard } from 'src/features/training/FeaturedTrainingsCard';
import { filteredCards } from 'src/state/application';
import { useRecoilValue } from 'recoil';
import { DynamicCard } from 'src/ui/Card/variants/DynamicCard';

const EmployeeDashboard = () => {
  const cards = useRecoilValue(filteredCards('Dashboard'));

  return (
    <>
      <MainGridWrapper data-testid="employee-dashboard-page">
        <PageTitle title="Overview" />
        <Masonry>
          <EmployeeTools />
          <FavoriteResources />
          <ITSystemStatus />
          <ResourcesCard categ="employee_featured" icon={faStars} />
          <TrendingResources />
          {process.env.REACT_APP_EXPERIMENTAL === 'true' && <FeaturedTrainingsCard />}
          {cards.map((c) => (
            <DynamicCard key={c.id} data={c} />
          ))}
        </Masonry>
      </MainGridWrapper>
      <EventCardContainer page="dashboard" />
    </>
  );
};

export { EmployeeDashboard };
