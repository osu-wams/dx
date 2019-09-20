import React from 'react';
import { faThLarge, faClock } from '@fortawesome/pro-light-svg-icons';
import { SubNav, SubNavLink } from '../../ui/SubNav';
import Icon from '../../ui/Icon';

const AcademicSubNav = () => {
  return (
    <SubNav>
      <SubNavLink to="/academics">
        <Icon icon={faThLarge} /> Dashboard
      </SubNavLink>
      <SubNavLink to="/academics/academic-history">
        <Icon icon={faClock} />
        Academic History
      </SubNavLink>
    </SubNav>
  );
};

export { AcademicSubNav };
