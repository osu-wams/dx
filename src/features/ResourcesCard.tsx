import React, { FC, useContext, useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components/macro';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { AppContext } from 'src/contexts/app-context';
import { Card, CardHeader, CardContent, CardFooter, CardIcon } from '../ui/Card';
import { List } from '../ui/List';
import { InternalLink } from '../ui/Link';
import FailedState from '../ui/FailedState';
import { Event } from '../util/gaTracking';
import { Types } from '@osu-wams/lib';
import { User, useResourcesByQueue } from '@osu-wams/hooks';
import { ResourceItem } from './resources/ResourceItem';

const { hasAudience } = User;

const ResourcesContainer = styled(CardContent)`
  padding-bottom: 0;
`;

/**
 * Resources Card
 *
 * Displays resources from a given category
 */
const ResourcesCard: FC<{ categ: string; icon: IconDefinition }> = ({ categ, icon }) => {
  const { user } = useContext(AppContext);
  const res = useResourcesByQueue(categ);
  const [resources, setResources] = useState<Types.Resource[]>([]);
  const [cardTitle, setCardTitle] = useState('');

  useEffect(() => {
    if (Object.keys(user.data).length && res.data?.items?.length) {
      const resourcesToUse = res.data?.items?.filter((r) => hasAudience(user.data, r));
      setResources(resourcesToUse);
    }
    if (res.data.entityQueueTitle) {
      const cardSuffix = res.data.entityQueueTitle.toLowerCase() === 'featured' ? '' : ' Resources';
      setCardTitle(res.data.entityQueueTitle + cardSuffix);
    }
  }, [res.data, res.loading, user.data, user.loading]);

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
            {resources.map((resource) => (
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
