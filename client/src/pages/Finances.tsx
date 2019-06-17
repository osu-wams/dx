import React from 'react';
import styled from 'styled-components';
import PageTitle from '../ui/PageTitle';
import ResourcesCard from '../features/ResourcesCard';
import AnnouncementContainer from '../ui/AnnouncementContainer';
import StudentJobs from '../features/StudentJobs';
import { HighlightsCard } from '../ui/Highlights';
import AccountBalance from '../features/AccountBalance';
import MealPlans from '../features/MealPlans';
import PageGrid from '../ui/PageGrid';

const Finances = () => {
  return (
    <div data-testid="finances-page">
      <PageTitle title="Financial Information" />
      <PageGrid>
        <StudentJobs />
        <HighlightsCard className="row-span-1">
          <AccountBalance />
          <MealPlans />
        </HighlightsCard>
        <ResourcesCard categ="financial" />
        <AnnouncementContainer className="col-span-2" type="financial" />
      </PageGrid>
    </div>
  );
};

export default Finances;
