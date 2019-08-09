import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Color } from '../theme';

type IconProps = {
  bg?: Color;
  color?: Color;
};
const Icon = styled(FontAwesomeIcon)<IconProps>`
  color: ${props => props.color || Color['neutral-400']};
  background-color: ${props => props.bg || 'transparent'};
  padding: ${props => (props.bg ? '.5rem' : '0')};
`;

export default Icon;
