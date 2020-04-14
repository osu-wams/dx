import React from 'react';
import styled from 'styled-components/macro';
import { themeSettings } from 'src/theme';
import CustomBtn from 'src/ui/CustomBtn';
import { Event } from 'src/util/gaTracking';
import { Types } from '@osu-wams/lib';

/**
 * Displays a list of clickable categories for the Resources page
 * Favorites category button is only rendered if the user has any favorite resources
 */
const ResourceCategories = ({
  categories,
  setQuery,
  selectedCategory,
  setSelectedCategory,
  hasFavorite,
}) => {
  return (
    <CategoriesWrapper>
      {categories.length > 0 && (
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
                Event('resource-category', 'favorites');
              }}
              selected={selectedCategory?.toLowerCase() === 'favorites' ? true : false}
            />
          )}
          {categories.map((category: Types.Category) => (
            <CustomBtn
              icon={category.icon}
              text={category.name}
              id={category.id}
              key={category.id}
              clickHandler={() => {
                setSelectedCategory(category.name);
                // Clear search bar, since we are showing all results for the category
                setQuery('');
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
  margin-bottom: ${themeSettings.spacing.unit}px;
`;

export default ResourceCategories;
