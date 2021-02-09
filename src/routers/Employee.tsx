import { Router } from '@reach/router';
import React from 'react';
import Dashboard from '../pages/Dashboard';
import Training from '../pages/Training';
import Resources from '../pages/Resources';
import { useResetScroll } from 'src/util/useResetScroll';
import { RouterPage } from '.';
import PageNotFound from 'src/pages/PageNotFound';

export const Employee = () => {
  useResetScroll();
  return (
    <Router basepath="/employee" key="employee-dashboard" className="router-styles">
      <RouterPage default pageComponent={<PageNotFound />} />
      <RouterPage path="/" pageComponent={<Dashboard />} />
      <RouterPage path="resources" pageComponent={<Resources />} />
      <RouterPage path="training" pageComponent={<Training />} />
    </Router>
  );
};

export default Employee;
