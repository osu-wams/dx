import React from 'react';
import { faHome, faToolbox, faFlaskPotion } from '@fortawesome/pro-light-svg-icons';
import Icon from '../Icon';
import { Event } from '../../util/gaTracking';
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
      <NavLink to="beta" onClick={() => Event('employee-navigation-main', 'Beta link clicked')}>
        <Icon icon={faFlaskPotion} />
        Beta
      </NavLink>
    </Nav>
  );
};

export { MainNavEmployee };
