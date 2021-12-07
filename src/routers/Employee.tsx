import { Routes as Router, Route } from 'react-router-dom';
import React from 'react';
import { Routes } from '@osu-wams/utils';
import Dashboard from '../pages/Dashboard';
import Training from '../pages/Training';
import Resources from '../pages/Resources';
import { useResetScroll } from 'src/hooks/useResetScroll';
import PageNotFound from 'src/pages/PageNotFound';

export const Employee = () => {
  useResetScroll();
  return (
    <Router key="employee-dashboard">
      <Route path="*" element={<PageNotFound />} />
      <Route path="/" element={<Dashboard />} />
      <Route path={Routes.Routes().resources.path} element={<Resources />} />
      <Route path={Routes.Routes().trainings.path} element={<Training />} />
    </Router>
  );
};

export default Employee;
