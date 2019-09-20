import React from 'react';
import { Router, RouteComponentProps } from '@reach/router';
import AcademicHistory from './AcademicHistory';
import AcademicsDashboard from './AcademicsDashboard';

const RouterPage = (props: { pageComponent: JSX.Element } & RouteComponentProps) =>
  props.pageComponent;

const Academics = () => {
  return (
    <Router>
      <RouterPage pageComponent={<AcademicsDashboard />} path="/" />
      <RouterPage pageComponent={<AcademicHistory />} path="academic-history" />
    </Router>
  );
};

export default Academics;
