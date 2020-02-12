import { Link } from '@reach/router';
import { styled } from '../../theme';

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
    font-size: 24px;
  }
  &:last-child {
    /* prevents last anchor link from being under the gradient */
    padding-right: 2rem;
  }
`;

export { Nav, NavLink };
