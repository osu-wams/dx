import React, { useEffect, useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import styled from 'styled-components/macro';
import { Fieldset, Legend, FormGroup } from 'src/ui/forms';
import { State, User } from '@osu-wams/hooks';
import { fontSize } from 'src/theme';
import { useRecoilValue } from 'recoil';
import { Event } from 'src/util/gaTracking';

const { postSettings, usersSettings, settingIsOverridden } = User;

const Label = styled.span`
  font-size: ${fontSize[16]};
  > span {
    color: ${({ theme }) => theme.features.profile.settings.emphasis.color};
  }
`;

export const SwitchesGroup = () => {
  const user = useRecoilValue(State.userState);
  const [state, setState] = useState<{
    firstYear: boolean;
    graduate: boolean;
    international: boolean;
  }>({ firstYear: false, graduate: false, international: false });

  useEffect(() => {
    if (user.data) {
      if (user.data.audienceOverride && Object.keys(user.data.audienceOverride).length) {
        const { firstYear, graduate, international } = user.data.audienceOverride;
        setState({
          firstYear: firstYear ?? false,
          graduate: graduate ?? false,
          international: international ?? false,
        });
      } else {
        setState({
          firstYear: User.isFirstYear(user.data),
          graduate: User.isGraduate(user.data),
          international: User.isInternational(user.data),
        });
      }
    }
  }, [user.data]);

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = (event.target as HTMLInputElement).checked;
    const settings = usersSettings(user.data);
    settings.audienceOverride![name] = checked;
    Event('profile', 'Audience Override', name);

    postSettings({ audienceOverride: settings.audienceOverride }).then((d) => {
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
    <Fieldset>
      <Legend>Affiliations</Legend>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch checked={User.isFirstYear(user.data)} onChange={handleChange('firstYear')} />
          }
          label={
            <Label>
              First Year Student
              <span>
                {settingIsOverridden(
                  user.data,
                  'firstYear',
                  state.firstYear,
                  User.isFirstYear(user.data, false)
                )
                  ? ' (Override) '
                  : ''}
              </span>
            </Label>
          }
        />
        <FormControlLabel
          control={
            <Switch
              checked={User.isInternational(user.data)}
              onChange={handleChange('international')}
            />
          }
          label={
            <Label>
              International Student
              <span>
                {settingIsOverridden(
                  user.data,
                  'international',
                  state.international,
                  User.isInternational(user.data, false)
                )
                  ? ' (Override) '
                  : ''}
              </span>
            </Label>
          }
        />
        <FormControlLabel
          control={
            <Switch checked={User.isGraduate(user.data)} onChange={handleChange('graduate')} />
          }
          label={
            <Label>
              Graduate Student
              <span>
                {settingIsOverridden(
                  user.data,
                  'graduate',
                  state.graduate,
                  User.isGraduate(user.data, false)
                )
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
