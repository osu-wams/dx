import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import PageTitle from '../ui/PageTitle';
import { CardBase } from '../ui/Card';
import { theme } from '../theme';
import ResourcesCategories from '../features/resources/ResourcesCategories';
import ResourcesSearch from '../features/resources/ResourcesSearch';
import ResourcesList from '../features/resources/ResourcesList';
import {
  getCategories,
  getResourcesByCategory,
  defaultCategoryId,
  IResourceResult,
  ICategory
} from '../api/resources';
import { MainGridWrapper, MainGrid, MainGridCol } from '../ui/PageGrid';

//import type here
const Resources = () => {
  const [resources, setResources] = useState<IResourceResult[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [catLoading, setCatLoading] = useState<boolean>(true);
  const [resLoading, setResLoading] = useState<boolean>(true);
  const isMounted = useRef(true);

  useEffect(() => {
    let theCategoryId = defaultCategoryId;
    if (window.location.search.startsWith('?category=')) {
      const queryString = window.location.search.split('=');
      if (queryString.length === 2) {
        theCategoryId = queryString[1];
      }
    }
    isMounted && setSelectedCategory(theCategoryId);
    getCategories()
      .then((data: ICategory[]) => {
        if (isMounted.current) {
          fetchResourcesByCategory(theCategoryId);
          setCategories(data);
          setCatLoading(false);
        }
      })
      .catch(console.log);

    return () => {
      // prevents setting data on a component that has been unmounted before promise resolves
      isMounted.current = false;
    };
  }, []);

  const fetchResourcesByCategory = (category: string) => {
    getResourcesByCategory(category)
      .then((res: IResourceResult[]) => {
        if (isMounted.current) {
          setResLoading(false);
          setResources(res);
          setSelectedCategory(category);
        }
      })
      .catch(console.log);
  };

  return (
    <MainGridWrapper>
      <PageTitle title="Resources" />
      <MainGrid>
        <MainGridCol className="col-span-2">
          <ResourcesWrapper data-testid="resources-page">
            {selectedCategory !== '' && (
              <>
                <ResourcesSearch
                  setResources={setResources}
                  setSelectedCategory={setSelectedCategory}
                />
                {catLoading && <Skeleton />}
                <ResourcesCategories
                  fetchResourcesByCategory={fetchResourcesByCategory}
                  selectedCategory={selectedCategory}
                  categories={categories}
                />
              </>
            )}
            {resLoading && <Skeleton count={5} />}
            {!resLoading && resources.length > 0 ? (
              <ResourcesList resources={resources} />
            ) : (
              !resLoading && (
                /* @TODO need mockup styling to do and messaging for no results */
                <div>No results</div>
              )
            )}
          </ResourcesWrapper>
        </MainGridCol>
      </MainGrid>
    </MainGridWrapper>
  );
};

const ResourcesWrapper = styled(CardBase)`
  padding: ${theme.spacing.unit * 2}px;
`;

export default Resources;
