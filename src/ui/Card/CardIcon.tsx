import React, { FC, useContext } from 'react';
import { IconDefinition } from '@fortawesome/pro-light-svg-icons';
import { themeSettings, styled, ThemeContext } from '../../theme';
import Icon from '../Icon';

const CardIcon: FC<{ icon: IconDefinition; count?: number }> = ({ icon, count }) => {
  const themeContext = useContext(ThemeContext);

  return (
    <CardIconWrapper>
      <CardIconBase icon={icon} color={themeContext.ui.card.icon.color} count={count} />
    </CardIconWrapper>
  );
};

const CardIconWrapper = styled.div`
  margin-right: 12px;
`;

const CardIconBase = styled(Icon)`
  font-size: ${themeSettings.fontSize[24]};
`;

export default CardIcon;
