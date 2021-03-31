import React, { useEffect } from 'react';
import { faDollarSign } from '@fortawesome/pro-light-svg-icons';
import PageTitle from '../ui/PageTitle';
import ResourcesCard from '../features/ResourcesCard';
import AnnouncementContainer from '../ui/AnnouncementContainer';
import FinancialTransactions from '../features/FinancialTransactions';
import FinancialOverview from '../features/financial-overview/FinancialOverview';
import { MainGridWrapper, Masonry } from '../theme';
import { filteredCards } from 'src/state';
import { useRecoilValue, useRecoilState } from 'recoil';
import { DynamicCard } from 'src/ui/Card/variants/DynamicCard';
import { ANNOUNCEMENT_PAGES } from 'src/state/announcements';
import { dashboardState } from 'src/state/application';
import { Routes, Dashboards } from 'src/routers';

const Finances = () => {
  const cards = useRecoilValue(filteredCards('Finances'));
  const [dashboard, setDashboardState] = useRecoilState(dashboardState);

  useEffect(() => {
    if (
      dashboard.affiliation !== Dashboards.student ||
      dashboard.navigateTo.indexOf(Routes().finances.path) < 0
    ) {
      setDashboardState({
        affiliation: Dashboards.student,
        navigateTo: Routes().finances.fullPath,
      });
    }
  }, []);
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
      <AnnouncementContainer
        data-testid="finances-announcements"
        page={ANNOUNCEMENT_PAGES.finances}
      />
    </>
  );
};

export default Finances;
