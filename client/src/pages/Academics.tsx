import React from 'react';
import PageTitle from '../ui/PageTitle';
import Courses from '../features/Courses';
import { AcademicsSubNav } from '../ui/SubNav';

const Academics = () => {
  return (
    <div data-testid="academics-page">
      <PageTitle title="Academics" />
      <AcademicsSubNav />
      <Courses />
    </div>
  );
};

export default Academics;
