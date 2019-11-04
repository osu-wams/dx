import React from 'react';
import { faDollarSign } from '@fortawesome/pro-light-svg-icons';
import PageTitle from '../ui/PageTitle';
import ResourcesCard from '../features/ResourcesCard';
import AnnouncementContainer from '../ui/AnnouncementContainer';
import FinancialTransactions from '../features/FinancialTransactions';
import FinancialOverview from '../features/financial-overview/FinancialOverview';
import { MainGridWrapper, MainGrid, MainGridCol, SecondGridWrapper } from '../ui/PageGrid';

const Finances = () => {
  return (
    <div data-testid="finances-page">
      <MainGridWrapper>
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
      <SecondGridWrapper>
        <AnnouncementContainer
          data-testid="finances-announcements"
          className="col-span-2"
          page="finances"
        />
      </SecondGridWrapper>
    </div>
  );
};

export default Finances;
