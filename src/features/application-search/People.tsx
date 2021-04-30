import React from 'react';
import { faUserCircle } from '@fortawesome/pro-light-svg-icons';
import { Card, CardContent, CardHeader, CardIcon, CardFooter } from 'src/ui/Card';
import {
  ListItemContentLink,
  ListItemText,
  ListItemDescription,
  ListItemContent,
  ListItemContentLinkName,
} from 'src/ui/List';
import { usePeople, Constants } from '@osu-wams/hooks';
import { Types } from '@osu-wams/lib';
import { useRecoilValue } from 'recoil';
import { applicationSearchState } from 'src/state/applicationSearch';
import { ExternalLink } from 'src/ui/Link';
import Url from 'src/util/externalUrls.data';
import { Event } from 'src/util/gaTracking';
import { ListCount, ListErrorMessage } from 'src/ui/ApplicationSearch/ListItem';

const renderItems = (count: number, data: Types.Directory[]) => {
  if (!data.length) {
    return (
      <ListItemContent compact>
        <ListItemText>No people found.</ListItemText>
      </ListItemContent>
    );
  }
  return data.slice(0, count).map(({ id, firstName, lastName, department }) => (
    <ListItemContentLink
      key={id}
      href={Url.osuDirectory.person + id}
      target="_blank"
      onClick={() => Event('application-search-person', 'Individual person search link')}
      compact
    >
      <ListItemText>
        <ListItemContentLinkName noPadding>
          {firstName} {lastName}
        </ListItemContentLinkName>
        <ListItemDescription>{department}</ListItemDescription>
      </ListItemText>
    </ListItemContentLink>
  ));
};

const People: React.FC = () => {
  const search = useRecoilValue(applicationSearchState);
  const { data, error } = usePeople(search, {
    ...Constants.REACT_QUERY_DEFAULT_CONFIG,
    enabled: !!search,
    retry: false,
  });
  return (
    <Card>
      <CardHeader
        title="People"
        badge={<CardIcon icon={faUserCircle} count={data?.length ?? 0} />}
      />
      <CardContent flush>
        {error && ListErrorMessage('Failed searching for People.', error)}
        {data && renderItems(5, data)}
        {data && ListCount(5, data)}
      </CardContent>
      <CardFooter>
        {search && (
          <ExternalLink
            href={Url.osuDirectory.main + search}
            onClick={() => Event('application-search-people', 'Footer external search link')}
          >
            OSU Directory
          </ExternalLink>
        )}
      </CardFooter>
    </Card>
  );
};

export default People;
