import React, { useState, useContext } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Fieldset, Legend, FormGroup } from '../../../ui/forms';
import { hasAudience, CLASSIFICATIONS } from '../../../api/user';
import { UserContext } from '../../../App';

export const SwitchesGroup = () => {
  const userContext = useContext(UserContext);
  const [state, setState] = useState({
    firstYear: hasAudience(userContext.data, { audiences: [CLASSIFICATIONS.firstYear] }),
    international: hasAudience(userContext.data, { audiences: [CLASSIFICATIONS.international] }),
    graduate: hasAudience(userContext.data, { audiences: [CLASSIFICATIONS.graduate] })
  });

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <Fieldset>
      <Legend>Affiliations</Legend>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={state.firstYear}
              onChange={handleChange('firstYear')}
              value="firstYear"
            />
          }
          label="First Year Student"
        />
        <FormControlLabel
          control={
            <Switch
              checked={state.international}
              onChange={handleChange('international')}
              value="international"
            />
          }
          label="International Student"
        />
        <FormControlLabel
          control={
            <Switch checked={state.graduate} onChange={handleChange('graduate')} value="graduate" />
          }
          label="Graduate Student"
        />
      </FormGroup>
    </Fieldset>
  );
};

export default SwitchesGroup;
