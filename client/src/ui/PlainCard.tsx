import React, { FC } from 'react';
import styled from 'styled-components';
import { CardBase } from '../ui/Card';
import { theme, Color } from '../theme';

const Card = styled(CardBase)`
  padding: ${theme.spacing.unit * 2}px;
`;
const Header = styled.h2`
  color: ${Color['neutral-550']};
  font-weight: normal;
  font-size: ${theme.fontSize[18]};
  margin: 0 0 ${theme.spacing.unit * 2}px 0;
`;

const PlainCard: FC<{ title: string }> = ({ title, children, ...props }) => {
  return (
    <Card {...props}>
      <Header>{title}</Header>
      {children}
    </Card>
  );
};

export default PlainCard;
