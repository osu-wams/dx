import { Link } from '@reach/router';
import styled from 'styled-components';
import { theme, Color } from '../../theme';

const SubNav = styled.nav`
  display: flex;
  flex-direction: row;
  height: 4rem;
  justify-content: center;
  margin: 0 0 1.6rem 0;
`;

const SubNavLink = styled(Link)`
  background: ${Color.white};
  border: 1px solid ${Color['neutral-300']};
  padding: 0.4rem 2rem 0;
  line-height: 30px;
  text-decoration: none;
  color: ${Color['neutral-700']};
  display: inline-block;
  text-align: center;
  font-size: ${theme.fontSize[14]};
  &:active,
  &:focus,
  &:hover,
  &[aria-current] {
    background: transparent;
    color: ${Color['neutral-500']};
  }
  :first-child {
    border-radius: 8px 0 0 8px;
  }
  :last-child {
    border-radius: 0 8px 8px 0;
  }
  & + & {
    border-left: none;
  }
`;

export { SubNav, SubNavLink };
