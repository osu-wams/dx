import React, { useState, useEffect, useContext } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Fieldset, Legend } from 'src/ui/forms';
import { User } from '@osu-wams/hooks';
import { titleCase } from 'src/util/helpers';
import { defaultTheme } from 'src/theme/themes';
import { AppContext } from 'src/contexts/app-context';

const { postSettings, usersSettings } = User;

export const RadioButtonsGroup = () => {
  const { user, setTheme, themes } = useContext(AppContext);
  const [value, setValue] = useState(defaultTheme);

  useEffect(() => {
    setValue(user.data.theme || defaultTheme);
  }, [user.data]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = (event.target as HTMLInputElement).value;
    const settings = usersSettings(user.data);
    settings.theme = selectedValue;

    postSettings({ theme: selectedValue }).then((d) => {
      user.setUser({ ...user, data: { ...user.data, ...settings } });
      setTheme(selectedValue);
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
