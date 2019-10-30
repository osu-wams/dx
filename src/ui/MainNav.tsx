import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import { faHome, faGraduationCap, faHandsUsd } from '@fortawesome/pro-light-svg-icons';
import { Color } from '../theme';
import Icon from './Icon';
import { Event } from '../util/gaTracking';
import { MoreNav } from './MoreNav';

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  @media (min-width: 541px) {
    justify-content: center;
  }
`;

const NavLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 8px;
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

const MainNav = (...props) => {
  return (
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
      <MoreNav />
    </Nav>
  );
};

export default MainNav;
