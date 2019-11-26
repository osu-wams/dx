import React, { useState, useEffect, useContext } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Fieldset, Legend } from '../../../ui/forms';
import { postSettings, usersSettings } from '../../../api/user';
import { titleCase } from '../../../util/helpers';
import { UserContext, AppContext } from '../../../App';
import { defaultTheme } from '../../../theme/themes';

export const RadioButtonsGroup = () => {
  const appContext = useContext(AppContext);
  const userContext = useContext(UserContext);
  const [value, setValue] = useState(defaultTheme);

  useEffect(() => {
    setValue(userContext.data.theme || defaultTheme);
  }, [userContext.data]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = (event.target as HTMLInputElement).value;
    const settings = usersSettings(userContext.data);
    settings.theme = selectedValue;

    postSettings({ theme: selectedValue }).then(d => {
      userContext.setUser({
        ...userContext,
        data: { ...userContext.data, ...settings }
      });
      appContext.setTheme(selectedValue);
    });
  };

  return (
    <Fieldset>
      <Legend>Theme</Legend>
      <RadioGroup aria-label="theme" name="theme" value={value} onChange={handleChange}>
        {appContext.themes.map(t => (
          <FormControlLabel
            key={t}
            value={t}
            control={<Radio data-testid={t} />}
            label={titleCase(t)}
          />
        ))}
      </RadioGroup>
    </Fieldset>
  );
};

export default RadioButtonsGroup;
