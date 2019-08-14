import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { theme } from '../../theme';
import { getCategories } from '../../api/resources';
import CustomRadioBtn from '../../ui/CustomRadioBtn';

const ResourceCategories = ({ onCategorySelected, selectedCategory, setSelectedCategory }) => {
  const isMounted = useRef(true);
  const [categories, setCategories] = useState<any>([]);

  // Load category data on initial render
  useEffect(() => {
    getCategories()
      .then(data => {
        onCategorySelected(selectedCategory);
        setCategories(data);
      })
      .catch(console.log);

    return () => {
      isMounted.current = false;
    };
  }, []);

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
              onCategorySelected('all');
              setSelectedCategory('all');
            }}
            checked={selectedCategory === 'all'}
          />
          {categories.map(category => (
            <CustomRadioBtn
              icon={category.attributes.icon}
              text={category.attributes.name}
              id={category.id}
              key={category.id}
              onChange={() => {
                onCategorySelected(category.id);
                setSelectedCategory(category.id);
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
