import React, { useEffect } from 'react';
import { faDollarSign } from '@fortawesome/pro-light-svg-icons';
import PageTitle from '../ui/PageTitle';
import ResourcesCard from '../features/ResourcesCard';
import AnnouncementContainer from '../ui/AnnouncementContainer';
import FinancialTransactions from '../features/FinancialTransactions';
import FinancialOverview from '../features/financial-overview/FinancialOverview';
import { MainGridWrapper, Masonry } from 'src/ui/grid';
import { useRecoilValue, useRecoilState } from 'recoil';
import { DynamicCard } from 'src/ui/Card/variants/DynamicCard';
import { Routes } from '@osu-wams/utils';
import { State } from '@osu-wams/hooks';

const { filteredCards, ANNOUNCEMENT_PAGES, dashboardState } = State;

const Finances = () => {
  const cards = useRecoilValue(filteredCards('Finances'));
  const [dashboard, setDashboardState] = useRecoilState(dashboardState);

  useEffect(() => {
    if (
      dashboard.affiliation !== Routes.Dashboards.student ||
      dashboard.navigateTo.indexOf(Routes.Routes().finances.path) < 0
    ) {
      setDashboardState({
        affiliation: Routes.Dashboards.student,
        navigateTo: Routes.Routes().finances.fullPath,
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
