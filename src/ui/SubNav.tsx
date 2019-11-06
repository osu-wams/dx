import { Link } from '@reach/router';
import styled from 'styled-components';
import { theme, Color, breakpoints } from '../theme';

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
  border-bottom: 3px solid transparent;
  color: ${Color['neutral-600']};
  display: inline-block;
  text-align: center;
  font-size: ${theme.fontSize[16]};
  svg {
    margin-right: 0.5rem;
    color: ${Color['neutral-600']};
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
    border-bottom-color: ${Color['orange-400']};
  }
  & + a {
    margin-left: 2.6rem;
  }
`;

export { SubNav, SubNavLink };
