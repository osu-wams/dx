import { Router } from '@reach/router';
import React from 'react';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Academics from '../pages/Academics';
import Finances from '../pages/Finances';
import Resources from '../pages/Resources';
import { useResetScroll } from 'src/util/useResetScroll';
import { RouterPage } from '.';
import PageNotFound from 'src/pages/PageNotFound';

export const Student = () => {
  useResetScroll();
  return (
    <Router basepath="/student" key="student-dashboard" className="router-styles">
      <RouterPage default pageComponent={<PageNotFound />} />
      <RouterPage path="/" pageComponent={<Dashboard />} />
      <RouterPage path="profile" pageComponent={<Profile />} />
      <RouterPage path="academics/*" pageComponent={<Academics />} />
      <RouterPage path="finances" pageComponent={<Finances />} />
      <RouterPage path="resources" pageComponent={<Resources />} />
    </Router>
  );
};

export default Student;
