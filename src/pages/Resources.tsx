import React, { useEffect, useState, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components/macro';
import { useDebounce } from 'use-debounce';
import { CardBase } from 'src/ui/Card';
import { spacing, MainGridWrapper, MainGrid } from 'src/theme';
import ResourcesCategories from 'src/features/resources/ResourcesCategories';
import ResourcesSearch from 'src/features/resources/ResourcesSearch';
import ResourcesList from 'src/features/resources/ResourcesList';
import { Types } from '@osu-wams/lib';
import { Resources as hooksResources, useCategories, useResources, User } from '@osu-wams/hooks';
import PageTitle from 'src/ui/PageTitle';
import VisuallyHidden from '@reach/visually-hidden';
import { activeFavoriteResources } from 'src/features/resources/resources-utils';
import { AppContext } from 'src/contexts/app-context';
import { Event } from 'src/util/gaTracking';
import { atom, useRecoilState, useRecoilValue, selectorFamily, selector } from 'recoil';
import {
  searchTermState,
  categoriesState,
  resourcesState,
  activeCategoryState,
  fetchResources,
  fetchCategories,
} from 'src/features/resources/resources-recoil';
// const { defaultCategoryName } = hooksResources;
const { hasAudience, getAffiliation } = User;

// Resources Page with components to filter, search and favorite resources
const Resources = () => {
  const { user } = useContext(AppContext);
  const categories = useRecoilValue(fetchCategories);
  const res = useRecoilValue(fetchResources);

  // Recoil
  const [filteredResources, setFilteredResources] = useRecoilState<Types.Resource[]>(
    resourcesState
  );
  const [filteredCategories, setFilteredCategories] = useRecoilState<Types.Category[]>(
    categoriesState
  );
  const activeCategory = useRecoilValue(activeCategoryState);
  const query = useRecoilValue(searchTermState);
  const [debouncedQuery] = useDebounce(query, 250);

  /**
   * Filter a list of resources where it has a category in its list matching the provided name
   * parameter unless the category is 'all'.
   * @param {string} name the category name to filter on
   * @param {Resource[]} resources a list of resources to inspect for matching category
   */
  const filterByCategory = React.useCallback(
    (name: string, resources: Types.Resource[]): Types.Resource[] => {
      // Skips categories and displays all resources
      if (name === 'all') return resources;

      // Skips categories and filters based on user favorite preferences
      if (name === 'favorites') {
        return activeFavoriteResources(user.data.favoriteResources, resources);
      }

      return resources.filter(
        (resource) =>
          resource.categories?.length > 0 &&
          resource.categories.findIndex((s) => s.toLowerCase().includes(name.toLowerCase())) > -1
      );
    },
    [user.data.favoriteResources]
  );

  const filteredByAudience = (resources: Types.Resource[], user: Types.User): Types.Resource[] => {
    return resources.filter((r) => hasAudience(user, r));
  };

  /**
   * Checks the affiliation data coming from user and determines if an object with affiliation data
   * should or should not appear for the given user.
   * @param o object having an affiliation string array
   * @returns {boolean} true or false depending if the item is associated with the current affiliation
   */
  const checkAffiliation = (user: any, o: { affiliation: string[] }): boolean => {
    const userAffiliation = getAffiliation(user).toLowerCase();
    return (
      o.affiliation?.length === 0 ||
      o.affiliation?.map((a) => a.toLowerCase()).filter((a) => a === userAffiliation).length > 0
    );
  };

  /**
   * Checks a resource to see if it is related to a category in the provided filtered categories array
   * @param resource the resource to evaluate
   * @param filteredCategories a filtered list of categories to display
   */
  const hasCategory = (resource: Types.Resource, filteredCategories: Types.Category[]): boolean => {
    return (
      resource.categories?.length === 0 ||
      resource.categories
        ?.map((c) => c.toLowerCase())
        .some((c) => filteredCategories.find((fc) => fc.name.toLowerCase() === c))
    );
  };

  const filterRes = React.useCallback(
    (resources: Types.Resource[]): Types.Resource[] => {
      return resources.filter(
        (r) =>
          checkAffiliation(user.data, r) &&
          hasCategory(r, filteredCategories) &&
          hasAudience(user.data, r)
      );
    },
    [res.data, user.data, filteredCategories]
  );

  /**
   * Filter the categories to include any that have an affilation related to the type of user
   * (student vs employee)
   */
  useEffect(() => {
    if (categories.data && user.data) {
      setFilteredCategories(categories.data.filter((c) => checkAffiliation(user.data, c)));
    }
  }, [categories.data, user.data]);

  useEffect(() => {
    if (res.data && user.data && filteredCategories.length > 0) {
      let filtered = filterRes(res.data);
      // When clicking a category we filter all results based on selected category
      if (!debouncedQuery) {
        filtered = filterByCategory(activeCategory, filtered);
      } else {
        // When typing we search for synonyms and names to get results
        const queriedResources = filtered.filter((resource) => {
          if (
            resource.synonyms.length > 0 &&
            resource.synonyms.find((s) => s.includes(debouncedQuery.toLowerCase()))
          ) {
            return true;
          }
          return resource.title.toLowerCase().includes(debouncedQuery.toLowerCase());
        });

        // If a query has no results, emit a GA Event to track for improving
        // resources and synonyms
        if (queriedResources.length === 0) {
          Event('resource-search-failed', debouncedQuery);
        }
        // Filter by category when searching in
        filtered = filterByCategory(activeCategory, queriedResources);
      }
      setFilteredResources(filtered);
    }
  }, [activeCategory, filteredCategories, filterByCategory, debouncedQuery, res.data, user.data]);

  return (
    <MainGridWrapper data-testid="resources-page">
      <PageTitle title="Resources" />
      <MainGrid>
        <ResourcesWrapper>
          {activeCategory !== '' && (
            <>
              <ResourcesSearch />
              {!res.loading && (res.data?.length ?? 0) > 0 && (
                // Anchor link matches ResourcesList component main div id
                <VisuallyHidden>
                  <a href="#resourcesResults">Skip to results</a>
                </VisuallyHidden>
              )}
              {categories.loading && <Skeleton />}
              <ResourcesCategories
                hasFavorite={
                  user.data.favoriteResources && user.data.favoriteResources.some((f) => f.active)
                }
              />
            </>
          )}
          {res.loading && <Skeleton count={5} />}
          {!res.loading && res.data.length > 0 ? (
            <ResourcesList
              // resources={filteredByAudience(filteredResources, user.data)} !TODO this breaks stuff we'll need to verify later
              user={user.data}
            />
          ) : (
            !res.loading && (
              /* @TODO need mockup styling to do and messaging for no results */
              <div>No results</div>
            )
          )}
        </ResourcesWrapper>
      </MainGrid>
    </MainGridWrapper>
  );
};

// const getInitialCategory = () => {
//   if (window.location.search.startsWith('?category=')) {
//     const terms = window.location.search.split('=');
//     if (terms.length === 2) {
//       return decodeURI(terms[1]);
//     }
//   }
//   return decodeURI(defaultCategoryName());
// };

const ResourcesWrapper = styled(CardBase)`
  padding: ${spacing.default};
`;

export default Resources;
