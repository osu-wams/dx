import styled from 'styled-components';
import { Color } from '../theme';

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${Color['neutral-200']};
  margin: 3rem 0;
`;

export default Divider;
