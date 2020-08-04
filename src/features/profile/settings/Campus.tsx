import React, { useState, useEffect } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import styled from 'styled-components/macro';
import { Fieldset, Legend } from 'src/ui/forms';
import { User } from '@osu-wams/hooks';
import { titleCase } from 'src/util/helpers';
import { fontSize } from 'src/theme';
import { userState } from 'src/state/application';
import { useRecoilState } from 'recoil';

const { CAMPUS_CODES, postSettings, settingIsDefault, usersSettings, DEFAULT_CAMPUS } = User;

const Label = styled.span`
  font-size: ${fontSize[16]};
  > span {
    color: ${({ theme }) => theme.ui.highlights.emphasis.color};
  }
`;

export const RadioButtonsGroup = () => {
  const [user, setUser] = useRecoilState(userState);
  const [value, setValue] = useState(DEFAULT_CAMPUS);

  useEffect(() => {
    setValue(user.data.audienceOverride?.campusCode || DEFAULT_CAMPUS);
  }, [user.data]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = (event.target as HTMLInputElement).value;
    const settings = usersSettings(user.data);
    settings.audienceOverride!.campusCode = selectedValue;

    postSettings({ audienceOverride: settings.audienceOverride }).then((d) => {
      setUser({
        ...user,
        data: { ...user.data, ...settings },
      });
    });
  };

  return (
    <Fieldset>
      <Legend>Campus</Legend>
      <RadioGroup aria-label="campus" name="campus" value={value} onChange={handleChange}>
        {Object.keys(CAMPUS_CODES).map((key) => (
          <FormControlLabel
            key={key}
            value={CAMPUS_CODES[key][0]}
            control={<Radio data-testid={key} />}
            label={
              <Label>
                {titleCase(key)}
                <span>
                  {CAMPUS_CODES[key].some((c) =>
                    settingIsDefault(user.data, 'campusCode', c, DEFAULT_CAMPUS)
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
