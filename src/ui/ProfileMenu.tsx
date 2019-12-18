import React, { useContext } from 'react';
import { Link } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faUser, faSignOut } from '@fortawesome/pro-light-svg-icons';
import VisuallyHidden from '@reach/visually-hidden';
import { Menu, MenuList, MenuButton, MenuLink } from '@reach/menu-button';
import { themeSettings, breakpoints, styled } from '../theme';
import { Event } from '../util/gaTracking';
import { UserContext } from '../App';

const UserButton = styled(MenuButton)`
  color: ${({ theme }) => theme.header.userButton.color};
  background: ${({ theme }) => theme.header.userButton.background};
  border: none;
  cursor: pointer;
`;

const ProfileMenuWrapper = styled.div`
  @media (min-width: ${breakpoints[768]}) {
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

const ProfileMenu = () => {
  const user = useContext<any>(UserContext);

  return (
    <ProfileMenuWrapper>
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
    </ProfileMenuWrapper>
  );
};

export { ProfileMenu };
