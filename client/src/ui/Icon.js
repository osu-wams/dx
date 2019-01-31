import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Color } from '../theme';

const Icon = styled(FontAwesomeIcon)`
  color: ${props => props.color || Color['orange-400']};
`;

export default Icon;
