import React from 'react';
import { faDollarSign } from '@fortawesome/pro-light-svg-icons';
import PageTitle from '../ui/PageTitle';
import ResourcesCard from '../features/ResourcesCard';
import AnnouncementContainer from '../ui/AnnouncementContainer';
import FinancialTransactions from '../features/FinancialTransactions';
import FinancialOverview from '../features/financial-overview/FinancialOverview';
import { MainGridWrapper, Masonry } from '../theme';
import { filteredCards } from 'src/state/application';
import { useRecoilValue } from 'recoil';
import { DynamicCard } from 'src/ui/Card/variants/DynamicCard';

const Finances = () => {
  const cards = useRecoilValue(filteredCards('Finances'));

  return (
    <>
      <MainGridWrapper data-testid="finances-page">
        <PageTitle title="Finances" />
        <Masonry>
          <FinancialOverview />
          <ResourcesCard categ="financial" icon={faDollarSign} />
          <FinancialTransactions />
          {cards.map((c) => (
            <DynamicCard key={c.id} data={c} />
          ))}
        </Masonry>
      </MainGridWrapper>
      <AnnouncementContainer data-testid="finances-announcements" page="finances" />
    </>
  );
};

export default Finances;
