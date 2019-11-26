import React from 'react';
import { faDollarSign } from '@fortawesome/pro-light-svg-icons';
import PageTitle from '../ui/PageTitle';
import ResourcesCard from '../features/ResourcesCard';
import AnnouncementContainer from '../ui/AnnouncementContainer';
import FinancialTransactions from '../features/FinancialTransactions';
import FinancialOverview from '../features/financial-overview/FinancialOverview';
import { MainGridWrapper, MainGrid, MainGridCol } from '../ui/PageGrid';

const Finances = () => {
  return (
    <>
      <MainGridWrapper data-testid="finances-page">
        <PageTitle title="Finances" />
        <MainGrid>
          <MainGridCol>
            <FinancialOverview />
            <FinancialTransactions />
          </MainGridCol>
          <MainGridCol>
            <ResourcesCard categ="financial" icon={faDollarSign} />
          </MainGridCol>
        </MainGrid>
      </MainGridWrapper>
      <AnnouncementContainer data-testid="finances-announcements" page="finances" />
    </>
  );
};

export default Finances;
