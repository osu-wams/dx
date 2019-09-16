import React from 'react';
import styled from 'styled-components';
import { theme } from '../../theme';
import { ICategory } from '../../api/resources';
import CustomBtn from '../../ui/CustomBtn';

const ResourceCategories = ({ categories, currentCategory, setSelectedCategory }) => {

  return (
    <CategoriesWrapper>
      {categories.length > 0 && (
        <>
          <CustomBtn
            icon="https://data.dx.oregonstate.edu/sites/default/files/2019-05/th.svg"
            text="All"
            id="all"
            name="categories"
            clickHandler={() => setSelectedCategory('all')}
            selected={currentCategory === 'all' ? true : false}
          />
          {categories.map((category: ICategory) => (
            <CustomBtn
              icon={category.icon}
              text={category.name}
              id={category.id}
              key={category.id}
              clickHandler={() => setSelectedCategory(category.id)}
              name="categories"
              selected={currentCategory === category.id ? true : false}
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
