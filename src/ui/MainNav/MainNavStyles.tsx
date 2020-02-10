import { Link } from '@reach/router';
import { styled, themeSettings } from '../../theme';

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  background: ${({ theme }) => theme.header.mainNavList.background};
  box-shadow: rgba(66, 62, 60, 0.1) 0 -10px 16px, rgba(105, 99, 97, 0.05) 0 -3px 16px;
  /* border-top: 1px solid #eee; */
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const NavLink = styled(Link)`
  display: flex;
  flex-direction: column;
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
  &:last-child {
    /* prevents last anchor link from being under the gradient */
    padding-right: 2rem;
  }
`;

export { Nav, NavLink };
