import React, { useContext, useState, useEffect } from 'react';
import { faGraduationCap } from '@fortawesome/pro-light-svg-icons';

import { UserContext } from '../../App';
import { useAnnouncements } from '../../api/announcements';
import { hasAudience } from '../../api/user';

import Courses from '../../features/Courses';
import AnnouncementContainer from '../../ui/AnnouncementContainer';
import { MainGridWrapper, MainGrid, MainGridCol, SecondGridWrapper } from '../../ui/PageGrid';
import PlannerItems from '../../features/PlannerItems';
import AcademicCalendar from '../../features/AcademicCalendar';
import PageTitle, { Title } from '../../ui/PageTitle';
import AcademicOverview from '../../features/AcademicOverview';
import ResourcesCard from '../../features/ResourcesCard';
import { AcademicSubNav } from './AcademicsSubNav';

const AcademicsDashboard = () => {
  /**
   * The following code was lifted from the announcement container. I'm pretty sure this works, but it does
   * seem very redundant to have this code in two places being called twice. but this is the only way I 
   * knew how to get the events length, was to call it here. which means i probably could remove it from
   * the other file
   */

  const [events, setEvents] = useState<any>([]);
  const user = useContext<any>(UserContext);
  const announcements = useAnnouncements('academic');
  
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
    <>
      <MainGridWrapper>
        <PageTitle title="Academics" />
        <AcademicSubNav />
        <MainGrid data-testid="academics-dashboard">
          <MainGridCol>
            <AcademicOverview />
            <PlannerItems />
            <Courses />
          </MainGridCol>
          <MainGridCol>
            <ResourcesCard categ="academic" icon={faGraduationCap} />
            <AcademicCalendar />
          </MainGridCol>
        </MainGrid>
      </MainGridWrapper>
      <SecondGridWrapper>
        {events.length > 0 && (
          <>
          <Title as="h2">Announcements</Title>
          <AnnouncementContainer className="col-span-2" type="academic" />
          </>
        )}
      </SecondGridWrapper>
    </>
  );
};

export default AcademicsDashboard;
