import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import { faHome } from '@fortawesome/pro-light-svg-icons';
import VisuallyHidden from '@reach/visually-hidden';
import { Color } from '../theme';
import Icon from './Icon';

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  height: 4rem;
  margin-top: 1.6rem;
`;

const NavLink = styled(Link)`
  /* margin: 0 4px; */
  padding: 4px 8px;
  height: 30px;
  line-height: 30px;
  text-decoration: none;
  color: ${Color.white};
  display: inline-block;
  text-align: center;
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
`;

const MainNav = () => (
  <Nav>
    <NavLink title="Home" to="/">
      <Icon icon={faHome} color={Color.white} />
      <VisuallyHidden>Dashboard</VisuallyHidden>
    </NavLink>
    <NavLink to="academics">Academics</NavLink>
    <NavLink to="finances">Finances</NavLink>
    <NavLink to="experience">Experience</NavLink>
    <NavLink to="tools">Tools</NavLink>
  </Nav>
);

export default MainNav;
