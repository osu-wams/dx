import React from 'react';
import {
  faHome,
  faGraduationCap,
  faHandsUsd,
  faList,
  faFlask
} from '@fortawesome/pro-light-svg-icons';
import Icon from '../Icon';
import { Event } from 'src/util/gaTracking';
import { FullMobileMenu } from './FullMobileMenu';
import { Nav, NavLink } from './MainNavStyles';
import { breakpoints } from 'src/theme';
import useMediaQuery from 'src/util/useMediaQuery';

const MainNavStudent = (...props) => {
  const isMobile = !useMediaQuery(`(min-width: ${breakpoints.small})`);

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

      {isMobile && <FullMobileMenu />}

      {!isMobile && <DesktopLinks />}
    </Nav>
  );
};

const DesktopLinks = () => {
  return (
    <>
      <NavLink
        to="resources"
        onClick={() => Event('student-navigation-main', 'Resource link clicked')}
      >
        <Icon icon={faList} />
        Resources
      </NavLink>
      <NavLink to="beta" onClick={() => Event('student-navigation-main', 'Beta link clicked')}>
        <Icon icon={faFlask} />
        Beta
      </NavLink>
    </>
  );
};

export { MainNavStudent };
