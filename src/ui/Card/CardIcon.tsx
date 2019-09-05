import React, {FC} from 'react';
import styled from 'styled-components';
import { IconDefinition } from '@fortawesome/pro-light-svg-icons';
import {Color, theme} from '../../theme';
import Icon from '../Icon';

const CardIcon: FC<{ icon: IconDefinition; count?: number }> = ({ icon, count }) => {
  return (
    <CardIconWrapper>
      <CardIconBase icon={icon} color={Color['neutral-550']} count={count} />
    </CardIconWrapper>
  );
};

const CardIconWrapper = styled.div`
  margin-right: 12px;
`;

const CardIconBase = styled(Icon)`
  font-size: ${theme.fontSize[24]};
`;

export default CardIcon;