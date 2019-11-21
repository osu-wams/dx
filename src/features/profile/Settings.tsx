import React, { useContext, useEffect, useState, FC } from 'react';
import { faUserCog } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardIcon, CardFooter } from '../../ui/Card';
import Affiliations from './settings/Affiliations';
import Theme from './settings/Theme';
import Campus from './settings/Campus';
import { ThemeProvider } from '@material-ui/core/styles';
import MUITheme from '../../ui/MUITheme';
import { UserContext } from '../../App';
import {
  initialUser,
  usersCampus,
  hasAudience,
  CLASSIFICATIONS,
  IUserSettings
} from '../../api/user';

export interface ISettingsProps {
  settings: IUserSettings;
}

const Settings: FC = () => {
  const userContext = useContext(UserContext);
  const [settings, setSettings] = useState({
    theme: initialUser.theme,
    audienceOverride: initialUser.audienceOverride
  });

  useEffect(() => {
    setSettings({
      theme: userContext.data.theme,
      audienceOverride: {
        campusCode: usersCampus(userContext.data).campusCode,
        firstYear: hasAudience(userContext.data, { audiences: [CLASSIFICATIONS.firstYear] }),
        international: hasAudience(userContext.data, {
          audiences: [CLASSIFICATIONS.international]
        }),
        graduate: hasAudience(userContext.data, { audiences: [CLASSIFICATIONS.graduate] })
      }
    });
  }, [userContext.data]);

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
          <Campus settings={settings} />
          <Affiliations settings={settings} />
          <Theme settings={settings} />
        </CardContent>

        <CardFooter></CardFooter>
      </Card>
    </ThemeProvider>
  );
};

export default Settings;
