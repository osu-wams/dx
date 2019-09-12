import React from 'react';
import styled from 'styled-components';
import { theme } from '../../theme';
import { ICategory } from '../../api/resources';
import CustomBtn from '../../ui/CustomBtn';
import { Event } from '../../util/gaTracking';

const ResourceCategories = ({ fetchResourcesByCategory, selectedCategory, categories }) => {
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
              fetchResourcesByCategory('all');
              Event('resource-category', 'all');
            }}
            selected={selectedCategory === 'all' ? true : false}
          />
          {categories.map((category: ICategory) => (
            <CustomBtn
              icon={category.icon}
              text={category.name}
              id={category.id}
              key={category.id}
              clickHandler={() => {
                fetchResourcesByCategory(category.id);
                Event('resource-category', category.name);
              }}
              name="categories"
              selected={selectedCategory === category.id ? true : false}
            />
          ))}
        </>
      )}
    </CategoriesWrapper>
  );
};

const CategoriesWrapper = styled.div`
  margin-bottom: ${theme.spacing.unit * 2}px;
`;

export default ResourceCategories;
