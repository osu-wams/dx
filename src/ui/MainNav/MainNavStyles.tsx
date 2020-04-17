import { Link } from '@reach/router';
import styled from 'styled-components/macro';
import { themeSettings, breakpoints } from 'src/theme';

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
  /* border-top: 1px solid #eee; */
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  z-index: 10;
  @media (min-width: ${breakpoints.small}) {
    justify-content: left;
    position: static;
    box-shadow: none;
    max-width: 1200px;
    margin: 0 auto;
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
    & > svg {
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
  & > svg {
    font-size: 20px;
  }
`;

const MobileMainNav = styled.nav`
  padding-top: 12px;
  display: block;
`;

const MobileNavLink = styled(NavLink)`
  flex-direction: row;
  font-size: ${fontSize[20]};
  & > svg {
    padding-right: 10px;
    min-width: 34px;
    font-size: 24px;
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
  & > svg {
    padding-right: 6px;
    font-size: 20px;
    min-width: 24px;
  }
  &[aria-current] {
    border-bottom: 2px solid ${({ theme }) => theme.header.mainNavList.hoverColor};
  }
`;

export { Nav, NavLink, MobileNavLink, MobileFooter, MobileMainNav, MobileFooterLink };
