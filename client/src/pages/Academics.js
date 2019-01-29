import React from 'react';
import PageTitle from '../ui/PageTitle';
import Courses from '../features/Courses';

const Academics = () => {
  return (
    <div data-testid="academics-page">
      <PageTitle title="Academics" />
      <Courses />
    </div>
  );
};

export default Academics;
