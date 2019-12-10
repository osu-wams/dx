import React from 'react';
import { faHome, faGraduationCap, faHandsUsd } from '@fortawesome/pro-light-svg-icons';
import Icon from '../Icon';
import { Event } from '../../util/gaTracking';
import { MoreNav } from './MoreNav';
import { Nav, NavLink } from './MainNavStyles';

const MainNavStudent = (...props) => {
  return (
    <Nav {...props}>
      <NavLink to="/" onClick={() => Event('student-navigation-main', 'Home link clicked')}>
        <Icon icon={faHome} />
        Home
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
      <MoreNav />
    </Nav>
  );
};

export { MainNavStudent };
