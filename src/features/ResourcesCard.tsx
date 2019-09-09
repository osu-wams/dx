import React, { useState, useEffect, FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';
import { faCube, IconDefinition } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardFooter, CardIcon } from '../ui/Card';
import Icon from '../ui/Icon';
import { List, ListItem, ListItemContentLink } from '../ui/List';
import { Color, theme } from '../theme';
import { getCategories, IResourceResult, ICategory, getResourcesByQueue } from '../api/resources';
import { InternalLink } from '../ui/Link';

const ResourcesContainer = styled(CardContent)`
  padding-top: 0;
  padding-bottom: 0;
`;

const ResourceName = styled.div`
  font-size: ${theme.fontSize[18]};
  color: ${Color['neutral-700']};
  padding-left: ${theme.spacing.unit * 2}px;
`;

const ResourceImg = styled.img`
  width: 3rem;
`;

const ResourceIcon = styled(Icon)`
  height: auto;
`;

const getCategoryId = (categ: string) =>
  getCategories().then(
    (res: ICategory[]): string => {
      const result = res.find((e: any) => e.name.toUpperCase() === categ.toUpperCase());
      if (result !== undefined) {
        return result.id;
      }
      return '';
    }
  );

/**
 * Resources Card
 *
 * Displays resources from a given set of categories
 */
const ResourcesCard: FC<{ categ: string; icon: IconDefinition }> = ({ categ, icon }) => {
  const [resources, setResources] = useState<IResourceResult[]>([]);
  const [resourcesLoading, setResourcesLoading] = useState<boolean>(true);
  const [categoryId, setCategoryId] = useState<any>('');
  const cardTitle = categ.charAt(0).toUpperCase() + categ.slice(1) + ' Resources';

  // Populate resources and category ID
  useEffect(() => {
    let isMounted = true;
    getResourcesByQueue(categ)
      .then((data: IResourceResult[]) => {
        if (isMounted) {
          setResources(data);
          setResourcesLoading(false);
        }
      })
      .catch(console.log);
    getCategoryId(categ)
      .then(data => {
        isMounted && setCategoryId(data);
      })
      .catch(console.log);

    return () => {
      isMounted = false;
    };
  }, [categ]);

  return (
    <Card>
      <CardHeader title={cardTitle} badge={<CardIcon icon={icon} count={resources.length} />} />
      <ResourcesContainer>
        {resourcesLoading && <Skeleton count={5} />}
        {resources.length ? (
          <List aria-live="polite" aria-atomic="true" data-testid="resource-container">
            {resources.map(resource => (
              <ListItem spaced key={resource.id}>
                <ListItemContentLink spaced href={resource.uri} target="_blank">
                  {resource.icon !== undefined ? (
                    <ResourceImg src={resource.icon} />
                  ) : (
                    <ResourceIcon icon={faCube} color={Color.black} />
                  )}
                  <ResourceName>{resource.title}</ResourceName>
                </ListItemContentLink>
              </ListItem>
            ))}
          </List>
        ) : (
          !resourcesLoading && <EmptyState />
        )}
      </ResourcesContainer>
      {categoryId !== '' && (
        <CardFooter infoButtonId={`${categ}-resources`}>
          <InternalLink to={`/resources?category=${categoryId}`}>
            See all {categ} resources
          </InternalLink>
        </CardFooter>
      )}
    </Card>
  );
};

// Todo: Replace with actual empty state when ready in mockups.
const EmptyState = () => <span>No resources available.</span>;

export default ResourcesCard;
