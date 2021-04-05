import React from 'react';
import { Router, RouteComponentProps } from '@reach/router';
import PastCourses from './PastCourses';
import AcademicsDashboard from './AcademicsDashboard';
import PageNotFound from './../PageNotFound';
import { Routes } from 'src/routers';

const RouterPage = (props: { pageComponent: JSX.Element } & RouteComponentProps) =>
  props.pageComponent;

const Academics = () => {
  return (
    <Router className="router-styles">
      <RouterPage pageComponent={<AcademicsDashboard />} path="/" />
      <RouterPage pageComponent={<PastCourses />} path={Routes()['past courses'].path} />
      <RouterPage default pageComponent={<PageNotFound />} />
    </Router>
  );
};

export default Academics;
