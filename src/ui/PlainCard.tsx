import React, { FC } from 'react';
import styled from 'styled-components';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { theme, Color } from '../theme';

const Header = styled.h2`
  color: ${Color['neutral-550']};
  font-weight: normal;
  font-size: ${theme.fontSize[18]};
  margin: 0 0 ${theme.spacing.unit * 2}px 0;
`;

const PlainCard: FC<{ title?: string }> = ({ title, children, ...props }) => {
  return (
    <Card collapsing={false}>
      {title && <Header>{title}</Header>}
      <CardContent>{children}</CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default PlainCard;
