import React, { FC } from 'react';
import { faCogs } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardIcon, CardFooter } from 'src/ui/Card';
import { Fieldset, Legend, FormGroup } from 'src/ui/forms';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useRecoilValue } from 'recoil';
import { userState } from 'src/state/application';
import { User, Admin } from '@osu-wams/hooks';
import Button from 'src/ui/Button';
import { Event } from 'src/util/gaTracking';

const { postSettings, usersSettings } = User;

const AdminSettings: FC = () => {
  const user = useRecoilValue(userState);
  const [devTools, setDevTools] = React.useState<boolean>(user.data.devTools ?? false);
  const [disabled, setDisabled] = React.useState<boolean>(false);

  React.useEffect(() => {
    setDevTools(user.data.devTools ?? false);
  }, [user.data]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = (event.target as HTMLInputElement).checked;
    const settings = usersSettings({ ...user.data, devTools: checked });

    postSettings({ devTools: checked }).then((d) => {
      // This hook needs to reach into the UserState and call the underlying
      // setter on the user object rather than the `setUser` on the
      // recoil state itself.
      user.setUser!({
        ...user,
        data: { ...user.data, ...settings },
      });
    });
  };

  return (
    <Card>
      <CardHeader title="Admin Settings" badge={<CardIcon icon={faCogs} />} />
      <CardContent>
        <p>Only administrators have access to these settings.</p>
        <Fieldset>
          <Legend>Developer</Legend>
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={devTools} onChange={handleChange} />}
              label="ReactQuery DevTools"
            />
          </FormGroup>
        </Fieldset>

        <Fieldset>
          <Legend>Admin Actions</Legend>
          <Button
            onClick={() => {
              Admin.getResetApiCache();
              Event('admin', 'Reset all API Caches');
              setDisabled(true);
            }}
            disabled={disabled}
          >
            Clear All API Caches
          </Button>
          {disabled && <span style={{ marginLeft: '10px' }}>API Caches have been cleared</span>}
        </Fieldset>
      </CardContent>

      <CardFooter></CardFooter>
    </Card>
  );
};

export { AdminSettings };
