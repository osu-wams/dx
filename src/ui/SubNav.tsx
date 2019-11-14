import { Link } from '@reach/router';
import { themeSettings, breakpoints, styled } from '../theme';

const SubNav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 0 0 1.6rem 0;
  @media (min-width: ${breakpoints[768]}) {
    max-width: ${breakpoints[1024]};
    margin: -4rem auto 2rem;
    justify-content: flex-end;
  }
`;

const SubNavLink = styled(Link)`
  padding: 0.2rem 0;
  line-height: 20px;
  text-decoration: none;
  border-bottom: 3px solid ${({ theme }) => theme.ui.subNav.link.borderBottom};
  color: ${({ theme }) => theme.ui.subNav.link.color};
  display: inline-block;
  text-align: center;
  font-size: ${themeSettings.fontSize[16]};
  svg {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.ui.subNav.link.svg.color};
  }
  &[aria-current] {
    font-weight: 600;
  }
  &:active,
  &:focus,
  &:hover,
  &[aria-current],
  &:active svg,
  &:focus svg,
  &:hover svg,
  &[aria-current] svg {
    border-bottom-color: ${({ theme }) => theme.ui.subNav.link.currentSvg.borderBottom};
  }
  & + a {
    margin-left: 2.6rem;
  }
`;

export { SubNav, SubNavLink };
