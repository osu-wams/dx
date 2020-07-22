import React, { useState, useEffect } from 'react';
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
import { Menu, MenuLink, MenuPopover } from '@reach/menu-button';
import { Event } from 'src/util/gaTracking';
import { User } from '@osu-wams/hooks';
import { Mobile, Desktop } from 'src/util/useMediaQuery';
import { HeaderNavButton, HeaderNavText, HeaderNavList } from './HeaderNavStyles';
import { userState } from 'src/state/application';
import { useRecoilState } from 'recoil';

const { postSettings, usersSettings, AFFILIATIONS } = User;

const ProfileMenu = () => {
  const [user, setUser] = useRecoilState(userState);
  const [toggledAffiliation, setToggledAffiliation] = useState(
    user.data?.primaryAffiliationOverride ?? ''
  );
  const [studentEmployee, setStudentEmployee] = useState(false);

  useEffect(() => {
    if (user.data?.primaryAffiliationOverride) {
      // const { firstYear, graduate, international } = user.data.audienceOverride;
      setToggledAffiliation(user.data.primaryAffiliationOverride);
    }
    // Checks for any employee affiliation (finds Student Employees too)
    if (
      user.data?.primaryAffiliation === AFFILIATIONS.student &&
      user.data?.affiliations.includes(AFFILIATIONS.employee)
    ) {
      setStudentEmployee(true);
    }
  }, [user.data]);

  const changeAffiliation = (affiliationType: string) => {
    const settings = usersSettings(user.data);
    settings.primaryAffiliationOverride = affiliationType;

    postSettings({ primaryAffiliationOverride: settings.primaryAffiliationOverride }).then((d) => {
      setUser((prevUser) => ({ ...prevUser, data: { ...prevUser.data, ...settings } }));
      navigate('/');
    });
  };

  // Creates an additional menu item if you are an employee or student employee
  const ToggleAffiliationLink = () => {
    const Student = {
      description: 'Student Dashboard',
      icon: faGraduationCap,
      affiliation: AFFILIATIONS.student,
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

    // Do not show Dashboard Toggle to Students who are NOT also employees
    if (user.data?.primaryAffiliation === Student.affiliation && !studentEmployee) {
      return;
    }

    // If someone has Toggled To Student Dashboard, or if they are a Student Employee that hasn't toggled to Employee Dashboard
    if (toggledAffiliation === AFFILIATIONS.student || (!toggledAffiliation && studentEmployee)) {
      affiliationOverride = Employee.affiliation;
      description = Employee.description;
      toggleIcon = Employee.icon;
    }
    if (toggledAffiliation === AFFILIATIONS.employee) {
      affiliationOverride = Student.affiliation;
      description = Student.description;
      toggleIcon = Student.icon;
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
      <MenuPopover>
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
      </MenuPopover>
    </Menu>
  );
};

export { ProfileMenu };
