import React from 'react';
import { themeSettings, styled } from '../../theme';
import { ICategory } from '../../api/resources';
import CustomBtn from '../../ui/CustomBtn';
import { Event } from '../../util/gaTracking';

const ResourceCategories = ({ categories, setQuery, selectedCategory, setSelectedCategory }) => {
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
          {categories.map((category: ICategory) => (
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
