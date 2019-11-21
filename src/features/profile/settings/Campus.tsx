import React, { useContext, useState, useEffect } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Fieldset, Legend } from '../../../ui/forms';
import { CAMPUS_CODES, postSettings } from '../../../api/user';
import { titleCase } from '../../../util/helpers';
import { UserContext } from '../../../App';
import { ISettingsProps } from '../Settings';

export const RadioButtonsGroup = (props: ISettingsProps) => {
  const { audienceOverride } = props.settings;
  const userContext = useContext(UserContext);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (audienceOverride) setValue(audienceOverride.campusCode || 'C');
  }, [audienceOverride]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = (event.target as HTMLInputElement).value;
    const { audienceOverride } = userContext.data;
    audienceOverride.campusCode = selectedValue;

    postSettings({ audienceOverride }).then(d => {
      userContext.setUser({
        ...userContext,
        data: { ...userContext.data, audienceOverride }
      });
    });
  };

  return (
    <Fieldset>
      {console.log('campus', value, audienceOverride)}
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
