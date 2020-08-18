import React, { useState, useEffect } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Fieldset, Legend } from 'src/ui/forms';
import { User } from '@osu-wams/hooks';
import { titleCase } from 'src/util/helpers';
import { defaultTheme, themesLookup } from 'src/theme/themes';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userState, themeState } from 'src/state/application';

const { postSettings, usersSettings } = User;

export const RadioButtonsGroup = () => {
  const themes = Object.keys(themesLookup);
  const [theme, setTheme] = useRecoilState(themeState); // eslint-disable-line
  const user = useRecoilValue(userState);
  const [value, setValue] = useState(defaultTheme);

  useEffect(() => {
    setValue(theme);
  }, [theme]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = (event.target as HTMLInputElement).value;
    const settings = usersSettings(user.data);
    settings.theme = selectedValue;

    postSettings({ theme: selectedValue }).then((d) => {
      // This hook needs to reach into the UserState and call the underlying
      // setter on the user object rather than the `setUser` on the
      // recoil state itself.
      user.setUser!({
        ...user,
        data: { ...user.data, ...settings },
      });
      setTheme(selectedValue);
      setValue(selectedValue);
    });
  };

  return (
    <Fieldset>
      <Legend>Theme</Legend>
      <RadioGroup aria-label="theme" name="theme" value={value} onChange={handleChange}>
        {themes.map((t) => (
          <FormControlLabel key={t} value={t} control={<Radio />} label={titleCase(t)} />
        ))}
      </RadioGroup>
    </Fieldset>
  );
};

export default RadioButtonsGroup;
