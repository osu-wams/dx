import React from 'react';
import { faUser } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardIcon, CardFooter } from 'src/ui/Card';
import { ListItem } from 'src/ui/List';
import { useLocations } from '@osu-wams/hooks';
import { useRecoilValue } from 'recoil';
import { applicationSearchState } from 'src/state/applicationSearch';

const Places: React.FC = () => {
  const search = useRecoilValue(applicationSearchState);
  const locations = useLocations(search);
  return (
    <Card>
      <CardHeader title="Places" badge={<CardIcon icon={faUser} />} />
      <CardContent>
        {locations.data && locations.data.map((l) => <ListItem key={l.id}>{l.name}</ListItem>)}
      </CardContent>

      <CardFooter></CardFooter>
    </Card>
  );
};

export default Places;
