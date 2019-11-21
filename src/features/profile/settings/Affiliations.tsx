import React, { useEffect, useState, useContext } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Fieldset, Legend, FormGroup } from '../../../ui/forms';
import { hasAudience, CLASSIFICATIONS, postSettings, IUserSettings } from '../../../api/user';
import { UserContext } from '../../../App';
import { ISettingsProps } from '../Settings';

export const SwitchesGroup = (props: ISettingsProps) => {
  const userContext = useContext(UserContext);
  const [state, setState] = useState({ firstYear: false, international: false, graduate: false });

  useEffect(() => {
    if (props.settings.audienceOverride) {
      const { firstYear, graduate, international } = props.settings.audienceOverride;
      setState({
        firstYear: firstYear !== undefined ? firstYear : false,
        graduate: graduate !== undefined ? graduate : false,
        international: international !== undefined ? international : false
      });
    }
  }, [props.settings]);

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = (event.target as HTMLInputElement).checked;
    const { audienceOverride } = userContext.data;
    audienceOverride[name] = checked;
    postSettings({ audienceOverride }).then(d => {
      console.log(audienceOverride);
      userContext.setUser({
        ...userContext,
        data: { ...userContext.data, audienceOverride }
      });
    });
  };

  return (
    <Fieldset>
      <Legend>Affiliations</Legend>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={state.firstYear} onChange={handleChange('firstYear')} />}
          label="First Year Student"
        />
        <FormControlLabel
          control={
            <Switch checked={state.international} onChange={handleChange('international')} />
          }
          label="International Student"
        />
        <FormControlLabel
          control={<Switch checked={state.graduate} onChange={handleChange('graduate')} />}
          label="Graduate Student"
        />
      </FormGroup>
    </Fieldset>
  );
};

export default SwitchesGroup;
