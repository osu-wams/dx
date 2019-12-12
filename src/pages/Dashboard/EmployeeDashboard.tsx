import React from 'react';
import { faStars } from '@fortawesome/pro-light-svg-icons';
import PageTitle from '../../ui/PageTitle';
import EventCardContainer from '../../ui/EventCardContainer';
import { MainGridWrapper, Masonry } from '../../theme';
import ResourcesCard from '../../features/ResourcesCard';
import { EmployeeTools } from '../../features/employee-only/EmployeeTools';

const EmployeeDashboard = () => {
  return (
    <>
      <MainGridWrapper data-testid="employee-dashboard-page">
        <PageTitle
          title="Employee Dashboard"
          badge={{
            title: 'Beta',
            href: '/beta',
            eventCategory: 'beta',
            eventAction: 'Employee Dashboard Beta link clicked'
          }}
        />
        <Masonry>
          <EmployeeTools />
          <ResourcesCard categ="featured" icon={faStars} />
        </Masonry>
      </MainGridWrapper>
      <EventCardContainer page="dashboard" />
    </>
  );
};

export { EmployeeDashboard };
