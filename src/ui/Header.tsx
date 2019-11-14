import React, { useContext } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faUser, faSignOut } from '@fortawesome/pro-light-svg-icons';
import VisuallyHidden from '@reach/visually-hidden';
import { Menu, MenuList, MenuButton, MenuLink } from '@reach/menu-button';
import 'react-toastify/dist/ReactToastify.min.css';
import logo from '../assets/osu-logo.svg';
import ecampusLogo from '../assets/osu-ecampus.svg';
import cascadesLogo from '../assets/osu-cascades.svg';
import '@reach/menu-button/styles.css';
import MainNav from './MainNav';
import { themeSettings, breakpoints } from '../theme';
import { Event } from '../util/gaTracking';
import { IUser } from '../api/user';
import { UserContext } from '../App';

const headerMedia = breakpoints[768];

const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  background-color: ${({ theme }) => theme.header.background};
  justify-content: space-between;
  flex-flow: row wrap;
  padding: 8px 8px 12px;
  align-items: center;
`;

const ProfileMenu = styled.div`
  @media (min-width: ${headerMedia}) {
    width: 100px;
    order: 2;
    button {
      float: right;
    }
  }
  @media (min-width: ${breakpoints[1024]}) {
    /* matches width of osu logo so it center aligns the menu */
    width: 250px;
  }
`;

const Navigation = styled.div`
  flex-basis: 100%;
  margin: 10px auto 0 auto;
  overflow-x: scroll;
  /* Hide the scrollbar in most browsers */
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  @media (min-width: ${headerMedia}) {
    flex-basis: auto;
    order: 1;
  }
`;

const UserButton = styled(MenuButton)`
  color: ${({ theme }) => theme.header.userButton.color};
  background: ${({ theme }) => theme.header.userButton.background};
  border: none;
  cursor: pointer;
`;

const ProfileMenuList = styled(MenuList)`
  &[data-reach-menu-list] {
    background-color: ${({ theme }) => theme.header.profileMenuList.background};
    border-radius: ${themeSettings.borderRadius[8]};
    color: ${({ theme }) => theme.header.profileMenuList.color};
    min-width: 15rem;
    padding: 0;
    [data-reach-menu-item] {
      padding: 1rem 2rem;
      font-size: ${themeSettings.fontSize[16]};
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    svg {
      color: ${({ theme }) => theme.header.profileMenuList.svg.color};
      margin-right: 1.2rem;
      font-size: ${themeSettings.fontSize[24]};
    }
    div + div {
      [data-reach-menu-item] {
        border-top: 1px solid ${({ theme }) => theme.header.profileMenuList.menuItem.borderTop};
      }
    }
  }
  [data-reach-menu-item][data-selected] {
    background-color: ${({ theme }) => theme.header.profileMenuList.menuItemSelected.background};
  }
`;

const Logo = styled.img`
  order: 0;
  height: 60px;
  @media (min-width: ${headerMedia}) {
    height: 80px;
  }
`;

/**
 * Return the ecampus or cascades logo if the user is identified as belonging to one of those campuses
 * @param user the currently logged in user
 */
const campusLogo = (user: IUser | null) => {
  if (!user || !user.classification || !Object.keys(user.classification).includes('attributes'))
    return logo;
  switch (user!.classification!.attributes!.campusCode) {
    case 'DSC':
      return ecampusLogo;
    case 'B':
      return cascadesLogo;
    default:
      return logo;
  }
};

const Header = () => {
  const user = useContext<any>(UserContext);

  return (
    <HeaderWrapper>
      <Logo
        data-testid="app-header-logo"
        src={campusLogo(user.data)}
        alt="Oregon State University"
      />
      <ProfileMenu>
        <Menu>
          <UserButton
            data-testid="user-btn"
            onClick={() => Event('header', 'user-button-menu', 'User button menu expanded')}
          >
            <VisuallyHidden>User menu</VisuallyHidden>
            <FontAwesomeIcon icon={faUserCircle} size="2x" />
          </UserButton>
          <ProfileMenuList>
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
            <MenuLink
              as="a"
              href="/logout"
              onClick={() => Event('header', 'user-button-menu', 'Logout link clicked')}
            >
              <FontAwesomeIcon icon={faSignOut} /> Logout
            </MenuLink>
          </ProfileMenuList>
        </Menu>
      </ProfileMenu>
      <Navigation>
        <MainNav />
      </Navigation>
    </HeaderWrapper>
  );
};

export default Header;
