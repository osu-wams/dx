import React from 'react';
import { faHome, faToolbox, faUsersClass } from '@fortawesome/pro-light-svg-icons';
import Icon from '../Icon';
import { Event } from 'src/util/gaTracking';
import { Nav, NavLink } from './MainNavStyles';

const MainNavEmployee = (...props) => {
  return (
    <Nav {...props}>
      <NavLink
        to="/employee"
        onClick={() => Event('employee-navigation-main', 'Overview link clicked')}
      >
        <Icon icon={faHome} />
        Overview
      </NavLink>
      <NavLink
        to="employee/resources"
        onClick={() => Event('employee-navigation-main', 'Resources link clicked')}
      >
        <Icon icon={faToolbox} />
        Resources
      </NavLink>
      <NavLink
        to="employee/training"
        onClick={() => Event('employee-navigation-main', 'Training link clicked')}
      >
        <Icon icon={faUsersClass} />
        Training
      </NavLink>
    </Nav>
  );
};

export { MainNavEmployee };
