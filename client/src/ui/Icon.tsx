import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Color } from '../theme';

const Icon = styled(FontAwesomeIcon)`
  color: ${props => props.color || Color['neutral-400']};
`;

export default Icon;
