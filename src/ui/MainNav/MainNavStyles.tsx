import { Link } from '@reach/router';
import styled from 'styled-components/macro';
import { fontSize, breakpoints, spacing } from 'src/theme';
import { IconStyle } from '../Icon';

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  overflow-x: scroll;
  /* Hide the scrollbar in most browsers */
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  background: ${({ theme }) => theme.header.mainNavList.background};
  box-shadow: rgba(66, 62, 60, 0.1) 0 -10px 16px, rgba(105, 99, 97, 0.05) 0 -3px 16px;
  border-top: ${({ theme }) => theme.header.mainNavList.borderTop};
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  z-index: 10;
  @media (min-width: ${breakpoints.small}) {
    width: auto;
    justify-content: left;
    position: static;
    box-shadow: none;
    max-width: 1200px;
    margin: 0 auto;
    border-top: none; /* only on mobile dark mode we currently have this border */
  }
  @media (min-width: ${breakpoints.large}) {
    padding: 0;
  }
`;

const NavLink = styled(Link)`
  display: flex;
  flex-direction: column;
  @media (min-width: ${breakpoints.small}) {
    flex-direction: row;
    font-size: ${fontSize[14]};
    padding: 10px 4px;
    ${IconStyle} {
      padding-right: 6px;
    }
    &[aria-current] {
      border-bottom: 2px solid ${({ theme }) => theme.header.mainNavList.hoverColor};
    }
  }
  border: none;
  align-items: center;
  margin: 0 8px;
  padding: 10px 4px 5px;
  line-height: 22px;
  font-size: ${fontSize[12]};
  text-decoration: none;
  background-color: ${({ theme }) => theme.header.mainNavList.background};
  color: ${({ theme }) => theme.header.mainNavList.color};
  ${IconStyle} {
    font-size: 20px;
    color: ${({ theme }) => theme.header.mainNavList.icon};
  }
  /* select and hover styles */
  &[aria-current],
  &[aria-current] > svg,
  &:active,
  &:active > svg,
  &:focus,
  &:focus > svg,
  &:hover,
  &:hover > svg {
    color: ${({ theme }) => theme.header.mainNavList.hoverColor};
  }
`;

const MobileMainNav = styled.nav`
  padding-top: ${spacing.xm};
  display: block;
`;

const MobileNavLink = styled(NavLink)`
  flex-direction: row;
  font-size: ${fontSize[20]};
  ${IconStyle} {
    padding-right: 10px;
    min-width: 34px;
    font-size: ${fontSize[24]};
  }
`;

const MobileFooter = styled(Nav)`
  box-shadow: none;
  padding: 1rem 0 3rem;
  justify-content: space-around;
`;

const MobileFooterLink = styled(NavLink)`
  flex-direction: row;
  font-size: ${fontSize[16]};
  padding: 10px 4px;
  &[aria-current] {
    border-bottom: 2px solid ${({ theme }) => theme.header.mainNavList.hoverColor};
  }
  ${IconStyle} {
    padding-right: 6px;
    font-size: ${fontSize[20]};
    min-width: 24px;
  }
`;

export { Nav, NavLink, MobileNavLink, MobileFooter, MobileMainNav, MobileFooterLink };
