import React, { useState, useEffect, useContext } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Fieldset, Legend } from '../../../ui/forms';
import { postSettings } from '../../../api/user';
import { titleCase } from '../../../util/helpers';
import { UserContext, AppContext } from '../../../App';

export const RadioButtonsGroup = () => {
  const appContext = useContext(AppContext);
  const userContext = useContext(UserContext);
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(appContext.selectedTheme);
  }, [appContext.selectedTheme]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = (event.target as HTMLInputElement).value;
    postSettings({ theme: selectedValue }).then(d => {
      userContext.setUser({
        ...userContext,
        data: { ...userContext.data, theme: selectedValue }
      });
      setValue(selectedValue);
      appContext.setTheme(selectedValue);
    });
  };

  return (
    <Fieldset>
      <Legend>Theme</Legend>
      <RadioGroup aria-label="theme" name="theme" value={value} onChange={handleChange}>
        {appContext.themes.map(t => (
          <FormControlLabel key={t} value={t} control={<Radio />} label={titleCase(t)} />
        ))}
      </RadioGroup>
    </Fieldset>
  );
};

export default RadioButtonsGroup;
