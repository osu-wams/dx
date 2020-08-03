import React, { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components/macro';
import { useDebounce } from 'use-debounce';
import { CardBase } from 'src/ui/Card';
import { spacing, MainGridWrapper, MainGrid } from 'src/theme';
import ResourcesCategories from 'src/features/resources/ResourcesCategories';
import ResourcesSearch from 'src/features/resources/ResourcesSearch';
import ResourcesList from 'src/features/resources/ResourcesList';
import { useCategories, useResources, User } from '@osu-wams/hooks';
import PageTitle from 'src/ui/PageTitle';
import VisuallyHidden from '@reach/visually-hidden';
import { Event } from 'src/util/gaTracking';
import {
  userState,
  resourceSearchState,
  resourceState,
  selectedCategoryState,
  categoryState,
  debouncedResourceSearchState,
  filteredResourcesState,
} from 'src/state/application';
import { useRecoilValue, useRecoilState } from 'recoil';

const { getAffiliation } = User;

// Resources Page with components to filter, search and favorite resources
const Resources = () => {
  const user = useRecoilValue(userState);
  const query = useRecoilValue(resourceSearchState);
  const [debouncedValue] = useDebounce(query, 250);
  const [debouncedQuery, setDebouncedQuery] = useRecoilState(debouncedResourceSearchState);
  const filteredResources = useRecoilValue(filteredResourcesState);
  const catHook = useCategories();
  const [categories, setCategories] = useRecoilState(categoryState);
  const [activeCategory, setActiveCategory] = useRecoilState(selectedCategoryState);
  const resHook = useResources();
  const [resources, setResources] = useRecoilState(resourceState);
  /**
   * Filter the categories to include any that have an affilation related to the type of user
   * (student vs employee)
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (catHook.data && user.data && Array.isArray(catHook.data)) {
      const { data, isLoading, isSuccess } = catHook;
      setCategories({
        data: data.filter((c) => {
          const userAffiliation = getAffiliation(user.data).toLowerCase();
          return (
            c.affiliation?.length === 0 ||
            c.affiliation?.map((a) => a.toLowerCase()).filter((a) => a === userAffiliation).length >
              0
          );
        }),
        isLoading,
        isSuccess,
      });
    }

    if (resHook.data && resHook.data !== resources.data) {
      const { data, isLoading, isSuccess } = resHook;
      setResources({ data, isLoading, isSuccess });
    }
  }, [resHook.data, catHook.data, user.data]);
  /* eslint-enable react-hooks/exhaustive-deps */

  /**
   * When useDebounce triggers a change in debouncedValue, propagate that value
   * to the debounced resource search term state.
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    setDebouncedQuery(debouncedValue);
  }, [debouncedValue]);
  /* eslint-enable react-hooks/exhaustive-deps */

  useEffect(() => {
    if (debouncedQuery) {
      // If a query has no results, emit a GA Event to track for improving resources and synonyms
      if (filteredResources.length === 0) {
        Event('resource-search-failed', debouncedQuery);
      }

      // Avoids sending single characters to Google Analytics
      if (debouncedQuery.length >= 2 && filteredResources.length > 0) {
        Event('resource-search', debouncedQuery);
      }
    }
  }, [debouncedQuery, filteredResources]);

  /* eslint-disable no-restricted-globals */
  /**
   * Allows for Back/Forward buttons to click and the component to update its state based on which category
   * had been clicked. This provides the ability to have the category in the location bar for bookmarks, link
   * sharing.
   *
   * * When the component mounts, bind onpopstate to handle history events (Back/Forward buttons clicked)
   * * to detect if the history state includes the category name, in which case set the active category to match.
   * * Push the default activeCategory to the history at the start.
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    window.onpopstate = function (e) {
      if (e.state) {
        if (e.state.category) setActiveCategory(decodeURI(e.state.category));
      }
    };
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  useEffect(() => {
    /**
     * Push to the history state if the currently active category doesn't match the previously set
     * history (the page that was last visited). In the case that the history and active category don't match
     * AND the active category exists in the window location bar then this is the first time the user has visited
     * the Resources page so we don't push a state (because the browser handles the first state by default.)
     */
    if (typeof history.pushState === 'function') {
      if (
        activeCategory &&
        history.state?.category !== activeCategory &&
        !window.location.search.includes(activeCategory)
      ) {
        window.history.pushState(
          { category: activeCategory },
          activeCategory,
          `?category=${activeCategory}`
        );
      }
    }
  }, [activeCategory]);
  /* eslint-enable no-restricted-globals */

  return (
    <MainGridWrapper data-testid="resources-page">
      <PageTitle title="Resources" />
      <MainGrid>
        <ResourcesWrapper>
          {activeCategory !== '' && (
            <>
              <ResourcesSearch />
              {resources.isSuccess && resources.data.length > 0 && (
                // Anchor link matches ResourcesList component main div id
                <VisuallyHidden>
                  <a href="#resourcesResults">Skip to results</a>
                </VisuallyHidden>
              )}
              {categories.isLoading && <Skeleton />}
              <ResourcesCategories
                hasFavorite={
                  user.data.favoriteResources && user.data.favoriteResources.some((f) => f.active)
                }
              />
            </>
          )}
          {resources.isLoading && <Skeleton count={5} />}
          {resources.isSuccess && resources.data.length > 0 ? (
            <ResourcesList
              resources={filteredResources.filter((r) => User.hasAudience(user.data, r))}
              user={user.data}
            />
          ) : (
            resources.isSuccess && (
              /* @TODO need mockup styling to do and messaging for no results */
              <div>No results</div>
            )
          )}
        </ResourcesWrapper>
      </MainGrid>
    </MainGridWrapper>
  );
};

const ResourcesWrapper = styled(CardBase)`
  padding: ${spacing.default};
`;

export default Resources;
