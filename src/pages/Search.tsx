import React from 'react';
import PageTitle from '../ui/PageTitle';
import { MainGridWrapper } from '../theme';
import { ThreeCol } from 'src/ui/Grids';
import { SearchResultListItem } from 'src/features/application-search/SearchResultListItem';

const Search = () => {
  const filteredItems = useRecoilValue(filteredApplicationSearchState);

  return (
    <MainGridWrapper data-testid="search-page">
      <ThreeCol>
        <div className="col-1">
          <Settings />
        </div>
        <div className="col-2">
          <PageTitle title="Search Results" />
          {filteredItems.length > 0 &&
            filteredItems.map((i) => (
              <SearchResultListItem key={`${i.item.type}-${i.item.id}`} searchResult={i} />
            ))}
        </div>
        <div className="col-3">
          <People /> <Places />
        </div>
      </ThreeCol>
    </MainGridWrapper>
  );
};

export { Search };

import { faUser, faUserCog } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardIcon, CardFooter } from 'src/ui/Card';
import { ListItem, ListItemContentLink } from 'src/ui/List';

const Settings: React.FC = () => {
  return (
    <Card>
      <CardHeader title="Filter Results" badge={<CardIcon icon={faUserCog} />} />
      <CardContent>
        <FilterByType />
      </CardContent>

      <CardFooter></CardFooter>
    </Card>
  );
};

const People: React.FC = () => {
  return (
    <Card>
      <CardHeader title="People" badge={<CardIcon icon={faUser} />} />
      <CardContent>
        <ListItemContentLink>Mauricio Cordoba</ListItemContentLink>
        <ListItemContentLink>Michael McDonald</ListItemContentLink>
        <ListItemContentLink>Josh Gum</ListItemContentLink>
      </CardContent>

      <CardFooter></CardFooter>
    </Card>
  );
};

const Places: React.FC = () => {
  return (
    <Card>
      <CardHeader title="Places" badge={<CardIcon icon={faUser} />} />
      <CardContent>
        <ListItem>Library</ListItem>
      </CardContent>

      <CardFooter></CardFooter>
    </Card>
  );
};

export default Settings;

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
// import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { Fieldset, Legend, FormGroup } from 'src/ui/forms';
import { filteredApplicationSearchState } from 'src/state/search';
import { useRecoilValue } from 'recoil';

export const FilterByType = () => {
  // const classes = useStyles();
  const [state, setState] = React.useState({
    resources: false,
    events: false,
    current: false,
    past: false,
    assignments: false,
    canvas: false,
    notifications: false,
    students: false,
    employees: false,
    corvallis: false,
    bend: false,
    ecampus: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const {
    resources,
    events,
    current,
    past,
    canvas,
    assignments,
    notifications,
    students,
    employees,
    corvallis,
    bend,
    ecampus,
  } = state;

  return (
    <div className="">
      <Fieldset>
        <Legend>Type</Legend>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={resources} onChange={handleChange} name="resources" />}
            label="Resources"
          />
          <FormControlLabel
            control={<Checkbox checked={events} onChange={handleChange} name="events" />}
            label="Events"
          />
          <FormControlLabel
            control={<Checkbox checked={current} onChange={handleChange} name="current" />}
            label="Current Courses"
          />
          <FormControlLabel
            control={<Checkbox checked={past} onChange={handleChange} name="past" />}
            label="Past Courses"
          />
          <FormControlLabel
            control={<Checkbox checked={assignments} onChange={handleChange} name="assignments" />}
            label="Assignments"
          />
          <FormControlLabel
            control={<Checkbox checked={canvas} onChange={handleChange} name="canvas" />}
            label="Canvas Announcements"
          />
          <FormControlLabel
            control={
              <Checkbox checked={notifications} onChange={handleChange} name="notifications" />
            }
            label="Notifications"
          />
        </FormGroup>
      </Fieldset>
      <Fieldset>
        <Legend>Audience</Legend>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={students} onChange={handleChange} name="students" />}
            label="Students"
          />
          <FormControlLabel
            control={<Checkbox checked={employees} onChange={handleChange} name="employees" />}
            label="Employees"
          />
        </FormGroup>
      </Fieldset>
      <Fieldset>
        <Legend>Campus</Legend>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={corvallis} onChange={handleChange} name="corvallis" />}
            label="Corvallis"
          />
          <FormControlLabel
            control={<Checkbox checked={bend} onChange={handleChange} name="bend" />}
            label="Bend"
          />
          <FormControlLabel
            control={<Checkbox checked={ecampus} onChange={handleChange} name="ecampus" />}
            label="Ecampus"
          />
        </FormGroup>
      </Fieldset>
    </div>
  );
};
