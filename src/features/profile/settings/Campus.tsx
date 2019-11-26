import React, { useContext, useState, useEffect } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Fieldset, Legend } from '../../../ui/forms';
import {
  CAMPUS_CODES,
  postSettings,
  settingIsDefault,
  usersSettings,
  defaultCampus
} from '../../../api/user';
import { titleCase } from '../../../util/helpers';
import { UserContext } from '../../../App';
import { styled, themeSettings } from '../../../theme';

const Label = styled.span`
  font-size: ${themeSettings.fontSize[16]};
  > span {
    color: ${({ theme }) => theme.ui.highlights.emphasis.color};
  }
`;

export const RadioButtonsGroup = () => {
  const userContext = useContext(UserContext);
  const [value, setValue] = useState(defaultCampus);

  useEffect(() => {
    setValue(userContext.data.audienceOverride.campusCode || defaultCampus);
  }, [userContext.data]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = (event.target as HTMLInputElement).value;
    const settings = usersSettings(userContext.data);
    settings.audienceOverride!.campusCode = selectedValue;

    postSettings({ audienceOverride: settings.audienceOverride }).then(d => {
      userContext.setUser({
        ...userContext,
        data: { ...userContext.data, ...settings }
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
                  {settingIsDefault(
                    userContext.data,
                    'campusCode',
                    CAMPUS_CODES[key],
                    defaultCampus
                  )
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
