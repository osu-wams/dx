import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { colors } from '../theme';

const Icon = styled(FontAwesomeIcon)`
  color: ${({ color }) => colors[color]};
`;

export default Icon;
