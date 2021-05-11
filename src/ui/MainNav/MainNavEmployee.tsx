import React from 'react';
import { faHome, faToolbox, faUsersClass } from '@fortawesome/pro-light-svg-icons';
import Icon from '../Icon';
import { Event } from 'src/util/gaTracking';
import { Nav, NavLink } from './MainNavStyles';
import { Routes } from '@osu-wams/utils';

const MainNavEmployee = (...props) => {
  return (
    <Nav {...props}>
      <NavLink
        to={Routes.Routes().employee.fullPath}
        onClick={() => Event('employee-navigation-main', 'Overview link clicked')}
      >
        <Icon icon={faHome} />
        Overview
      </NavLink>
      <NavLink
        to={Routes.Routes(Routes.Dashboards.employee).resources.fullPath}
        onClick={() => Event('employee-navigation-main', 'Resources link clicked')}
      >
        <Icon icon={faToolbox} />
        Resources
      </NavLink>
      <NavLink
        to={Routes.Routes().trainings.fullPath}
        onClick={() => Event('employee-navigation-main', 'Training link clicked')}
      >
        <Icon icon={faUsersClass} />
        Training
      </NavLink>
    </Nav>
  );
};

export { MainNavEmployee };
