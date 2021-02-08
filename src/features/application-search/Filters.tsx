import React, { useEffect } from 'react';
import { faUserCog } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardIcon, CardFooter } from 'src/ui/Card';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Fieldset, Legend, FormGroup } from 'src/ui/forms';
import { useRecoilState } from 'recoil';
import {
  applicationTypeFilterState,
  applicationAudienceFilterState,
  applicationCampusFilterState,
  FilterState,
} from 'src/state/applicationSearch';

export const FilterByType = () => {
  const [types, setTypes] = useRecoilState(applicationTypeFilterState);
  const [audiences, setAudiences] = useRecoilState(applicationAudienceFilterState);
  const [campuses, setCampuses] = useRecoilState(applicationCampusFilterState);
  const [state, setState] = React.useState<{ [key: string]: FilterState }>({
    resources: { checked: false, type: 'Resource' },
    announcements: { checked: false, type: 'Announcement' },
    events: { checked: false, type: 'Event' },
    courses: { checked: false, type: 'Current Course' },
    pastCourses: { checked: false, type: 'Past Course' },
    canvas: { checked: false, type: 'Canvas' },
    notifications: { checked: false, type: 'Notification' },
    students: { checked: false, audience: 'student' },
    employees: { checked: false, audience: 'employee' },
    corvallis: { checked: false, campus: 'corvallis' },
    bend: { checked: false, campus: 'bend' },
    ecampus: { checked: false, campus: 'ecampus' },
  });

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

  const {
    resources,
    events,
    announcements,
    courses,
    pastCourses,
    canvas,
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
            control={
              <Checkbox checked={resources.checked} onChange={handleChange} name="resources" />
            }
            label="Resources"
          />
          <FormControlLabel
            control={<Checkbox checked={events.checked} onChange={handleChange} name="events" />}
            label="Events"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={announcements.checked}
                onChange={handleChange}
                name="announcements"
              />
            }
            label="Announcements"
          />
          <FormControlLabel
            control={<Checkbox checked={courses.checked} onChange={handleChange} name="courses" />}
            label="Current Courses"
          />
          <FormControlLabel
            control={
              <Checkbox checked={pastCourses.checked} onChange={handleChange} name="pastCourses" />
            }
            label="Past Courses"
          />
          <FormControlLabel
            control={<Checkbox checked={canvas.checked} onChange={handleChange} name="canvas" />}
            label="Canvas"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={notifications.checked}
                onChange={handleChange}
                name="notifications"
              />
            }
            label="Notifications"
          />
        </FormGroup>
      </Fieldset>
      <Fieldset>
        <Legend>Audience</Legend>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={students.checked} onChange={handleChange} name="students" />
            }
            label="Students"
          />
          <FormControlLabel
            control={
              <Checkbox checked={employees.checked} onChange={handleChange} name="employees" />
            }
            label="Employees"
          />
        </FormGroup>
      </Fieldset>
      <Fieldset>
        <Legend>Campus</Legend>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={corvallis.checked} onChange={handleChange} name="corvallis" />
            }
            label="Corvallis"
          />
          <FormControlLabel
            control={<Checkbox checked={bend.checked} onChange={handleChange} name="bend" />}
            label="Bend"
          />
          <FormControlLabel
            control={<Checkbox checked={ecampus.checked} onChange={handleChange} name="ecampus" />}
            label="Ecampus"
          />
        </FormGroup>
      </Fieldset>
    </div>
  );
};

const Filters: React.FC = () => {
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

export default Filters;
