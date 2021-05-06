import React, { useEffect } from 'react';
import { Loading } from 'src/ui/Loading';
import styled from 'styled-components/macro';
import { CardBase } from 'src/ui/Card';
import { spacing, MainGridWrapper, MainGrid } from 'src/theme';
import ResourcesCategories from 'src/features/resources/ResourcesCategories';
import ResourcesSearch from 'src/features/resources/ResourcesSearch';
import ResourcesList from 'src/features/resources/ResourcesList';
import { useCategories, User, Resources as HooksResources } from '@osu-wams/hooks';
import PageTitle from 'src/ui/PageTitle';
import VisuallyHidden from '@reach/visually-hidden';
import {
  userState,
  resourceState,
  selectedCategoryState,
  categoryState,
  filteredResourcesState,
} from 'src/state';
import { useRecoilValue, useRecoilState } from 'recoil';

const { getAffiliation } = User;

// Resources Page with components to filter, search and favorite resources
const Resources = () => {
  const user = useRecoilValue(userState);
  const filteredResources = useRecoilValue(filteredResourcesState);
  const catHook = useCategories();
  const [categories, setCategories] = useRecoilState(categoryState);
  const [activeCategory, setActiveCategory] = useRecoilState(selectedCategoryState);
  const resources = useRecoilValue(resourceState);

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
  }, [catHook.data, user.data]);
  /* eslint-enable react-hooks/exhaustive-deps */

  /* eslint-disable no-restricted-globals */
  /**
   * Component re-render causes history state to compound into a messy bug, using replaceState ensures
   * that once the component settles, it will have one history for the back/forward button to use.
   */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let category = params.get('category') ?? '';
    if (!category) {
      category = decodeURI(HooksResources.defaultCategoryName());
    }
    if (typeof history.replaceState === 'function') {
      history.replaceState({ category }, category, `?category=${category}`);
    }
    setActiveCategory(category);

    window.onpopstate = function () {
      if (history.state?.category) setActiveCategory(history.state.category);
    };

    return () => setActiveCategory('');
  }, []);

  /**
   * Push to the history state if the currently active category doesn't match the previously set
   * history (the page that was last visited). In the case that the history and active category don't match
   * AND the active category exists in the window location bar then this is the first time the user has visited
   * the Resources page so we don't push a state (because the browser handles the first state by default.)
   */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category') ?? '';
    if (
      activeCategory &&
      history.state?.category !== activeCategory &&
      category !== activeCategory &&
      typeof history.pushState === 'function'
    ) {
      history.pushState(
        { category: activeCategory },
        activeCategory,
        `?category=${activeCategory}`
      );
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
              {categories.isLoading && <Loading />}
              <ResourcesCategories
                hasFavorite={
                  user.data.favoriteResources && user.data.favoriteResources.some((f) => f.active)
                }
              />
            </>
          )}
          {resources.isLoading && <Loading lines={5} />}
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
