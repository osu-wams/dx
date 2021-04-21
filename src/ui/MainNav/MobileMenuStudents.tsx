import React from 'react';
import {
  faHome,
  faGraduationCap,
  faHandsUsd,
  faList,
  faSearch,
} from '@fortawesome/pro-light-svg-icons';
import Icon from '../Icon';
import { Event } from 'src/util/gaTracking';
import { MobileMainNav, MobileNavLink } from './MainNavStyles';
import { Routes, Dashboards } from 'src/routers';

const MobileMenuStudents = ({ toggleFullMenu, ...props }) => {
  // Simplify closing of modal and adding the GA event data
  const ClickEvents = (linkName: string) => {
    toggleFullMenu(false);
    Event('student-mobile-nav', linkName + ' link clicked');
  };

  return (
    <MobileMainNav {...props}>
      <MobileNavLink to={Routes().student.fullPath} onClick={() => ClickEvents('Overview')}>
        <Icon icon={faHome} />
        Overview
      </MobileNavLink>
      <MobileNavLink to={Routes().academics.fullPath} onClick={() => ClickEvents('Academics')}>
        <Icon icon={faGraduationCap} />
        Academics
      </MobileNavLink>
      <MobileNavLink to={Routes().finances.fullPath} onClick={() => ClickEvents('Finances')}>
        <Icon icon={faHandsUsd} />
        Finances
      </MobileNavLink>
      <MobileNavLink to={Routes().search.fullPath} onClick={() => ClickEvents('Search')}>
        <Icon icon={faSearch} />
        Search
      </MobileNavLink>
      <MobileNavLink
        to={Routes(Dashboards.student).resources.fullPath}
        onClick={() => ClickEvents('Resources')}
      >
        <Icon icon={faList} />
        Resources
      </MobileNavLink>
    </MobileMainNav>
  );
};

export { MobileMenuStudents };
