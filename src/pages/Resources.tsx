import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import { CardBase } from '../ui/Card';
import { theme } from '../theme';
import ResourcesCategories from '../features/resources/ResourcesCategories';
import ResourcesSearch from '../features/resources/ResourcesSearch';
import ResourcesList from '../features/resources/ResourcesList';
import { defaultCategoryName, useCategories, useResources } from '../api/resources';
import { MainGridWrapper, MainGrid, MainGridCol } from '../ui/PageGrid';
import PageTitle from '../ui/PageTitle';
import { UserContext } from '../App';

//import type here
const Resources = () => {
  const user = useContext(UserContext);
  const [activeCategory, setActiveCategory] = useState<string>(getInitialCategory());
  const [query, setQuery] = useState<string>('');
  const categories = useCategories();
  const resources = useResources(
    query !== ''
      ? `?query=${query}`
      : `?category=${activeCategory !== 'all' ? activeCategory : ''}`,
    user
  );

  /* eslint-disable no-restricted-globals */
  /**
   * A delegate method for children components to call and set the selected category. This
   * pushes the category name to the window history and updates the location bar, when the
   * Back/Forward buttons are pressed the category name is available.
   * @param name the category name
   */
  const setSelectedCategory = (name: string) => {
    if (history.pushState) {
      window.history.pushState({ category: name }, name, `?category=${name}`);
    }
    setActiveCategory(name);
  };

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
    if (history.pushState) {
      window.history.pushState(
        { category: activeCategory },
        activeCategory,
        `?category=${activeCategory}`
      );
    }
    window.onpopstate = function(e) {
      if (e.state) {
        if (e.state.category) setActiveCategory(e.state.category);
      }
    };
  }, []);
  /* eslint-enable no-restricted-globals */

  return (
    <MainGridWrapper>
      <PageTitle title="Resources" />
      <MainGrid>
        <MainGridCol className="col-span-2">
          <ResourcesWrapper data-testid="resources-page">
            {activeCategory !== '' && (
              <>
                <ResourcesSearch
                  query={query}
                  setQuery={setQuery}
                  setSelectedCategory={setSelectedCategory}
                />
                {categories.loading && <Skeleton />}
                <ResourcesCategories
                  categories={categories.data}
                  selectedCategory={activeCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              </>
            )}
            {resources.loading && <Skeleton count={5} />}
            {!resources.loading && resources.data.length > 0 ? (
              <ResourcesList resources={resources.data} />
            ) : (
              !resources.loading && (
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

const getInitialCategory = () => {
  if (window.location.search.startsWith('?category=')) {
    const terms = window.location.search.split('=');
    if (terms.length === 2) {
      return terms[1];
    }
  }
  return defaultCategoryName;
};

const ResourcesWrapper = styled(CardBase)`
  padding: ${theme.spacing.unit * 2}px;
`;

export default Resources;
