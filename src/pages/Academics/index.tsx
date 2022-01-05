import React from 'react';
import { Routes as Router, Route } from 'react-router-dom';
import PastCourses from './PastCourses';
import AcademicsDashboard from './AcademicsDashboard';
import PageNotFound from './../PageNotFound';
import { Routes } from '@osu-wams/utils';

const Academics = () => {
  return (
    <Router>
      <Route element={<AcademicsDashboard />} path="/" />
      <Route element={<PastCourses />} path={Routes.Routes()['past courses'].path} />
      <Route path="*" element={<PageNotFound />} />
    </Router>
  );
};

export default Academics;
