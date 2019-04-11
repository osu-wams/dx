import React from 'react';
import { Router, RouteComponentProps } from '@reach/router';
import PageTitle from '../../ui/PageTitle';
import AcademicHistory from './AcademicHistory';
import AcademicsDashboard from './AcademicsDashboard';
import { SubNav, SubNavLink } from '../../ui/SubNav';

const RouterPage = (props: { pageComponent: JSX.Element } & RouteComponentProps) =>
  props.pageComponent;

const Academics = () => {
  return (
    <div data-testid="academics-page">
      <PageTitle title="Academics" />
      <SubNav>
        <SubNavLink to="/academics">Dashboard</SubNavLink>
        <SubNavLink to="/academics/academic-history">Academic History</SubNavLink>
      </SubNav>
      <Router>
        <RouterPage pageComponent={<AcademicsDashboard />} path="/" />
        <RouterPage pageComponent={<AcademicHistory />} path="academic-history" />
      </Router>
    </div>
  );
};

export default Academics;
