import { Router } from '@reach/router';
import React from 'react';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Academics from '../pages/Academics';
import Finances from '../pages/Finances';
import Resources from '../pages/Resources';
import { useResetScroll } from 'src/hooks/useResetScroll';
import { RouterPage, Routes } from '.';
import PageNotFound from 'src/pages/PageNotFound';

export const Student = () => {
  useResetScroll();
  return (
    <Router basepath={Routes().student.fullPath} key="student-dashboard" className="router-styles">
      <RouterPage default pageComponent={<PageNotFound />} />
      <RouterPage path="/" pageComponent={<Dashboard />} />
      <RouterPage path={Routes().profile.path} pageComponent={<Profile />} />
      <RouterPage path={Routes().academics.path + '/*'} pageComponent={<Academics />} />
      <RouterPage path={Routes().finances.path} pageComponent={<Finances />} />
      <RouterPage path={Routes().resources.path} pageComponent={<Resources />} />
    </Router>
  );
};

export default Student;
