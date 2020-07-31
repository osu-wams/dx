import React, { FC, useContext } from 'react';
import { faUserCog } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardIcon, CardFooter } from 'src/ui/Card';
import Affiliations from './settings/Affiliations';
import Theme from './settings/Theme';
import Campus from './settings/Campus';
import { ThemeProvider } from '@material-ui/core/styles';
import getMUITheme from 'src/ui/MUITheme';
import { userState } from 'src/state/application';
import { useRecoilValue } from 'recoil';

const Settings: FC = () => {
  const user = useRecoilValue(userState);
  return (
    <ThemeProvider theme={getMUITheme(user.data.theme)}>
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
