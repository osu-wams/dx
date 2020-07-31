import React from 'react';
import { MainNavStudent } from './MainNavStudent';
import { MainNavEmployee } from './MainNavEmployee';
import { User } from '@osu-wams/hooks';
import { userState } from 'src/state/application';
import { useRecoilValue } from 'recoil';

const { hasPrimaryAffiliation, AFFILIATIONS } = User;

/**
 * Uses the user context to determine what main navigation the user is getting.
 * Defaults to student navigation
 * @returns the MainNav component based on your primary affiliation
 */
const MainNav = () => {
  const user = useRecoilValue(userState);
  if (hasPrimaryAffiliation(user?.data, [AFFILIATIONS.employee])) {
    return <MainNavEmployee />;
  } else {
    return <MainNavStudent />;
  }
};

export default MainNav;
