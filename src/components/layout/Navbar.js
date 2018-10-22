import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

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

const Navbar = () => (
  <NavbarWrapper>
    <NavbarButton>
      <FontAwesomeIcon icon={faBars} size="2x" />
    </NavbarButton>
  </NavbarWrapper>
);

export default Navbar;
