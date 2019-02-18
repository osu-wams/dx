import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import {
  faHome,
  faGraduationCap,
  faHandsUsd,
  faHiking,
  faToolbox
} from '@fortawesome/pro-light-svg-icons';
import { Color } from '../theme';
import Icon from './Icon';

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  margin-top: 24px;
`;

const NavLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 12px;
  padding: 0 4px;
  line-height: 30px;
  text-decoration: none;
  color: ${Color['neutral-500']};
  &[aria-current],
  &[aria-current] > svg {
    color: ${Color['orange-400']};
  }
  /* select and hover styles */
  &:active::after,
  &:focus::after,
  &:hover::after,
  &[aria-current]::after {
    width: 100%;
  }
  :first-child {
    margin-left: 16px;
  }
  &::after {
    content: '';
    display: block;
    width: 0;
    height: 2px;
    background: ${Color.white};
    transition: width 0.3s;
  }
  & > svg {
    font-size: 24px;
  }
`;

const IconButton = styled.button``;

const MainNav = () => (
  <>
    <Nav>
      <NavLink to="/">
        <Icon icon={faHome} />
        Home
      </NavLink>
      <NavLink to="academics">
        <Icon icon={faGraduationCap} />
        Academics
      </NavLink>
      <NavLink to="finances">
        <Icon icon={faHandsUsd} />
        Finances
      </NavLink>
      <NavLink to="experience">
        <Icon icon={faHiking} />
        Experience
      </NavLink>
      <NavLink to="tools">
        <Icon icon={faToolbox} />
        Tools
      </NavLink>
    </Nav>
  </>
);

export default MainNav;
