import React, { useContext, useState, useEffect } from 'react';
import { faDollarSign } from '@fortawesome/pro-light-svg-icons';

import { UserContext } from '../App';
import { useAnnouncements } from '../api/announcements';
import { hasAudience } from '../api/user';

import PageTitle, { Title } from '../ui/PageTitle';
import ResourcesCard from '../features/ResourcesCard';
import AnnouncementContainer from '../ui/AnnouncementContainer';
import FinancialTransactions from '../features/FinancialTransactions';
import FinancialOverview from '../features/financial-overview/FinancialOverview';
import { MainGridWrapper, MainGrid, MainGridCol, SecondGridWrapper } from '../ui/PageGrid';

const Finances = () => {

  /**
   * The following code was lifted from the announcement container. I'm pretty sure this works, but it does
   * seem very redundant to have this code in two places being called twice. but this is the only way I 
   * knew how to get the events length, was to call it here. which means i probably could remove it from
   * the other file
   */

  const [events, setEvents] = useState<any>([]);
  const user = useContext<any>(UserContext);
  const announcements = useAnnouncements('financial');
  
  /* eslint-disable react-hooks/exhaustive-deps */
  // Fetch data on load
  useEffect(() => {
    let announcementsToUse: any[] = [];

    if (!user.loading && !announcements.loading) {
      announcementsToUse = announcements.data.filter(announcement =>
        hasAudience(user.data, announcement)
      );
    }
    setEvents(announcementsToUse);
  }, [announcements.data, announcements.loading, user.data, user.loading]);
  /* eslint-enable react-hooks/exhaustive-deps */

  console.log(events.length)

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
      {events.length > 0 && (
          <>
          <Title as="h2">Announcements</Title>
          <AnnouncementContainer className="col-span-2" type="financial" />
          </>
        )}
      </SecondGridWrapper>
    </div>
  );
};

export default Finances;
