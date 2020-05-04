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
import { ProgramOfStudy } from 'src/features/ProgramOfStudy';

const AcademicsDashboard = () => {
  return (
    <>
      <MainGridWrapper data-testid="academics-dashboard">
        <PageTitle title="Academics" />
        <AcademicSubNav />
        <Masonry>
          <AcademicOverview />
          <ResourcesCard categ="academic" icon={faGraduationCap} />
          <ProgramOfStudy />
          <PlannerItems />
          <Courses />
          <AcademicCalendar />
        </Masonry>
      </MainGridWrapper>
      <AnnouncementContainer data-testid="academics-announcements" page="academics" />
    </>
  );
};

export default AcademicsDashboard;
