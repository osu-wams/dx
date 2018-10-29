import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link as ReachLink } from '@reach/router';

const NavbarWrapper = styled.header`
  height: 64px;
  background-color: ${({ theme }) => theme.primary.bg};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: ${({ theme }) => `0 ${theme.spacing.unit * 3}px`};
`;

export const NavbarButton = styled.button`
  background-color: transparent;
  border: 1px solid transparent;
  padding: 4px;
  color: ${({ theme }) => theme.primary.fg};
  border-radius: 4px;
  cursor: pointer;
  :hover {
    border: 1px solid ${({ theme }) => theme.primary.fg};
  }
  :focus {
    outline: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  height: 4rem;
  margin-top: 1.6rem;
`;

class Navbar extends Component {
  state = {};

  render() {
    return (
      <div style={{ marginBottom: '8px' }}>
        <NavbarWrapper>
          <NavbarButton style={{ marginLeft: 'auto' }}>
            <FontAwesomeIcon icon={faUser} size="2x" />
          </NavbarButton>
        </NavbarWrapper>
        <Nav>
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="academics">Academics</NavLink>
          <NavLink to="finances">Finances</NavLink>
          <NavLink to="services">Services</NavLink>
          <NavLink to="events">Events</NavLink>
        </Nav>
      </div>
    );
  }
}

const NavLink = styled(ReachLink)`
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
    transition: width .3s;
  }
}
`;

export default Navbar;
