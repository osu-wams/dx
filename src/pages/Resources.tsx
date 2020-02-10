import React, { useEffect, useState, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useDebounce } from 'use-debounce';
import { CardBase } from '../ui/Card';
import { themeSettings, styled, MainGridWrapper, MainGrid } from '../theme';
import ResourcesCategories from '../features/resources/ResourcesCategories';
import ResourcesSearch from '../features/resources/ResourcesSearch';
import ResourcesList from '../features/resources/ResourcesList';
import { Types } from '@osu-wams/lib';
import { Resources as hooksResources, useCategories, useResources, User } from '@osu-wams/hooks';
import PageTitle from '../ui/PageTitle';
import { UserContext } from '../App';
import VisuallyHidden from '@reach/visually-hidden';

const { defaultCategoryName } = hooksResources;
const { hasAudience, getAffiliation } = User;

//import type here
const Resources = () => {
  const user = useContext(UserContext);
  const [activeCategory, setActiveCategory] = useState<string>(getInitialCategory());
  const [query, setQuery] = useState<string>('');
  const [debouncedQuery] = useDebounce(query, 250);
  const categories = useCategories();
  const res = useResources();
  const [filteredResources, setFilteredResources] = useState<any>([]);
  const [filteredCategories, setFilteredCategories] = useState<any>([]);

  /**
   * A delegate method for children components to call and set the selected category. This
   * pushes the category name to the window history and updates the location bar, when the
   * Back/Forward buttons are pressed the category name is available.
   * @param name the category name
   */
  const setSelectedCategory = (name: string) => {
    setActiveCategory(decodeURI(name));
  };

  /**
   * Filter a list of resources where it has a category in its list matching the provided name
   * parameter unless the category is 'all'.
   * @param {string} name the category name to filter on
   * @param {Resource[]} resources a list of resources to inspect for matching category
   */
  const filterByCategory = (name: string, resources: Types.Resource[]): Types.Resource[] => {
    if (name === 'all') return resources;

    return resources.filter(
      resource =>
        resource.categories?.length > 0 &&
        resource.categories.findIndex(s => s.toLowerCase().includes(name.toLowerCase())) > -1
    );
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
      o.affiliation?.map(a => a.toLowerCase()).filter(a => a === userAffiliation).length > 0
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
        ?.map(c => c.toLowerCase())
        .some(c => filteredCategories.find(fc => fc.name.toLowerCase() === c))
    );
  };

  /**
   * Filter the categories to include any that have an affilation related to the type of user
   * (student vs employee)
   */
  useEffect(() => {
    if (categories.data && user.data) {
      setFilteredCategories(categories.data.filter(c => checkAffiliation(user.data, c)));
    }
  }, [categories.data, user.data]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (res.data && user.data && filteredCategories.length > 0) {
      let filtered = res.data.filter(
        r => checkAffiliation(user.data, r) && hasCategory(r, filteredCategories)
      );

      // When clicking a category we filter all results based on selected category
      if (!debouncedQuery) {
        filtered = filterByCategory(activeCategory, filtered);
      } else {
        // When typing we search for synonyms and names to get results
        const queriedResources = filtered.filter(resource => {
          if (
            resource.synonyms.length > 0 &&
            resource.synonyms.find(s => s.includes(debouncedQuery.toLowerCase()))
          ) {
            return true;
          }
          return resource.title.toLowerCase().includes(debouncedQuery.toLowerCase());
        });

        // Filter by category when searching in
        filtered = filterByCategory(activeCategory, queriedResources);
      }
      setFilteredResources(filtered);
    }
  }, [activeCategory, filteredCategories, debouncedQuery, res.data, user.data]);
  /* eslint-enable react-hooks/exhaustive-deps */

  /* eslint-disable no-restricted-globals, react-hooks/exhaustive-deps */
  /**
   * Allows for Back/Forward buttons to click and the component to update its state based on which category
   * had been clicked. This provides the ability to have the category in the location bar for bookmarks, link
   * sharing.
   *
   * * When the component mounts, bind onpopstate to handle history events (Back/Forward buttons clicked)
   * * to detect if the history state includes the category name, in which case set the active category to match.
   * * Push the default activeCategory to the history at the start.
   */
  useEffect(() => {
    window.onpopstate = function(e) {
      if (e.state) {
        if (e.state.category) setActiveCategory(decodeURI(e.state.category));
      }
    };
  }, []);

  useEffect(() => {
    /**
     * Push to the history state if the currently active category doesn't match the previously set
     * history (the page that was last visited). In the case that the history and active category don't match
     * AND the active category exists in the window location bar then this is the first time the user has visited
     * the Resources page so we don't push a state (because the browser handles the first state by default.)
     */
    if (history.pushState) {
      if (
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
  /* eslint-enable no-restricted-globals, react-hooks/exhaustive-deps */

  return (
    <MainGridWrapper data-testid="resources-page">
      <PageTitle title="Resources" />
      <MainGrid>
        <ResourcesWrapper>
          {activeCategory !== '' && (
            <>
              <ResourcesSearch
                query={query}
                setQuery={setQuery}
                setSelectedCategory={setSelectedCategory}
              />
              {!res.loading && res.data.length > 0 && (
                // Anchor link matches ResourcesList component main div id
                <VisuallyHidden>
                  <a href="#resourcesResults">Skip to results</a>
                </VisuallyHidden>
              )}
              {categories.loading && <Skeleton />}
              <ResourcesCategories
                categories={filteredCategories}
                selectedCategory={activeCategory}
                setQuery={setQuery}
                setSelectedCategory={setSelectedCategory}
              />
            </>
          )}
          {res.loading && <Skeleton count={5} />}
          {!res.loading && res.data.length > 0 ? (
            <ResourcesList resources={filteredResources.filter(r => hasAudience(user.data, r))} />
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

const getInitialCategory = () => {
  if (window.location.search.startsWith('?category=')) {
    const terms = window.location.search.split('=');
    if (terms.length === 2) {
      return decodeURI(terms[1]);
    }
  }
  return decodeURI(defaultCategoryName());
};

const ResourcesWrapper = styled(CardBase)`
  padding: ${themeSettings.spacing.unit * 2}px;
`;

export default Resources;
