import React, { useEffect, useState, useContext } from 'react';
import { Types } from '@osu-wams/lib';
import { Card, CardHeader, CardContent, CardFooter, CardIcon } from '../ui/Card';
import { List } from 'src/ui/List';
import { faFireAlt } from '@fortawesome/pro-light-svg-icons';
import { useResources, useTrendingResources } from '@osu-wams/hooks';
import { AppContext } from 'src/contexts/app-context';
import { Event } from 'src/util/gaTracking';
import { InternalLink } from 'src/ui/Link';
import { ResourceItem } from './resources/ResourceItem';
import { filteredTrendingResources } from './resources/resources-utils';

export const TrendingResources = () => {
  const { user } = useContext(AppContext);
  const res = useResources();
  const trendingRes = useTrendingResources('7daysAgo');
  const [trendingResources, setTrendingResources] = useState<Types.Resource[]>([]);

  useEffect(() => {
    if (user.data && res.data.length > 0 && trendingRes.data.length > 0) {
      setTrendingResources(filteredTrendingResources(trendingRes.data, res.data, user.data));
    }
  }, [res.data, trendingRes.data, user.data]);

  return (
    (trendingResources.length > 0 && (
      <Card>
        <CardHeader title="Trending Resources" badge={<CardIcon icon={faFireAlt} />} />
        <CardContent>
          <List data-testid="resource-container">
            {trendingResources.map(resource => (
              <ResourceItem
                key={resource.id}
                resource={resource}
                event={() => Event('trending-resources-card', resource.title)}
              />
            ))}
          </List>
        </CardContent>
        <CardFooter infoButtonId="trending-resources">
          <InternalLink
            to="/resources"
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
