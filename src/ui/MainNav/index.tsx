import React, { useContext } from 'react';
import { MainNavStudent } from './MainNavStudent';
import { MainNavEmployee } from './MainNavEmployee';
import { UserContext } from '../../App';
import { hasPrimaryAffiliation, AFFILIATIONS } from '../../api/user';

/**
 * Uses the user context to determine what main navigation the user is getting.
 * Defaults to student navigation
 * @returns the MainNav component based on your primary affiliation
 */
const MainNav = () => {
  const user = useContext<any>(UserContext);
  if (hasPrimaryAffiliation(user.data, [AFFILIATIONS.employee])) {
    return <MainNavEmployee />;
  } else {
    return <MainNavStudent />;
  }
};

export default MainNav;
