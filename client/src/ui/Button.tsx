import styled from 'styled-components';
import { colors } from '../theme';
import { Color } from 'csstype';

type Props = {
  bg: Color;
  fg: Color;
}

const Button = styled.button<Props>`
  background-color: ${props => props.bg || colors["orange-400"]};
  color: ${props => props.fg || colors["white"]};
  & + & {
    margin-left: ${props => props.theme.spacing.unit}px;
  }
`;

export default Button;
