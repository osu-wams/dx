import React from 'react';
import Courses from '../../features/Courses';
import AnnouncementContainer from '../../ui/AnnouncementContainer';
import PageGrid from '../../ui/PageGrid';

const AcademicsDashboard = () => {
  return (
    <PageGrid>
      <Courses />
      <AnnouncementContainer className="col-span-2" type="academic" />
    </PageGrid>
  );
};

export default AcademicsDashboard;
