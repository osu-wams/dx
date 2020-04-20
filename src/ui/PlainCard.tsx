import React, { FC } from 'react';
import styled from 'styled-components/macro';
import { Card, CardContent, CardFooter } from 'src/ui/Card';
import { fontSize, spacing } from 'src/theme';

const Header = styled.h2`
  color: ${({ theme }) => theme.ui.plainCard.header.color};
  font-weight: normal;
  font-size: ${fontSize[18]};
  margin: 0 0 ${spacing.default} 0;
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
