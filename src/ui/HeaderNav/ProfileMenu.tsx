import React, { useContext, useState, useEffect } from 'react';
import { Link, navigate } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCircle,
  faUser,
  faSignOut,
  faMask,
  faChevronDown
} from '@fortawesome/pro-light-svg-icons';
import VisuallyHidden from '@reach/visually-hidden';
import { Menu, MenuLink } from '@reach/menu-button';
import { Event } from '../../util/gaTracking';
import { UserContext } from '../../App';
import { User } from '@osu-wams/hooks';
import { Mobile, Desktop } from 'src/util/useMediaQuery';
import { HeaderNavButton, HeaderNavText, HeaderNavList } from './HeaderNavStyles';

const { postSettings, usersSettings, AFFILIATIONS } = User;

const ProfileMenu = () => {
  const user = useContext(UserContext);
  const [affiliation, setAffiliation] = useState(user.data?.primaryAffiliationOverride ?? '');

  useEffect(() => {
    if (user.data.primaryAffiliationOverride) {
      // const { firstYear, graduate, international } = user.data.audienceOverride;
      setAffiliation(user.data.primaryAffiliationOverride);
    }
  }, [user.data]);

  const changeAffiliation = (affiliationType: string) => {
    const settings = usersSettings(user.data);
    settings.primaryAffiliationOverride = affiliationType;

    postSettings({ primaryAffiliationOverride: settings.primaryAffiliationOverride }).then(d => {
      user.setUser({
        ...user,
        data: { ...user.data, ...settings }
      });
      navigate('/');
    });
  };

  // Creates an additional menu item if you are an employee
  const ToggleAffiliationLink = () => {
    let affiliationOverride = AFFILIATIONS.student;
    let description = 'Student Dashboard';

    // Currently only showing toggle option to Employee
    if (user.data.primaryAffiliation !== AFFILIATIONS.employee) {
      return;
    }

    if (affiliation === AFFILIATIONS.student) {
      affiliationOverride = AFFILIATIONS.employee;
      description = 'Employee Dashboard';
    }

    return (
      <MenuLink
        as="button"
        onClick={() => {
          Event('header', 'user-button-menu', `Switch to ${description} link clicked`);
          changeAffiliation(affiliationOverride);
        }}
      >
        <FontAwesomeIcon icon={faMask} /> {description}
      </MenuLink>
    );
  };

  return (
    <Menu>
      <HeaderNavButton
        data-testid="user-btn"
        onClick={() => Event('header', 'user-button-menu', 'User button menu expanded')}
      >
        <FontAwesomeIcon icon={faUserCircle} size="lg" />
        <Mobile>
          <VisuallyHidden>Profile</VisuallyHidden>
        </Mobile>
        <Desktop>
          <HeaderNavText>Profile</HeaderNavText>
          <FontAwesomeIcon icon={faChevronDown} size="sm" />
        </Desktop>
      </HeaderNavButton>
      <HeaderNavList>
        <MenuLink
          as={Link}
          to="profile"
          data-testid="profile-link"
          onClick={() =>
            Event('header', 'user-button-menu', 'Profile link from User Button dropdown')
          }
        >
          <FontAwesomeIcon icon={faUser} />
          Profile
        </MenuLink>
        {ToggleAffiliationLink()}

        <MenuLink
          as="a"
          href="/logout"
          onClick={() => Event('header', 'user-button-menu', 'Logout link clicked')}
        >
          <FontAwesomeIcon icon={faSignOut} /> Logout
        </MenuLink>
      </HeaderNavList>
    </Menu>
  );
};

export { ProfileMenu };
