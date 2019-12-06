import React, { useEffect, useState, useContext } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Fieldset, Legend, FormGroup } from '../../../ui/forms';
import { postSettings, usersSettings } from '../../../api/user';
import { UserContext } from '../../../App';
import { styled, themeSettings } from '../../../theme';
import { settingIsOverridden } from '../../../api/user';

const Label = styled.span`
  font-size: ${themeSettings.fontSize[16]};
  > span {
    color: ${({ theme }) => theme.features.profile.settings.emphasis.color};
  }
`;

export const SwitchesGroup = () => {
  const userContext = useContext(UserContext);
  const [state, setState] = useState({ firstYear: false, international: false, graduate: false });

  useEffect(() => {
    if (userContext.data.audienceOverride) {
      const { firstYear, graduate, international } = userContext.data.audienceOverride;
      setState({
        firstYear: firstYear ?? false,
        graduate: graduate ?? false,
        international: international ?? false
      });
    }
  }, [userContext.data]);

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = (event.target as HTMLInputElement).checked;
    const settings = usersSettings(userContext.data);
    settings.audienceOverride![name] = checked;

    postSettings({ audienceOverride: settings.audienceOverride }).then(d => {
      userContext.setUser({
        ...userContext,
        data: { ...userContext.data, ...settings }
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
                {settingIsOverridden(userContext.data, 'firstYear', state.firstYear, false)
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
                {settingIsOverridden(userContext.data, 'international', state.international, false)
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
                {settingIsOverridden(userContext.data, 'graduate', state.graduate, false)
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
