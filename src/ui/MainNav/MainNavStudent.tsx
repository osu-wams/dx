import React, { useState } from 'react';
import { faHome, faGraduationCap, faHandsUsd, faBars } from '@fortawesome/pro-light-svg-icons';
import Icon from '../Icon';
import { Event } from '../../util/gaTracking';
import { FullMobileMenu } from './FullMobileMenu';
import { Nav, NavLink } from './MainNavStyles';

const MainNavStudent = (...props) => {
  return (
    <Nav {...props}>
      <NavLink to="/" onClick={() => Event('student-navigation-main', 'Overview link clicked')}>
        <Icon icon={faHome} />
        Overview
      </NavLink>
      <NavLink
        to="academics"
        onClick={() => Event('student-navigation-main', 'Academics link clicked')}
      >
        <Icon icon={faGraduationCap} />
        Academics
      </NavLink>
      <NavLink
        to="finances"
        onClick={() => Event('student-navigation-main', 'Finances link clicked')}
      >
        <Icon icon={faHandsUsd} />
        Finances
      </NavLink>
      <FullMobileMenu />
    </Nav>
  );
};

export { MainNavStudent };
