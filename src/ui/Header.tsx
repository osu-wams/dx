import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/pro-light-svg-icons';
import VisuallyHidden from '@reach/visually-hidden';
import { Menu, MenuList, MenuButton, MenuLink } from '@reach/menu-button';
import 'react-toastify/dist/ReactToastify.min.css';
import logo from '../assets/logo.png';
import '@reach/menu-button/styles.css';
import '@reach/dialog/styles.css';
import MainNav from './MainNav';
import { Color } from '../theme';

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 140px;
  background-color: ${Color.white};
`;

const HeaderTopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px 0;
`;

const HeaderBottomSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  overflow-x: auto;
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
  height: 44px;
`;

const Header = () => (
  <HeaderWrapper>
    <HeaderTopSection>
      <Logo src={logo} alt="Oregon State University" />
      <div>
        <Menu>
          <UserButton data-testid="user-btn">
            <VisuallyHidden>User menu</VisuallyHidden>
            <FontAwesomeIcon icon={faUserCircle} size="2x" />
          </UserButton>
          <ProfileMenuList>
            <MenuLink as="a" href="/logout">
              Logout
            </MenuLink>
            <MenuLink as={Link} to="profile" data-testid="profile-link">
              View Profile
            </MenuLink>
          </ProfileMenuList>
        </Menu>
      </div>
    </HeaderTopSection>
    <HeaderBottomSection>
      <MainNav />
    </HeaderBottomSection>
  </HeaderWrapper>
);

export default Header;
