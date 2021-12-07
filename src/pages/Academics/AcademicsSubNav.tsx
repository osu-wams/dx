import React from 'react';
import { faThLarge, faClock } from '@fortawesome/pro-light-svg-icons';
import { SubNav, SubNavLink } from 'src/ui/SubNav';
import Icon from 'src/ui/Icon';
import { Routes } from '@osu-wams/utils';

const AcademicSubNav = () => {
  return (
    <SubNav>
      <SubNavLink end to={Routes.Routes().academics.fullPath}>
        <Icon icon={faThLarge} /> Dashboard
      </SubNavLink>
      <SubNavLink end to={Routes.Routes()['past courses'].fullPath}>
        <Icon icon={faClock} />
        Past Courses
      </SubNavLink>
    </SubNav>
  );
};

export { AcademicSubNav };
