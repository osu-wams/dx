import { Routes as Router, Route } from 'react-router-dom';
import React from 'react';
import Dashboard from '../pages/Dashboard';
import { useResetScroll } from 'src/hooks/useResetScroll';
import PageNotFound from 'src/pages/PageNotFound';

export const Student = () => {
  useResetScroll();
  return (
    <Router key="student-dashboard">
      <Route path="/" element={<Dashboard />} />
      <Route path="*" element={<PageNotFound />} />
    </Router>
  );
};

export default Student;
