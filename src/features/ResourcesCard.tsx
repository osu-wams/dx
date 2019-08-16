import React, { useState, useEffect, useRef, FC } from 'react';
import styled from 'styled-components';
import { faCube } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardFooter } from '../ui/Card';
import Icon from '../ui/Icon';
import { List, ListItem, ListItemContentLink } from '../ui/List';
import { Color, theme } from '../theme';
import {
  getResourcesByCategory,
  getCategories,
  defaultCategoryId,
  IResourceResult,
  ICategory
} from '../api/resources';
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

const getResources = (categ: string) =>
  getCategoryId(categ).then(categoryId =>
    Promise.all([
      categoryId,
      getResourcesByCategory(
        categoryId === 'all' ? 'all' : defaultCategoryId + ',' + categoryId
      ).then(res => res)
    ]).then(res => res[1])
  );

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
const ResourcesCard: FC<{ categ: string }> = ({ categ }) => {
  const [resources, setResources] = useState<IResourceResult[]>([]);
  const [categoryId, setCategoryId] = useState<any>('');
  const isMounted = useRef(true);
  const cardTitle = categ.charAt(0).toUpperCase() + categ.slice(1) + ' Resources';

  // Populate resources and category ID
  useEffect(() => {
    isMounted.current = true;
    getResources(categ)
      .then((data: IResourceResult[]) => {
        if (isMounted.current) {
          setResources(data);
        }
      })
      .catch(console.log);
    getCategoryId(categ)
      .then(data => {
        if (isMounted.current) {
          setCategoryId(data);
        }
      })
      .catch(console.log);
    return () => {
      isMounted.current = false;
    };
  }, [categ]);

  return (
    <Card>
      <CardHeader title={cardTitle} />
      <ResourcesContainer>
        {resources.length ? (
          <List data-testid="resource-container">
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
          <EmptyState />
        )}
      </ResourcesContainer>
      {categoryId !== '' && (
        <CardFooter>
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
