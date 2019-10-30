import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faUser, faSignOut } from '@fortawesome/pro-light-svg-icons';
import VisuallyHidden from '@reach/visually-hidden';
import { Menu, MenuList, MenuButton, MenuLink } from '@reach/menu-button';
import 'react-toastify/dist/ReactToastify.min.css';
import logo from '../assets/osu-logo.svg';
import '@reach/menu-button/styles.css';
import MainNav from './MainNav';
import { theme, Color, breakpoints } from '../theme';
import { Event } from '../util/gaTracking';

const headerMedia = breakpoints[768];

const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  background-color: ${Color.white};
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
  color: ${Color['neutral-550']};
  background: transparent;
  border: none;
  cursor: pointer;
`;

const ProfileMenuList = styled(MenuList)`
  &[data-reach-menu-list] {
    background-color: ${Color['neutral-700']};
    border-radius: ${theme.borderRadius[8]};
    color: ${Color.white};
    min-width: 15rem;
    padding: 0;
    [data-reach-menu-item] {
      padding: 1rem 2rem;
      font-size: ${theme.fontSize[16]};
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    svg {
      color: ${Color['orange-300']};
      margin-right: 1.2rem;
      font-size: ${theme.fontSize[24]};
    }
    div + div {
      [data-reach-menu-item] {
        border-top: 1px solid ${Color['neutral-500']};
      }
    }
  }
  [data-reach-menu-item][data-selected] {
    background-color: transparent;
  }
`;

const Logo = styled.img`
  order: 0;
  height: 60px;
  @media (min-width: ${headerMedia}) {
    height: 80px;
  }
`;

const Header = () => (
  <HeaderWrapper>
    <Logo src={logo} alt="Oregon State University" />
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

export default Header;
