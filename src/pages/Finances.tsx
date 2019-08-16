import React from 'react';
import { faDollarSign } from '@fortawesome/pro-light-svg-icons';
import PageTitle from '../ui/PageTitle';
import ResourcesCard from '../features/ResourcesCard';
import AnnouncementContainer from '../ui/AnnouncementContainer';
import FinancialTransactions from '../features/FinancialTransactions';
import { HighlightsCard } from '../ui/Highlights';
import AccountBalance from '../features/AccountBalance';
import MealPlans from '../features/MealPlans';
import PageGrid from '../ui/PageGrid';

const Finances = () => {
  return (
    <div data-testid="finances-page">
      <PageTitle title="Financial Information" />
      <PageGrid>
        <FinancialTransactions />
        <HighlightsCard className="row-span-1">
          <AccountBalance />
          <MealPlans />
        </HighlightsCard>
        <ResourcesCard categ="financial" icon={faDollarSign} />
        <AnnouncementContainer className="col-span-2" type="financial" />
      </PageGrid>
    </div>
  );
};

export default Finances;
