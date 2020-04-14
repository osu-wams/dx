import React, { useEffect, useState, useContext } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import styled from 'styled-components/macro';
import { Fieldset, Legend, FormGroup } from 'src/ui/forms';
import { User } from '@osu-wams/hooks';
import { themeSettings } from 'src/theme';
import { AppContext } from 'src/contexts/app-context';

const { postSettings, usersSettings, settingIsOverridden } = User;

const Label = styled.span`
  font-size: ${themeSettings.fontSize[16]};
  > span {
    color: ${({ theme }) => theme.features.profile.settings.emphasis.color};
  }
`;

export const SwitchesGroup = () => {
  const { user } = useContext(AppContext);
  const [state, setState] = useState({ firstYear: false, international: false, graduate: false });

  useEffect(() => {
    if (user.data.audienceOverride) {
      const { firstYear, graduate, international } = user.data.audienceOverride;
      setState({
        firstYear: firstYear ?? false,
        graduate: graduate ?? false,
        international: international ?? false,
      });
    }
  }, [user.data]);

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = (event.target as HTMLInputElement).checked;
    const settings = usersSettings(user.data);
    settings.audienceOverride![name] = checked;

    postSettings({ audienceOverride: settings.audienceOverride }).then((d) => {
      user.setUser({
        ...user,
        data: { ...user.data, ...settings },
      });
    });
  };

  return (
    <Fieldset>
      <Legend>Affiliations</Legend>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              data-testid="firstYear"
              checked={state.firstYear}
              onChange={handleChange('firstYear')}
            />
          }
          label={
            <Label>
              First Year Student
              <span>
                {settingIsOverridden(user.data, 'firstYear', state.firstYear, false)
                  ? ' (Override) '
                  : ''}
              </span>
            </Label>
          }
        />
        <FormControlLabel
          control={
            <Switch
              data-testid="international"
              checked={state.international}
              onChange={handleChange('international')}
            />
          }
          label={
            <Label>
              International Student
              <span>
                {settingIsOverridden(user.data, 'international', state.international, false)
                  ? ' (Override) '
                  : ''}
              </span>
            </Label>
          }
        />
        <FormControlLabel
          control={
            <Switch
              data-testid="graduate"
              checked={state.graduate}
              onChange={handleChange('graduate')}
            />
          }
          label={
            <Label>
              Graduate Student
              <span>
                {settingIsOverridden(user.data, 'graduate', state.graduate, false)
                  ? ' (Override) '
                  : ''}
              </span>
            </Label>
          }
        />
      </FormGroup>
    </Fieldset>
  );
};

export default SwitchesGroup;
