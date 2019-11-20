import React, { useState, useEffect, useContext } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Fieldset, Legend } from '../../../ui/forms';
import { usersCampus, CAMPUS_CODES, postSettings } from '../../../api/user';
import { titleCase } from '../../../util/helpers';
import { UserContext } from '../../../App';

export const RadioButtonsGroup = () => {
  const userContext = useContext(UserContext);
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(usersCampus(userContext.data).campusCode);
  }, [userContext.data]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = (event.target as HTMLInputElement).value;
    postSettings({ audienceOverride: { campusCode: selectedValue } }).then(d => {
      userContext.setUser({
        ...userContext,
        data: { ...userContext.data, audienceOverride: { campusCode: selectedValue } }
      });
      setValue(selectedValue);
    });
  };

  return (
    <Fieldset>
      {console.log('value', value)}
      <Legend>Campus</Legend>
      <RadioGroup aria-label="campus" name="campus" value={value} onChange={handleChange}>
        {Object.keys(CAMPUS_CODES).map(key => (
          <FormControlLabel
            key={key}
            value={CAMPUS_CODES[key]}
            control={<Radio />}
            label={titleCase(key)}
          />
        ))}
      </RadioGroup>
    </Fieldset>
  );
};

export default RadioButtonsGroup;
