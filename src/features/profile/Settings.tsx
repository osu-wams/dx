import React, { FC } from 'react';
import { faUserCog } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardIcon, CardFooter } from '../../ui/Card';
import Affiliations from './settings/Affiliations';
import Theme from './settings/Theme';
import Campus from './settings/Campus';
import { ThemeProvider } from '@material-ui/core/styles';
import MUITheme from '../../ui/MUITheme';

const Settings: FC = () => {
  return (
    <ThemeProvider theme={MUITheme}>
      <Card>
        <CardHeader title="Dashboard Settings" badge={<CardIcon icon={faUserCog} />} />
        <CardContent>
          <p>
            Toggle these settings to reveal different announcements, resources, events and features
            based on who you are. By default, these settings are configured automatically based on
            what we know about you.
          </p>
          <Campus />
          <Affiliations />
          {process.env.REACT_APP_EXPERIMENTAL === 'true' && <Theme />}
        </CardContent>

        <CardFooter></CardFooter>
      </Card>
    </ThemeProvider>
  );
};

export default Settings;
