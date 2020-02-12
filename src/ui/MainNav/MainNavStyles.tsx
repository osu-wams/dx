import { Link } from '@reach/router';
import { styled, themeSettings, breakpoints } from '../../theme';

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
  justify-content: center;
  z-index: 10;
  @media (min-width: ${breakpoints.small}) {
    position: static;
  }
`;

const NavLink = styled(Link)`
  display: flex;
  flex-direction: column;
  @media (min-width: ${breakpoints.small}) {
    flex-direction: row;
    font-size: ${themeSettings.fontSize[14]};
    & > svg {
      padding-right: 6px;
    }
  }
  border: none;
  align-items: center;
  margin: 0 8px;
  padding: 10px 4px 5px;
  line-height: 22px;
  font-size: ${themeSettings.fontSize[12]};
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

const MobileMainNav = styled.div`
  padding-top: 12px;
  display: block;
`;

const MobileNavLink = styled(NavLink)`
  flex-direction: row;
  font-size: ${themeSettings.fontSize[20]};

  & > svg {
    padding-right: 10px;
    min-width: 34px;
    font-size: 24px;
  }
`;

export { Nav, NavLink, MobileNavLink, MobileMainNav };
