import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Fieldset, Legend } from '../../../ui/forms';

export default function RadioButtonsGroup() {
  const [value, setValue] = React.useState('corvallis');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <Fieldset>
      <Legend>Campus</Legend>
      <RadioGroup aria-label="campus" name="campus" value={value} onChange={handleChange}>
        <FormControlLabel value="corvallis" control={<Radio />} label="Corvallis (Primary)" />
        <FormControlLabel value="bend" control={<Radio />} label="Bend" />
        <FormControlLabel value="ecampus" control={<Radio />} label="Ecampus" />
      </RadioGroup>
    </Fieldset>
  );
}
