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

  const announcementType = 'academic'
  const [events, setEvents] = useState<any>([]);
  const user = useContext<any>(UserContext);
  const announcements = useAnnouncements(announcementType);
  
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
          <AnnouncementContainer className="col-span-2" type={announcementType} events={events} />
          </>
        )}
      </SecondGridWrapper>
    </>
  );
};

export default AcademicsDashboard;
