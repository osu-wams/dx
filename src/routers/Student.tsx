import { Routes as Router, Route } from 'react-router-dom';
import React from 'react';
import { Routes } from '@osu-wams/utils';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Academics from '../pages/Academics';
import Finances from '../pages/Finances';
import Resources from '../pages/Resources';
import { useResetScroll } from 'src/hooks/useResetScroll';
import PageNotFound from 'src/pages/PageNotFound';

export const Student = () => {
  useResetScroll();
  return (
    <Router key="student-dashboard">
      <Route path={Routes.Routes().profile.path} element={<Profile />} />
      <Route path={Routes.Routes().academics.path + '/*'} element={<Academics />} />
      <Route path={Routes.Routes().finances.path} element={<Finances />} />
      <Route path={Routes.Routes().resources.path} element={<Resources />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="*" element={<PageNotFound />} />
    </Router>
  );
};

export default Student;
