import React from 'react';
import { faThLarge, faClock } from '@fortawesome/pro-light-svg-icons';
import { SubNav, SubNavLink } from 'src/ui/SubNav';
import Icon from 'src/ui/Icon';
import { Routes } from 'src/routers';

const AcademicSubNav = () => {
  return (
    <SubNav>
      <SubNavLink to={Routes().academics.fullPath}>
        <Icon icon={faThLarge} /> Dashboard
      </SubNavLink>
      <SubNavLink to={Routes().pastcourses.fullPath}>
        <Icon icon={faClock} />
        Past Courses
      </SubNavLink>
    </SubNav>
  );
};

export { AcademicSubNav };
