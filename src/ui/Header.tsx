import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/pro-light-svg-icons';
import VisuallyHidden from '@reach/visually-hidden';
import { Menu, MenuList, MenuButton, MenuLink } from '@reach/menu-button';
import 'react-toastify/dist/ReactToastify.min.css';
import logo from '../assets/osu-logo.svg';
import '@reach/menu-button/styles.css';
import MainNav from './MainNav';
import { Color } from '../theme';
import { Event } from '../util/gaTracking';

const headerMedia = `900px`;

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
    width: 150px;
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
  [data-reach-menu-item][data-selected] {
    background-color: ${Color['neutral-600']};
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
      <Menu className="profile-menu">
        <UserButton
          data-testid="user-btn"
          onClick={() => Event('header', 'user-button-menu', 'User button menu expanded')}
        >
          <VisuallyHidden>User menu</VisuallyHidden>
          <FontAwesomeIcon icon={faUserCircle} size="2x" />
        </UserButton>
        <ProfileMenuList>
          <MenuLink
            as="a"
            href="/logout"
            onClick={() => Event('header', 'user-button-menu', 'Logout link clicked')}
          >
            Logout
          </MenuLink>
          <MenuLink
            as={Link}
            to="profile"
            data-testid="profile-link"
            onClick={() =>
              Event('header', 'user-button-menu', 'Profile link from User Button dropdown')
            }
          >
            View Profile
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
