import React, { useContext, useState, useEffect } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Fieldset, Legend } from '../../../ui/forms';
import { User } from '@osu-wams/hooks';
import { titleCase } from '../../../util/helpers';
import { styled, themeSettings } from '../../../theme';
import { AppContext } from 'src/contexts/app-context';

const { CAMPUS_CODES, postSettings, settingIsDefault, usersSettings, DEFAULT_CAMPUS } = User;

const Label = styled.span`
  font-size: ${themeSettings.fontSize[16]};
  > span {
    color: ${({ theme }) => theme.ui.highlights.emphasis.color};
  }
`;

export const RadioButtonsGroup = () => {
  const { user } = useContext(AppContext);
  const [value, setValue] = useState(DEFAULT_CAMPUS);

  useEffect(() => {
    setValue(user.data.audienceOverride.campusCode || DEFAULT_CAMPUS);
  }, [user.data]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = (event.target as HTMLInputElement).value;
    const settings = usersSettings(user.data);
    settings.audienceOverride!.campusCode = selectedValue;

    postSettings({ audienceOverride: settings.audienceOverride }).then(d => {
      user.setUser({
        ...user,
        data: { ...user.data, ...settings }
      });
    });
  };

  return (
    <Fieldset>
      <Legend>Campus</Legend>
      <RadioGroup aria-label="campus" name="campus" value={value} onChange={handleChange}>
        {Object.keys(CAMPUS_CODES).map(key => (
          <FormControlLabel
            key={key}
            value={CAMPUS_CODES[key]}
            control={<Radio data-testid={key} />}
            label={
              <Label>
                {titleCase(key)}
                <span>
                  {settingIsDefault(user.data, 'campusCode', CAMPUS_CODES[key], DEFAULT_CAMPUS)
                    ? ' (Default) '
                    : ''}
                </span>
              </Label>
            }
          />
        ))}
      </RadioGroup>
    </Fieldset>
  );
};

export default RadioButtonsGroup;
