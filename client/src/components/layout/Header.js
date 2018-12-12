import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faComment } from '@fortawesome/free-solid-svg-icons';
import VisuallyHidden from '@reach/visually-hidden';
import { Menu, MenuList, MenuButton, MenuItem, MenuLink } from '@reach/menu-button';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../assets/logo.svg';
import '@reach/menu-button/styles.css';
import '@reach/dialog/styles.css';
import MyDialog from './MyDialog';
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
  const [showMasqueradeDialog, setShowMasqueradeDialog] = useState(false);
  const [masqueradeId, setMasqueradeId] = useState('');

  useEffect(() => {
    loadMasqueradeId();
  }, []);

  const toggleMasqueradeDialog = () => setShowMasqueradeDialog(!showMasqueradeDialog);

  const loadMasqueradeId = async () => {
    try {
      const { data } = await axios.get('/api/masquerade');
      if (data.masqueradeId) {
        setMasqueradeId(data.masqueradeId);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const masquerade = () => {
    if (masqueradeId) {
      axios
        .post('/api/masquerade', { masqueradeId })
        .then(() => {
          toggleMasqueradeDialog();
          toast.warn(`Masquerading as OSU ID ${masqueradeId}.`, { transition: Zoom });
        })
        .catch(err => console.log(err));
    } else {
      axios
        .post('/api/masquerade')
        .then(() => {
          toggleMasqueradeDialog();
          setMasqueradeId('');
          toast.info('Masquerade session ended.', { transition: Zoom });
        })
        .catch(err => console.log(err));
    }
  };

  const handleChange = e => {
    setMasqueradeId(e.target.value);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      masquerade();
    }
  };

  const logout = () => {
    // logout logic needed
    logout();
  };

  return (
    <>
      <ToastContainer />
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
            <MenuItem onSelect={toggleMasqueradeDialog}>Masquerade</MenuItem>
            <MenuLink to="profile" data-testid="profile-link">
              View Profile
            </MenuLink>
          </ProfileMenuList>
        </Menu>
      </NavbarWrapper>

      {/* Masquerade Dialog Box */}
      <MyDialog isOpen={showMasqueradeDialog} data-testid="masquerade-dialog">
        <h2>Log in as another user</h2>
        <Label htmlFor="osu-id">
          Enter user OSU ID
          <br />
          <Input
            type="text"
            id="osu-id"
            value={masqueradeId}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </Label>
        <br />
        <br />
        <Button type="submit" onClick={masquerade}>
          Masquerade
        </Button>
        <Button type="cancel" bg="nimbus" fg="charcoal" outline onClick={toggleMasqueradeDialog}>
          Cancel
        </Button>
      </MyDialog>
    </>
  );
};

export default Header;
