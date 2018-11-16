import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  height: 4rem;
  margin-top: 1.6rem;
`;

const NavLink = styled(Link)`
  font-family: Stratum2, sans-serif;
  margin: 0 4px;
  padding: 0 4px;
  height: 30px;
  line-height: 30px;
  text-decoration: none;
  font-size: ${props => props.theme.fontSize.large};
  color: ${props => props.theme.colors.charcoal};
  &[aria-current] {
    color: ${props => props.theme.colors.orange};
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
    background: ${props => props.theme.colors.orange};
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
