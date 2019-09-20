import React from 'react';
import { faDollarSign } from '@fortawesome/pro-light-svg-icons';
import PageTitle, { Title } from '../ui/PageTitle';
import ResourcesCard from '../features/ResourcesCard';
import AnnouncementContainer from '../ui/AnnouncementContainer';
import FinancialTransactions from '../features/FinancialTransactions';
import { HighlightsCard } from '../ui/Highlights';
import AccountBalance from '../features/financial-overview/AccountBalance';
import MealPlans from '../features/MealPlans';
import FinancialOverview from '../features/financial-overview/FinancialOverview';
import { MainGridWrapper, MainGrid, MainGridCol, SecondGridWrapper } from '../ui/PageGrid';


const Finances = () => {
  return (
    <div data-testid="finances-page">
      <MainGridWrapper>
        <PageTitle title="Finances" />
        <MainGrid>
          <MainGridCol>
            <HighlightsCard className="row-span-1">
              <AccountBalance />
              <MealPlans />
            </HighlightsCard>
            <FinancialTransactions />
          </MainGridCol>
          <MainGridCol>
            <ResourcesCard categ="financial" icon={faDollarSign} />
          </MainGridCol>
        </MainGrid>
      </MainGridWrapper>
      <SecondGridWrapper>
        <Title as="h2">Announcements</Title>
        <AnnouncementContainer className="col-span-2" type="financial" />
      </SecondGridWrapper>
    </div>
  );
};

export default Finances;
