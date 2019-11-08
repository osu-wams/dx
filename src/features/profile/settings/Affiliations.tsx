import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Fieldset, Legend, FormGroup } from '../../../ui/forms';

export default function SwitchesGroup() {
  const [state, setState] = React.useState({
    firstYear: true,
    international: false,
    graduate: true
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
          label="First year student"
        />
        <FormControlLabel
          control={
            <Switch
              checked={state.international}
              onChange={handleChange('international')}
              value="international"
            />
          }
          label="International student"
        />
        <FormControlLabel
          control={
            <Switch checked={state.graduate} onChange={handleChange('graduate')} value="graduate" />
          }
          label="Graduate student"
        />
      </FormGroup>
    </Fieldset>
  );
}
