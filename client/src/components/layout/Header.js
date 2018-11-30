import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faComment } from '@fortawesome/free-solid-svg-icons';
import VisuallyHidden from '@reach/visually-hidden';
import { Menu, MenuList, MenuButton, MenuItem, MenuLink } from '@reach/menu-button';
import logo from '../../assets/logo.svg';
import '@reach/menu-button/styles.css';
import '@reach/dialog/styles.css';
import MyDialog from './MyDialog';
import MainNav from './MainNav';
import Button from './Button';
import Input from './Input';
import Label from './Label';

const NavbarWrapper = styled.header`
  height: 64px;
  background-color: ${props => props.theme.colors.orange};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => `0 ${theme.spacing.unit * 2}px`};
`;

const UserButton = styled(MenuButton)`
  color: ${props => props.theme.colors.white};
  background: transparent;
  border: none;
  cursor: pointer;
`;

const ProfileMenuList = styled(MenuList)`
  [data-reach-menu-item][data-selected] {
    background-color: ${props => props.theme.colors.charcoal};
  }
`;

const Logo = styled.img`
  height: 58px;
`;

const ChatButton = styled.button`
  color: #fff;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const Header = () => {
  const [mask, setMask] = useState(false);

  const logout = () => {
    // logout logic needed
    logout();
  };

  const toggleMask = () => setMask(!mask);

  return (
    <>
      <NavbarWrapper>
        <ChatButton>
          <FontAwesomeIcon icon={faComment} size="2x" color="white" />
        </ChatButton>
        <Logo src={logo} alt="Oregon State University" />
        <Menu>
          <UserButton data-testid="user-btn">
            <VisuallyHidden>User menu</VisuallyHidden>
            <FontAwesomeIcon icon={faUserCircle} size="2x" />
          </UserButton>
          <ProfileMenuList>
            <MenuItem onSelect={() => logout()}>Logout</MenuItem>
            <MenuItem onSelect={() => toggleMask()}>Masquerade</MenuItem>
            <MenuLink to="profile" data-testid="profile-link">
              View Profile
            </MenuLink>
          </ProfileMenuList>
        </Menu>
      </NavbarWrapper>

      <MainNav />

      {/* Masquerade Dialg Box */}
      <MyDialog isOpen={mask} data-testid="masquerade-dialog">
        <h2>Log in as another user</h2>
        <Label htmlFor="uuid">
          Enter user OSU uuid
          <br />
          <Input type="text" id="uuid" />
        </Label>
        <br />
        <br />
        <Button type="submit">Masquerade</Button>
        <Button type="cancel" bg="nimbus" fg="charcoal" outline onClick={() => toggleMask()}>
          Cancel
        </Button>
      </MyDialog>
    </>
  );
};

export default Header;
