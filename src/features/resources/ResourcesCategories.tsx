import React from 'react';
import styled from 'styled-components/macro';
import { spacing } from 'src/theme';
import CustomBtn from 'src/ui/CustomBtn';
import { Event } from 'src/util/gaTracking';
import { Types } from '@osu-wams/lib';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { resourceSearchState, categoryState, selectedCategoryState } from 'src/state';

/**
 * Displays a list of clickable categories for the Resources page
 * Favorites category button is only rendered if the user has any favorite resources
 */
const ResourceCategories = ({ hasFavorite }) => {
  const resetQuery = useResetRecoilState(resourceSearchState);
  const categories = useRecoilValue(categoryState);
  const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoryState);

  return (
    <CategoriesWrapper>
      {categories.data.length > 0 && (
        <>
          <CustomBtn
            icon="https://data.dx.oregonstate.edu/sites/default/files/2019-05/th.svg"
            text="All"
            id="all"
            name="categories"
            clickHandler={() => {
              setSelectedCategory('all');
              Event('resource-category', 'all');
            }}
            selected={selectedCategory?.toLowerCase() === 'all' ? true : false}
          />
          {hasFavorite && (
            <CustomBtn
              icon="https://data.dx.oregonstate.edu/sites/default/files/2019-05/heart.svg"
              text="Favorites"
              id="favorites"
              name="categories"
              clickHandler={() => {
                setSelectedCategory('favorites');
                // Clear search bar, since we are showing all results for the category
                resetQuery();
                Event('resource-category', 'favorites');
              }}
              selected={selectedCategory?.toLowerCase() === 'favorites' ? true : false}
            />
          )}
          {categories.data.map((category: Types.Category) => (
            <CustomBtn
              icon={category.icon}
              text={category.name}
              id={category.id}
              key={category.id}
              clickHandler={() => {
                setSelectedCategory(category.name);
                // Clear search bar, since we are showing all results for the category
                resetQuery();
                Event('resource-category', category.name);
              }}
              name="categories"
              selected={
                selectedCategory?.toLowerCase() === category.name.toLowerCase() ? true : false
              }
            />
          ))}{' '}
        </>
      )}
    </CategoriesWrapper>
  );
};

const CategoriesWrapper = styled.div`
  margin-bottom: ${spacing.medium};
`;

export default ResourceCategories;
