import React from 'react';
import styled from 'styled-components';
import { theme } from '../../theme';
import { ICategory } from '../../api/resources';
import CustomRadioBtn from '../../ui/CustomRadioBtn';

const ResourceCategories = ({ fetchResourcesByCategory, selectedCategory, categories }) => {
  return (
    <CategoriesWrapper>
      {categories.length > 0 && (
        <>
          <CustomRadioBtn
            icon="http://dev-api-dx.pantheonsite.io/sites/default/files/2019-05/th.svg"
            text="All"
            id="all"
            name="categories"
            onChange={() => {
              fetchResourcesByCategory('all');
            }}
            checked={selectedCategory === 'all'}
          />
          {categories.map((category: ICategory) => (
            <CustomRadioBtn
              icon={category.icon}
              text={category.name}
              id={category.id}
              key={category.id}
              onChange={() => {
                fetchResourcesByCategory(category.id);
              }}
              checked={selectedCategory === category.id}
              name="categories"
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
