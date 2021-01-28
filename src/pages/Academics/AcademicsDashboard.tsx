import React from 'react';
import { faGraduationCap } from '@fortawesome/pro-light-svg-icons';
import Courses from 'src/features/Courses';
import AnnouncementContainer from 'src/ui/AnnouncementContainer';
import { MainGridWrapper, Masonry } from 'src/theme';
import PlannerItems from 'src/features/PlannerItems';
import AcademicCalendar from 'src/features/AcademicCalendar';
import PageTitle from 'src/ui/PageTitle';
import AcademicOverview from 'src/features/AcademicOverview';
import ResourcesCard from 'src/features/ResourcesCard';
import { AcademicSubNav } from './AcademicsSubNav';
import { AcademicProgram } from 'src/features/AcademicProgram';
import { filteredCards } from 'src/state';
import { useRecoilValue } from 'recoil';
import { DynamicCard } from 'src/ui/Card/variants/DynamicCard';
import useCourseScheduleState from 'src/hooks/useCourseScheduleState';
import { ANNOUNCEMENT_PAGES } from 'src/state/announcements';

const AcademicsDashboard = () => {
  const cards = useRecoilValue(filteredCards('Academics'));
  useCourseScheduleState();

  return (
    <>
      <MainGridWrapper data-testid="academics-dashboard">
        <PageTitle title="Academics" />
        <AcademicSubNav />
        <Masonry>
          <AcademicOverview />
          <ResourcesCard categ="academic" icon={faGraduationCap} />
          <AcademicProgram />
          <PlannerItems />
          <Courses />
          <AcademicCalendar />
          {cards.map((c) => (
            <DynamicCard key={c.id} data={c} />
          ))}
        </Masonry>
      </MainGridWrapper>
      <AnnouncementContainer
        data-testid="academics-announcements"
        page={ANNOUNCEMENT_PAGES.academics}
      />
    </>
  );
};

export default AcademicsDashboard;
