import React from 'react';
import { SubNav, SubNavLink } from './SubNav';

const AcademicSubNav = () => (
  <SubNav>
    <SubNavLink to="/academics">Dashboard</SubNavLink>
    <SubNavLink to="/">Academic History</SubNavLink>
  </SubNav>
);

export default AcademicSubNav;
