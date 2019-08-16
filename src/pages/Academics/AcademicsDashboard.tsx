import React from 'react';
import Courses from '../../features/Courses';
import AnnouncementContainer from '../../ui/AnnouncementContainer';
import PageGrid from '../../ui/PageGrid';
import PlannerItems from '../../features/PlannerItems';
import AcademicCalendar from '../../features/AcademicCalendar';
import ResourcesCard from '../../features/ResourcesCard';

const AcademicsDashboard = () => {
  return (
    <PageGrid>
      <Courses />
      <PlannerItems />
      <AcademicCalendar />
      <ResourcesCard categ="academic" />
      <AnnouncementContainer className="col-span-2" type="academic" />
    </PageGrid>
  );
};

export default AcademicsDashboard;
