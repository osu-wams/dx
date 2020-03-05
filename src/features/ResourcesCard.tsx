import React, { FC, useContext, useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { library, IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { UserContext } from '../App';
import { Card, CardHeader, CardContent, CardFooter, CardIcon } from '../ui/Card';
import { List } from '../ui/List';
import { styled } from '../theme';
import { InternalLink } from '../ui/Link';
import FailedState from '../ui/FailedState';
import { Event } from '../util/gaTracking';
import { Types } from '@osu-wams/lib';
import { User, useResourcesByQueue } from '@osu-wams/hooks';
import { ResourceItem } from './resources/ResourceItem';

// Setup a font awesome library to use for searching icons from the backend.
library.add(fal, fab);

const { hasAudience } = User;

const ResourcesContainer = styled(CardContent)`
  padding-bottom: 0;
`;

/**
 * Resources Card
 *
 * Displays resources from a given categorY
 */
const ResourcesCard: FC<{ categ: string; icon: IconDefinition }> = ({ categ, icon }) => {
  const user = useContext<any>(UserContext);
  const res = useResourcesByQueue(categ);
  const [resources, setResources] = useState<Types.Resource[]>([]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!user.loading && !res.loading) {
      const resourcesToUse = res.data?.items?.filter(r => hasAudience(user.data, r));
      setResources(resourcesToUse);
    }
  }, [res.data, res.loading, user.data, user.loading]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const cardTitle = res.data.entityQueueTitle + ' Resources';

  // For employee_featured, we don't want the employee part...
  if (categ.split('_')[1]) {
    categ = categ.split('_')[1];
  }

  return (
    <Card>
      <CardHeader title={cardTitle} badge={<CardIcon icon={icon} />} />
      <ResourcesContainer>
        {res.loading && <Skeleton count={5} />}

        {!res.loading && !user.loading && resources?.length > 0 && (
          <List data-testid="resource-container">
            {resources.map(resource => (
              <ResourceItem
                key={resource.id}
                resource={resource}
                event={() => Event('resources-card', categ, resource.title)}
              />
            ))}
          </List>
        )}

        {!res.loading && !res.error && resources?.length === 0 && <EmptyState />}

        {!res.loading && res.error && <FailedState>Oops, something went wrong!</FailedState>}
      </ResourcesContainer>
      {resources?.length > 0 && (
        <CardFooter infoButtonId={`${categ}-resources`}>
          <InternalLink
            to={`/resources?category=${categ.toLowerCase()}`}
            onClick={() => Event('resources-card', `view all ${categ} link`)}
          >
            View more {categ} resources
          </InternalLink>
        </CardFooter>
      )}
    </Card>
  );
};

// Todo: Replace with actual empty state when ready in mockups.
const EmptyState = () => <span>No resources available.</span>;

export default ResourcesCard;
