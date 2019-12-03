import React from 'react';
import { faDollarSign } from '@fortawesome/pro-light-svg-icons';
import PageTitle from '../ui/PageTitle';
import ResourcesCard from '../features/ResourcesCard';
import AnnouncementContainer from '../ui/AnnouncementContainer';
import FinancialTransactions from '../features/FinancialTransactions';
import FinancialOverview from '../features/financial-overview/FinancialOverview';
import { MainGridWrapper, Masonry } from '../theme';

const Finances = () => {
  return (
    <>
      <MainGridWrapper data-testid="finances-page">
        <PageTitle title="Finances" />
        <Masonry>
          <FinancialOverview />
          <ResourcesCard categ="financial" icon={faDollarSign} />
          <FinancialTransactions />
        </Masonry>
      </MainGridWrapper>
      <AnnouncementContainer data-testid="finances-announcements" page="finances" />
    </>
  );
};

export default Finances;
