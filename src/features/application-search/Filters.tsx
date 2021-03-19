import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { faUserCog } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardIcon, CardFooter, CardContent } from 'src/ui/Card';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Checkbox } from '@material-ui/core';
import { Fieldset, Legend, FormGroup } from 'src/ui/forms';
import getMUITheme from 'src/ui/MUITheme';
import { ThemeProvider } from '@material-ui/core/styles';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  applicationTypeFilterState,
  applicationAudienceFilterState,
  applicationCampusFilterState,
  applicationFilterState,
} from 'src/state/applicationSearch';
import { themeState } from 'src/state';
import { spacing } from 'src/theme/theme-settings';
import { userState } from 'src/state';
import { User } from '@osu-wams/hooks';
import { isEmployeeState } from 'src/state/application';

const FieldsetList = styled.div`
  > fieldset:last-child {
    border: none;
  }
`;

const StyledFieldset = styled(Fieldset)`
  margin: ${spacing.xm} 0 0 0;
  border: none;
  border-bottom: solid 1px ${({ theme }) => theme.body.background};
  > legend {
    font-weight: 400;
  }
`;

export const FilterByType = () => {
  const user = useRecoilValue(userState);
  const theme = useRecoilValue(themeState);
  const setTypes = useSetRecoilState(applicationTypeFilterState);
  const setAudiences = useSetRecoilState(applicationAudienceFilterState);
  const setCampuses = useSetRecoilState(applicationCampusFilterState);
  const [state, setState] = useRecoilState(applicationFilterState);
  const isEmployee = useRecoilValue(isEmployeeState);

  useEffect(() => {
    setAudiences([state.students, state.employees].filter((a) => a.checked));
    setCampuses([state.corvallis, state.bend, state.ecampus].filter((c) => c.checked));
    setTypes(
      [
        state.resources,
        state.announcements,
        state.events,
        state.courses,
        state.pastCourses,
        state.canvas,
        state.notifications,
        state.trainings,
      ].filter((t) => t.checked)
    );
  }, [state]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setState({
      ...state,
      [event.target.name]: { ...state[event.target.name], checked },
    });
  };

  return (
    <ThemeProvider theme={getMUITheme(theme)}>
      <FieldsetList>
        <StyledFieldset>
          <Legend>Type</Legend>
          <FormGroup>
            {[
              state.resources,
              state.announcements,
              state.events,
              state.courses,
              state.pastCourses,
              state.canvas,
              state.notifications,
              state.trainings,
            ]
              .filter(({ employeeOnly }) => !employeeOnly || (isEmployee && employeeOnly))
              .map(({ checked, name, label }, index) => {
                return (
                  <FormControlLabel
                    key={`type-${index}`}
                    control={<Checkbox checked={checked} onChange={handleChange} name={name} />}
                    label={label}
                  />
                );
              })}
          </FormGroup>
        </StyledFieldset>
        {isEmployee && (
          <StyledFieldset>
            <Legend>Audience</Legend>
            <FormGroup>
              {[state.students, state.employees].map(({ checked, name, label }, index) => (
                <FormControlLabel
                  key={`audience-${index}`}
                  control={<Checkbox checked={checked} onChange={handleChange} name={name} />}
                  label={label}
                />
              ))}
            </FormGroup>
          </StyledFieldset>
        )}
        <StyledFieldset>
          <Legend>Campus</Legend>
          <FormGroup>
            {[state.corvallis, state.bend, state.ecampus].map(({ checked, name, label }, index) => (
              <FormControlLabel
                key={`campus-${index}`}
                control={<Checkbox checked={checked} onChange={handleChange} name={name} />}
                label={label}
              />
            ))}
          </FormGroup>
        </StyledFieldset>
      </FieldsetList>
    </ThemeProvider>
  );
};

const Filters: React.FC = () => {
  return (
    <Card>
      <CardHeader title="Filter Results" badge={<CardIcon icon={faUserCog} />} />
      <CardContent flush>
        <FilterByType />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default Filters;
