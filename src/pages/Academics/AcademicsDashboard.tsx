import React from 'react';
import { faGraduationCap } from '@fortawesome/pro-light-svg-icons';
import Courses from '../../features/Courses';
import AnnouncementContainer from '../../ui/AnnouncementContainer';
import PageGrid from '../../ui/PageGrid';
import PlannerItems from '../../features/PlannerItems';
import AcademicCalendar from '../../features/AcademicCalendar';
import AcademicOverview from '../../features/AcademicOverview';
import ResourcesCard from '../../features/ResourcesCard';

const AcademicsDashboard = () => {
  return (
    <PageGrid data-testid="academics-dashboard">
      <Courses />
      <PlannerItems />
      <AcademicOverview />
      <AcademicCalendar />
      <ResourcesCard categ="academic" icon={faGraduationCap} />
      <AnnouncementContainer className="col-span-2" type="academic" />
    </PageGrid>
  );
};

export default AcademicsDashboard;
