import React from 'react';
import { faStars } from '@fortawesome/pro-light-svg-icons';
import PageTitle from 'src/ui/PageTitle';
import EventCardContainer from 'src/ui/EventCardContainer';
import { MainGridWrapper, Masonry } from 'src/theme';
import ResourcesCard from '../../features/ResourcesCard';
import { EmployeeTools, ITSystemStatus } from '../../features/employee-only';
import { FavoriteResources } from 'src/features/FavoriteResources';
import { TrendingResources } from 'src/features/TrendingResources';

const EmployeeDashboard = () => {
  return (
    <>
      <MainGridWrapper data-testid="employee-dashboard-page">
        <PageTitle title="Overview" />
        <Masonry>
          <EmployeeTools />
          <ResourcesCard categ="employee_featured" icon={faStars} />
          <ITSystemStatus />
          <FavoriteResources />
          <TrendingResources />
        </Masonry>
      </MainGridWrapper>
      <EventCardContainer page="dashboard" />
    </>
  );
};

export { EmployeeDashboard };
