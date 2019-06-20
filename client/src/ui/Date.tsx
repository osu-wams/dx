import styled from 'styled-components';
import { Color, theme } from '../theme';

const Date = styled.div`
  margin: 0 auto;
  text-align: center;
  color: ${Color['orange-400']};
  width: 3rem;
  line-height: 1.1;
  & + div {
    padding-left: 1.5rem;
  }
`;

const DateDay = styled.div`
  font-size: ${theme.fontSize[24]};
`;

const DateMonth = styled.div`
  font-size: ${theme.fontSize[14]};
  text-transform: uppercase;
`;

export { Date, DateMonth, DateDay };
