import React from 'react';
import { faHome, faList } from '@fortawesome/pro-light-svg-icons';
import Icon from '../Icon';
import { Event } from 'src/util/gaTracking';
import { Nav, NavLink } from './MainNavStyles';
import { Routes } from '@osu-wams/utils';

const MainNavStudent = (...props) => {
  return (
    <Nav {...props}>
      <NavLink
        end
        to={Routes.Routes().student.fullPath}
        onClick={() => Event('student-navigation-main', 'Overview link clicked')}
      >
        <Icon icon={faHome} />
        Overview
      </NavLink>
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
