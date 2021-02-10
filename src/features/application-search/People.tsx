import React from 'react';
import { faUser } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardIcon, CardFooter } from 'src/ui/Card';
import { ListItemContentLink } from 'src/ui/List';
import { usePeople } from '@osu-wams/hooks';
import { useRecoilValue } from 'recoil';
import { applicationSearchState } from 'src/state/applicationSearch';

const People: React.FC = () => {
  const search = useRecoilValue(applicationSearchState);
  const people = usePeople(search);
  return (
    <Card>
      <CardHeader title="People" badge={<CardIcon icon={faUser} />} />
      <CardContent>
        {people.data &&
          people.data.map((p) => (
            <ListItemContentLink key={p.osuUid}>
              {p.firstName} {p.lastName}
            </ListItemContentLink>
          ))}
      </CardContent>

      <CardFooter></CardFooter>
    </Card>
  );
};

export default People;
