import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import { faHome, faGraduationCap, faHandsUsd, faToolbox } from '@fortawesome/pro-light-svg-icons';
import { Color } from '../theme';
import Icon from './Icon';

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  /* Side Gradients */
  &:before,
  &:after {
    content: '';
    height: 4.5rem;
    position: absolute;
    pointer-events: none;
  }
  &:before {
    width: 3rem;
    background: linear-gradient(to right, white 0.5rem, transparent);
  }
  &:after {
    width: 3.5rem;
    background: linear-gradient(to left, white 0.5rem, transparent);
    right: 0;
  }
  @media (min-width: 541px) {
    &:before,
    &:after {
      background: none;
    }
  }
`;

const NavLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 12px;
  padding: 0 4px;
  line-height: 30px;
  text-decoration: none;
  color: ${Color['neutral-550']};
  /* select and hover styles */
  &[aria-current],
  &[aria-current] > svg,
  &:active,
  &:active > svg,
  &:focus,
  &:focus > svg,
  &:hover,
  &:hover > svg {
    color: ${Color['orange-400']};
  }
  :first-child {
    margin-left: 2rem;
  }
  :last-child {
    margin-right: 2rem;
  }
  & > svg {
    font-size: 24px;
  }
`;

const MainNav = () => (
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
    <NavLink to="resources">
      <Icon icon={faToolbox} />
      Resources
    </NavLink>
    <NavLink to="resources">
      <Icon icon={faToolbox} />
      Beta
    </NavLink>
  </Nav>
);

export default MainNav;
