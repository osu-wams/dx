import React from 'react';
import { faStars } from '@fortawesome/pro-light-svg-icons';
import PageTitle from '../../ui/PageTitle';
import EventCardContainer from '../../ui/EventCardContainer';
import { MainGridWrapper, Masonry } from '../../theme';
import ResourcesCard from '../../features/ResourcesCard';
import { EmployeeTools, ITSystemStatus } from '../../features/employee-only';

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
          <ResourcesCard categ="employee_featured" icon={faStars} />
          <ITSystemStatus />
        </Masonry>
      </MainGridWrapper>
      <EventCardContainer page="dashboard" />
    </>
  );
};

export { EmployeeDashboard };
