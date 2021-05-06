import { Router } from '@reach/router';
import React from 'react';
import { Routes } from '@osu-wams/utils';
import Dashboard from '../pages/Dashboard';
import Training from '../pages/Training';
import Resources from '../pages/Resources';
import { useResetScroll } from 'src/hooks/useResetScroll';
import { RouterPage } from '.';
import PageNotFound from 'src/pages/PageNotFound';

export const Employee = () => {
  useResetScroll();
  return (
    <Router
      basepath={Routes.Routes().employee.fullPath}
      key="employee-dashboard"
      className="router-styles"
    >
      <RouterPage default pageComponent={<PageNotFound />} />
      <RouterPage path="/" pageComponent={<Dashboard />} />
      <RouterPage path={Routes.Routes().resources.path} pageComponent={<Resources />} />
      <RouterPage path={Routes.Routes().trainings.path} pageComponent={<Training />} />
    </Router>
  );
};

export default Employee;
