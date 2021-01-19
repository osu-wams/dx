import React from 'react';
import { faThLarge, faClock } from '@fortawesome/pro-light-svg-icons';
import { SubNav, SubNavLink } from 'src/ui/SubNav';
import Icon from 'src/ui/Icon';

const AcademicSubNav = () => {
  return (
    <SubNav>
      <SubNavLink to="/student/academics">
        <Icon icon={faThLarge} /> Dashboard
      </SubNavLink>
      <SubNavLink to="/student/academics/past-courses">
        <Icon icon={faClock} />
        Past Courses
      </SubNavLink>
    </SubNav>
  );
};

export { AcademicSubNav };
