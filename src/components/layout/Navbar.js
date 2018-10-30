import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import VisuallyHidden from '@reach/visually-hidden';
import { Menu, MenuList, MenuButton, MenuItem, MenuLink } from '@reach/menu-button';
import { Dialog } from '@reach/dialog';
// Reach styles
import '@reach/menu-button/styles.css';
import '@reach/dialog/styles.css';
import MainNav from './MainNav';
import Button from './Button';
import Input from './Input';
import Label from './Label';

const NavbarWrapper = styled.header`
  height: 64px;
  background-color: ${({ theme }) => theme.primary.bg};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: ${({ theme }) => `0 ${theme.spacing.unit * 3}px`};
`;

const ProfileButton = styled(MenuButton)`
  color: ${props => props.theme.colors.white};
  background: transparent;
  border: none;
  cursor: pointer;
  margin-left: auto;
`;

const ProfileMenuList = styled(MenuList)`
  [data-reach-menu-item][data-selected] {
      background-color: ${props => props.theme.colors.charcoal};
    }
  }
`;

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      showMask: false
    };
  }

  // Hides or shows masquerade form
  toggleMask() {
    this.setState(state => ({
      showMask: !state.showMask
    }));
  }

  logout() {
    // logout logic needed
    this.logout();
  }

  render() {
    const { showMask } = this.state;
    return (
      <div style={{ marginBottom: '8px' }}>
        <NavbarWrapper>
          <Menu>
            <ProfileButton>
              <VisuallyHidden>User menu</VisuallyHidden>
              <FontAwesomeIcon icon={faUser} size="2x" aria-hidden />
            </ProfileButton>
            <ProfileMenuList>
              <MenuItem onSelect={() => this.logout()}>Logout</MenuItem>
              <MenuItem onSelect={() => this.toggleMask()}>Masquerade</MenuItem>
              <MenuLink to="profile">View Profile</MenuLink>
            </ProfileMenuList>
          </Menu>
        </NavbarWrapper>

        <MainNav />
        <Dialog isOpen={showMask}>
          <h2>Log in as another user</h2>
          <Label htmlFor="uuid">
            Enter user OSU uuid
            <br />
            <Input type="text" id="uuid" />
          </Label>
          <br />
          <br />
          <Button type="submit" variant="primary">
            Masquerade
          </Button>
          <Button type="cancel" onClick={() => this.toggleMask()}>
            Cancel
          </Button>
        </Dialog>
      </div>
    );
  }
}

export default Navbar;
