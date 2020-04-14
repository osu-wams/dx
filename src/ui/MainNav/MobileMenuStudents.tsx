import React from 'react';
import { faHome, faGraduationCap, faHandsUsd, faList } from '@fortawesome/pro-light-svg-icons';
import Icon from '../Icon';
import { Event } from 'src/util/gaTracking';
import { MobileMainNav, MobileNavLink } from './MainNavStyles';

const MobileMenuStudents = ({ toggleFullMenu, ...props }) => {
  // Simplify closing of modal and adding the GA event data
  const ClickEvents = (linkName: string) => {
    toggleFullMenu(false);
    Event('student-mobile-nav', linkName + ' link clicked');
  };

  return (
    <MobileMainNav {...props}>
      <MobileNavLink to="/" onClick={() => ClickEvents('Overview')}>
        <Icon icon={faHome} />
        Overview
      </MobileNavLink>
      <MobileNavLink to="academics" onClick={() => ClickEvents('Academics')}>
        <Icon icon={faGraduationCap} />
        Academics
      </MobileNavLink>
      <MobileNavLink to="finances" onClick={() => ClickEvents('Finances')}>
        <Icon icon={faHandsUsd} />
        Finances
      </MobileNavLink>
      <MobileNavLink to="resources" onClick={() => ClickEvents('Resources')}>
        <Icon icon={faList} />
        Resources
      </MobileNavLink>
    </MobileMainNav>
  );
};

export { MobileMenuStudents };
