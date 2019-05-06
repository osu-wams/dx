import React from 'react';
import Courses from '../../features/Courses';
import AnnouncementContainer from '../../ui/AnnouncementContainer';

const AcademicsDashboard = () => {
  return (
    <>
      <Courses />
      <AnnouncementContainer type="academic" />
    </>
  );
};

export default AcademicsDashboard;
