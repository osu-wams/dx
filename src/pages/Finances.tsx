import React from 'react';
import PageTitle from '../ui/PageTitle';
import ResourcesCard from '../features/ResourcesCard';
import AnnouncementContainer from '../ui/AnnouncementContainer';
import { HighlightsCard } from '../ui/Highlights';
import AccountBalance from '../features/AccountBalance';
import MealPlans from '../features/MealPlans';
import PageGrid from '../ui/PageGrid';
import { Color } from '../theme';

const Finances = () => {
  return (
    <div data-testid="finances-page">
      <PageTitle title="Financial Information" />
      <PageGrid>
        <HighlightsCard className="row-span-1">
          <AccountBalance />
          <MealPlans />
        </HighlightsCard>
        <ResourcesCard categ="financial" color={Color['pine-400']} />
        <AnnouncementContainer className="col-span-2" type="financial" />
      </PageGrid>
    </div>
  );
};

export default Finances;
