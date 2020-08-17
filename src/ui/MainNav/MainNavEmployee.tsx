import React from 'react';
import { faHome, faToolbox, faFlaskPotion, faUsersClass } from '@fortawesome/pro-light-svg-icons';
import Icon from '../Icon';
import { Event } from 'src/util/gaTracking';
import { Nav, NavLink } from './MainNavStyles';

const MainNavEmployee = (...props) => {
  return (
    <Nav {...props}>
      <NavLink to="/" onClick={() => Event('employee-navigation-main', 'Overview link clicked')}>
        <Icon icon={faHome} />
        Overview
      </NavLink>
      <NavLink
        to="resources"
        onClick={() => Event('employee-navigation-main', 'Resources link clicked')}
      >
        <Icon icon={faToolbox} />
        Resources
      </NavLink>
      {process.env.REACT_APP_EXPERIMENTAL === 'true' && (
        <NavLink
          to="training"
          onClick={() => Event('employee-navigation-main', 'Training link clicked')}
        >
          <Icon icon={faUsersClass} />
          Training
        </NavLink>
      )}
      <NavLink to="beta" onClick={() => Event('employee-navigation-main', 'Beta link clicked')}>
        <Icon icon={faFlaskPotion} />
        Beta
      </NavLink>
    </Nav>
  );
};

export { MainNavEmployee };
