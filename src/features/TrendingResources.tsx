import React, { useEffect, useState } from 'react';
import { Types, User } from '@osu-wams/lib';
import { Card, CardHeader, CardContent, CardFooter, CardIcon } from '../ui/Card';
import { List } from 'src/ui/List';
import { faFireAlt } from '@fortawesome/pro-light-svg-icons';
import { State, useTrendingResources } from '@osu-wams/hooks';
import { Event } from 'src/util/gaTracking';
import { InternalLink } from 'src/ui/Link';
import { ResourceItem } from './resources/ResourceItem';
import { filteredTrendingResources } from './resources/resources-utils';
import { useRecoilValue } from 'recoil';

const { resourceState, userState } = State;

export const TrendingResources = () => {
  const user = useRecoilValue(userState);
  const res = useRecoilValue(resourceState);
  const trendingRes = useTrendingResources('7daysAgo');
  const [trendingResources, setTrendingResources] = useState<Types.Resource[]>([]);
  const dashboardLink = `/${User.getAffiliation(user.data).toLowerCase()}`;

  useEffect(() => {
    if (
      user.data &&
      res.data &&
      res.data.length > 0 &&
      trendingRes.data &&
      trendingRes.data.length > 0
    ) {
      setTrendingResources(filteredTrendingResources(trendingRes.data, res.data, user.data));
    }
  }, [res.data, trendingRes.data, user.data]);

  return (
    (trendingResources.length > 0 && (
      <Card>
        <CardHeader title="Trending" badge={<CardIcon icon={faFireAlt} />} />
        <CardContent>
          <List data-testid="resource-container">
            {trendingResources.map((resource) => (
              <ResourceItem
                key={resource.id}
                resource={resource}
                eventCategory="trending-resources-card"
                eventAction={resource.title}
              />
            ))}
          </List>
        </CardContent>
        <CardFooter infoButtonId="trending-resources">
          <InternalLink
            to={`${dashboardLink}/resources`}
            onClick={() => Event('trending-resources-card', `view resources link`)}
          >
            View resources
          </InternalLink>
        </CardFooter>
      </Card>
    )) ||
    null
  );
};
