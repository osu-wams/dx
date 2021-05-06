import React from 'react';
import { faHome, faGraduationCap, faHandsUsd, faList } from '@fortawesome/pro-light-svg-icons';
import Icon from '../Icon';
import { Event } from 'src/util/gaTracking';
import { FullMobileMenu } from './FullMobileMenu';
import { Nav, NavLink } from './MainNavStyles';
import { Mobile, Desktop } from 'src/hooks/useMediaQuery';
import { Routes } from '@osu-wams/utils';

const MainNavStudent = (...props) => {
  return (
    <Nav {...props}>
      <NavLink
        to={Routes.Routes().student.fullPath}
        onClick={() => Event('student-navigation-main', 'Overview link clicked')}
      >
        <Icon icon={faHome} />
        Overview
      </NavLink>
      <NavLink
        to={Routes.Routes().academics.fullPath}
        onClick={() => Event('student-navigation-main', 'Academics link clicked')}
      >
        <Icon icon={faGraduationCap} />
        Academics
      </NavLink>
      <NavLink
        to={Routes.Routes().finances.fullPath}
        onClick={() => Event('student-navigation-main', 'Finances link clicked')}
      >
        <Icon icon={faHandsUsd} />
        Finances
      </NavLink>

      <Mobile>
        <FullMobileMenu />
      </Mobile>

      <Desktop>
        <DesktopLinks />
      </Desktop>
    </Nav>
  );
};

const DesktopLinks = () => {
  return (
    <>
      <NavLink
        to={Routes.Routes(Routes.Dashboards.student).resources.fullPath}
        onClick={() => Event('student-navigation-main', 'Resource link clicked')}
      >
        <Icon icon={faList} />
        Resources
      </NavLink>
    </>
  );
};

export { MainNavStudent };
