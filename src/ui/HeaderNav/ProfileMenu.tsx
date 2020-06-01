import React, { useContext, useState, useEffect } from 'react';
import { Link, navigate } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCircle,
  faUser,
  faSignOut,
  faChevronDown,
  faGraduationCap,
  faBriefcase,
} from '@fortawesome/pro-light-svg-icons';
import VisuallyHidden from '@reach/visually-hidden';
import { Menu, MenuLink } from '@reach/menu-button';
import { Event } from 'src/util/gaTracking';
import { User } from '@osu-wams/hooks';
import { Mobile, Desktop } from 'src/util/useMediaQuery';
import { HeaderNavButton, HeaderNavText, HeaderNavList } from './HeaderNavStyles';
import { AppContext } from 'src/contexts/app-context';

const { postSettings, usersSettings, AFFILIATIONS } = User;

const ProfileMenu = () => {
  const { user } = useContext(AppContext);
  const [affiliation, setAffiliation] = useState(user.data?.primaryAffiliationOverride ?? '');

  useEffect(() => {
    if (user.data?.primaryAffiliationOverride) {
      // const { firstYear, graduate, international } = user.data.audienceOverride;
      setAffiliation(user.data.primaryAffiliationOverride);
    }
  }, [user.data]);

  const changeAffiliation = (affiliationType: string) => {
    const settings = usersSettings(user.data);
    settings.primaryAffiliationOverride = affiliationType;

    postSettings({ primaryAffiliationOverride: settings.primaryAffiliationOverride }).then((d) => {
      user.setUser({ ...user, data: { ...user.data, ...settings } });
      navigate('/');
    });
  };

  // Creates an additional menu item if you are an employee
  // !TODO: student employees should get this too
  const ToggleAffiliationLink = () => {
    const Student = {
      description: 'Student Dashboard',
      icon: faGraduationCap,
      affiliation: AFFILIATIONS.student,
      employee: false, // !TODO add logic here for student employee to true/false depending
    };
    const Employee = {
      description: 'Employee Dashboard',
      icon: faBriefcase,
      affiliation: AFFILIATIONS.employee,
    };

    // Defaults link data to switch to student since most people seeing this are employees
    let affiliationOverride = Student.affiliation;
    let description = Student.description;
    let toggleIcon = Student.icon;

    // Currently only showing toggle option to Employee
    // !TODO && student is not employee
    if (user.data?.primaryAffiliation !== Employee.affiliation) {
      return;
    }

    // !TODO: OR || affiliation is student-employee
    if (affiliation === AFFILIATIONS.student) {
      affiliationOverride = Employee.affiliation;
      description = Employee.description;
      toggleIcon = Employee.icon;
    }

    return (
      <MenuLink
        as="button"
        onClick={() => {
          Event('header', 'user-button-menu', `Switch to ${description} link clicked`);
          changeAffiliation(affiliationOverride);
        }}
      >
        <FontAwesomeIcon icon={toggleIcon} /> {description}
      </MenuLink>
    );
  };

  return (
    <Menu>
      <HeaderNavButton
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
