import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

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
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            height: '40px',
            overflow: 'hidden',
            marginTop: '16px'
          }}
        >
          <SwipeNavItem>Dashboard</SwipeNavItem>
          <SwipeNavItem>Academics</SwipeNavItem>
          <SwipeNavItem>Finances</SwipeNavItem>
          <SwipeNavItem>Services</SwipeNavItem>
          <SwipeNavItem>Events</SwipeNavItem>
        </div>
      </div>
    );
  }
}

const SwipeNavItem = styled.div`
  text-transform: uppercase;
  font-family: Stratum2;
  font-weight: lighter;
  margin: 0 4px;
  padding: 0 4px;
  height: 40px;
  line-height: 44px;
  :first-child {
    margin-left: 16px;
    border-bottom: 2px solid ${({ theme }) => theme.primary.bg};
    color: ${({ theme }) => theme.primary.bg};
    font-weight: bold;
  }
`;

export default Navbar;
