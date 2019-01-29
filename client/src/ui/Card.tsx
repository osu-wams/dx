import styled from 'styled-components';
import { theme, colors, shadows } from '../theme';

const Card = styled.div`
  background-color: ${colors.white};
  border-radius: ${theme.roundedCorners};
  padding: ${theme.spacing.unit * 2}px;
  margin-bottom: ${theme.spacing.unit * 2}px;
  box-shadow: ${shadows[1]};
`;

export default Card;
