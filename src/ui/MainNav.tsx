import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import {
  faHome,
  faGraduationCap,
  faHandsUsd,
  faToolbox,
  faFlaskPotion
} from '@fortawesome/pro-light-svg-icons';
import { Color } from '../theme';
import Icon from './Icon';
import { Event } from '../util/gaTracking';

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  /* Side Gradients */
  &:before,
  &:after {
    content: '';
    height: 4.5rem;
    position: absolute;
    pointer-events: none;
  }
  &:before {
    width: 3.5rem;
    background: linear-gradient(to right, rgba(255, 255, 255, 1) 0.5rem, rgba(255, 255, 255, 0));
    left: -1rem;
  }
  &:after {
    width: 3.5rem;
    background: linear-gradient(to left, rgba(255, 255, 255, 1) 0.5rem, rgba(255, 255, 255, 0));
    right: 0;
  }
  @media (min-width: 541px) {
    justify-content: center;
    &:before,
    &:after {
      background: none;
      width: 0;
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
  & > svg {
    font-size: 24px;
  }
  &:last-child {
    /* prevents last anchor link from being under the gradient */
    padding-right: 2rem;
  }
`;

const MainNav = (...props) => (
  <Nav {...props}>
    <NavLink to="/" onClick={() => Event('navigation-main', 'Home link clicked')}>
      <Icon icon={faHome} />
      Home
    </NavLink>
    <NavLink to="academics" onClick={() => Event('navigation-main', 'Academics link clicked')}>
      <Icon icon={faGraduationCap} />
      Academics
    </NavLink>
    <NavLink to="finances" onClick={() => Event('navigation-main', 'Finances link clicked')}>
      <Icon icon={faHandsUsd} />
      Finances
    </NavLink>
    <NavLink to="resources" onClick={() => Event('navigation-main', 'Resources link clicked')}>
      <Icon icon={faToolbox} />
      Resources
    </NavLink>
    <NavLink to="beta" onClick={() => Event('navigation-main', 'Beta link clicked')}>
      <Icon icon={faFlaskPotion} />
      Beta
    </NavLink>
  </Nav>
);

export default MainNav;
