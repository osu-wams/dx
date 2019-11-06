import React, { FC } from 'react';
import styled from 'styled-components';
import { faUserCog } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardIcon, CardFooter } from '../../ui/Card';
import { Color, theme } from '../../theme';

const Settings: FC = () => {
  return (
    <Card>
      <CardHeader title="Dashboard Settings" badge={<CardIcon icon={faUserCog} />} />
      <CardContent>
        <p>
          Toggle these settings to reveal different announcements, resources, events and features
          based on who you are. By default, these settings are configured automatically based on
          what we know about you.
        </p>
        <Subtitle>Campus</Subtitle>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

const Subtitle = styled.h3`
  margin: 0px;
  color: ${Color['neutral-550']};
  font-weight: 600;
`;

export default Settings;
