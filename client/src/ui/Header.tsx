import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faComment } from '@fortawesome/pro-light-svg-icons';
import VisuallyHidden from '@reach/visually-hidden';
import { Menu, MenuList, MenuButton, MenuItem, MenuLink } from '@reach/menu-button';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/logo.png';
import '@reach/menu-button/styles.css';
import '@reach/dialog/styles.css';
import MyDialog from './MyDialog';
import Button from './Button';
import Input from './Input';
import Label from './Label';
import MainNav from './MainNav';
import Icon from './Icon';
import { Color } from '../theme';
import ServiceSearchButton from '../features/services/ServiceSearchButton';
import UserContext from '../App';

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
  color: ${Color['neutral-500']};
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

const Header = () => {
  const [showMasqueradeDialog, setShowMasqueradeDialog] = useState(false);
  const [masqueradeId, setMasqueradeId] = useState('');
  const user = useContext<any>(UserContext);

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
      <HeaderWrapper>
        <HeaderTopSection>
          <Logo src={logo} alt="Oregon State University" />
          <div>
            <ServiceSearchButton />
            <Menu>
              <UserButton data-testid="user-btn">
                <VisuallyHidden>User menu</VisuallyHidden>
                <FontAwesomeIcon icon={faUserCircle} size="2x" />
              </UserButton>
              <ProfileMenuList>
                <MenuItem onSelect={() => logout()}>Logout</MenuItem>
                {user && user.isAdmin && (
                  <MenuItem onSelect={toggleMasqueradeDialog}>Masquerade</MenuItem>
                )}
                <MenuLink to="profile" data-testid="profile-link">
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
        <Button
          type="cancel"
          bg={Color['neutral-200']}
          fg={Color['neutral-700']}
          onClick={toggleMasqueradeDialog}
        >
          Cancel
        </Button>
      </MyDialog>
    </>
  );
};

export default Header;
