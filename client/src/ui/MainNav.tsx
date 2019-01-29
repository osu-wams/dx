import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import { colors } from '../theme';

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  height: 4rem;
  margin-top: 1.6rem;
`;

const NavLink = styled(Link)`
  margin: 0 4px;
  padding: 0 4px;
  height: 30px;
  line-height: 30px;
  text-decoration: none;
  color: ${colors.white};
  &[aria-current] {
    font-weight: bold;
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
    background: ${colors.white};
    transition: width 0.3s;
  }
`;

const MainNav = () => (
  <Nav>
    <NavLink to="/">Dashboard</NavLink>
    <NavLink to="academics">Academics</NavLink>
    <NavLink to="finances">Finances</NavLink>
    <NavLink to="services">Services</NavLink>
    <NavLink to="events">Events</NavLink>
  </Nav>
);

export default MainNav;
