import React, { useState, useEffect, useRef, FC } from 'react';
import styled from 'styled-components';
import { faArrowRight } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardFooter } from '../ui/Card';
import Icon from '../ui/Icon';
import Button from '../ui/Button';
import { Color, theme } from '../theme';
import { getResourcesByCategory, getCategories, defaultCategoryId, IResourceResult } from '../api/resources';

const ResourceContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-row-gap: 16px;
  grid-column-gap: 16px;
`;

const Resource = styled.a`
  :link,
  :visited,
  :hover,
  :active {
    text-decoration: none;
  }
  color: ${Color['black']};
  padding: 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  flex: 2;
  align-items: center;
  text-align: center;
`;

const ResourceIconBorder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${theme.spacing.unit * 6}px;
  height: ${theme.spacing.unit * 6}px;
  border: 1px solid ${Color['neutral-300']};
  border-radius: 50%;
`;

const ResourceIcon = styled.img`
  padding: ${theme.spacing.unit}px;
  max-width: 100%;
  max-height: 100%;
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
    res => res.find((e: any) => e.attributes.name.toUpperCase() === categ.toUpperCase()).id
  );

/**
 * Resources Card
 *
 * Displays resources from a given set of categories
 */
const ResourcesCard: FC<{ categ: string; color: Color }> = ({ categ, color }) => {
  const [resources, setResources] = useState<Array<IResourceResult>>([]);
  const [categoryId, setCategoryId] = useState<any>('');
  const isMounted = useRef(true);
  const cardTitle = categ.charAt(0).toUpperCase() + categ.slice(1) + ' Resources';

  // Populate resources and category ID
  useEffect(() => {
    isMounted.current = true;
    getResources(categ)
      .then(data => {
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
  }, []);

  return (
    <Card>
      <CardHeader title={cardTitle} />
      <CardContent>
        {resources.length ? (
          <ResourceContainer data-testid="resource-container">
            {resources.map(({ id, icon, uri, title}) => (
              <Resource key={id} href={uri} target="_blank">
                {icon !== undefined && (
                  <ResourceIconBorder>
                    <ResourceIcon src={icon} />
                  </ResourceIconBorder>
                )}
                <>{title}</>
              </Resource>
            ))}
          </ResourceContainer>
        ) : (
          <EmptyState />
        )}
      </CardContent>
      {categoryId !== '' && (
        <CardFooter>
          <Button
            as="a"
            href={`/resources?category=${categoryId}`}
            bg={Color.transparent}
            fg={color}
          >
            See all {categ} resources
            <Icon
              icon={faArrowRight}
              color={color}
              style={{ marginLeft: `${theme.spacing.unit}px` }}
            />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

// Todo: Replace with actual empty state when ready in mockups.
const EmptyState = () => <span>No resources available.</span>;

export default ResourcesCard;
