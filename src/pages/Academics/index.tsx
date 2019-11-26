import React from 'react';
import { Router, RouteComponentProps } from '@reach/router';
import PastCourses from './PastCourses';
import AcademicsDashboard from './AcademicsDashboard';

const RouterPage = (props: { pageComponent: JSX.Element } & RouteComponentProps) =>
  props.pageComponent;

const Academics = () => {
  return (
    <Router className="router-styles">
      <RouterPage pageComponent={<AcademicsDashboard />} path="/" />
      <RouterPage pageComponent={<PastCourses />} path="past-courses" />
    </Router>
  );
};

export default Academics;
