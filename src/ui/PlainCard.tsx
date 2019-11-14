import React, { FC } from 'react';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { themeSettings, styled } from '../theme';

const Header = styled.h2`
  color: ${({ theme }) => theme.ui.plainCard.header.color};
  font-weight: normal;
  font-size: ${themeSettings.fontSize[18]};
  margin: 0 0 ${themeSettings.spacing.unit * 2}px 0;
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
