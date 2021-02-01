import React from 'react';
import PageTitle from '../ui/PageTitle';
import { MainGridWrapper, Masonry } from '../theme';
import { ThreeCol, TwoColWide } from 'src/ui/Grids';

const Search = () => {
  return (
    <MainGridWrapper data-testid="search-page">
      <ThreeCol>
        <div className="col-1">
          <Settings />
        </div>
        <div className="col-2">
          <PageTitle title="Search Results" />
          <ListItem>Search 1</ListItem>
          <ListItem>Search 2</ListItem>
          <p>
            Toggle these settings to reveal different announcements, resources, events and features
            based on who you are. By default, these settings are configured automatically based on
            what we know about you.
          </p>
          <p>
            Toggle these settings to reveal different announcements, resources, events and features
            based on who you are. By default, these settings are configured automatically based on
            what we know about you.
          </p>
          <p>
            Toggle these settings to reveal different announcements, resources, events and features
            based on who you are. By default, these settings are configured automatically based on
            what we know about you.
          </p>
          <p>
            Toggle these settings to reveal different announcements, resources, events and features
            based on who you are. By default, these settings are configured automatically based on
            what we know about you.
          </p>
          <p>
            Toggle these settings to reveal different announcements, resources, events and features
            based on who you are. By default, these settings are configured automatically based on
            what we know about you.
          </p>
        </div>
        <div className="col-3">
          <People /> <Places />
        </div>
      </ThreeCol>
      {/* <TwoColWide>
        <Settings />
        <div>
          <PageTitle title="Search Results" />
          <ListItem>Search 1</ListItem>
          <ListItem>Search 2</ListItem>
          <People /> <Places />
        </div>
      </TwoColWide> */}
    </MainGridWrapper>
  );
};

export { Search };

import { faUser, faUserCog } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardIcon, CardFooter } from 'src/ui/Card';
import { ListItem } from 'src/ui/List';

const Settings: React.FC = () => {
  return (
    <Card>
      <CardHeader title="Filter Results" badge={<CardIcon icon={faUserCog} />} />
      <CardContent>
        <p>
          Toggle these settings to reveal different announcements, resources, events and features
          based on who you are. By default, these settings are configured automatically based on
          what we know about you.
        </p>
        <p>
          Toggle these settings to reveal different announcements, resources, events and features
          based on who you are. By default, these settings are configured automatically based on
          what we know about you.
        </p>
        <p>
          Toggle these settings to reveal different announcements, resources, events and features
          based on who you are. By default, these settings are configured automatically based on
          what we know about you.
        </p>
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
        <ListItem>MAuricio Cordoba</ListItem>
        <ListItem>Michael McDonald</ListItem>
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
