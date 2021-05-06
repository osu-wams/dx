import { Router } from '@reach/router';
import React from 'react';
import { Routes } from '@osu-wams/utils';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Academics from '../pages/Academics';
import Finances from '../pages/Finances';
import Resources from '../pages/Resources';
import { useResetScroll } from 'src/hooks/useResetScroll';
import { RouterPage } from '.';
import PageNotFound from 'src/pages/PageNotFound';

export const Student = () => {
  useResetScroll();
  return (
    <Router
      basepath={Routes.Routes().student.fullPath}
      key="student-dashboard"
      className="router-styles"
    >
      <RouterPage default pageComponent={<PageNotFound />} />
      <RouterPage path="/" pageComponent={<Dashboard />} />
      <RouterPage path={Routes.Routes().profile.path} pageComponent={<Profile />} />
      <RouterPage path={Routes.Routes().academics.path + '/*'} pageComponent={<Academics />} />
      <RouterPage path={Routes.Routes().finances.path} pageComponent={<Finances />} />
      <RouterPage path={Routes.Routes().resources.path} pageComponent={<Resources />} />
    </Router>
  );
};

export default Student;
