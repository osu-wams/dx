import React from 'react';
import CustomRadioBtn from '../../ui/CustomRadioBtn';

const ResourceCategories = ({ fetchResourcesByCategory, selectedCategory, categories }) => {
  return (
    <>
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
            // checked={selectedCategory === 'all'}
          />
          {categories.map(category => (
            <CustomRadioBtn
              icon={category.attributes.icon}
              text={category.attributes.name}
              id={category.id}
              key={category.id}
              onChange={() => {
                fetchResourcesByCategory(category.id);
              }}
              checked={selectedCategory === category.id}
              name="categories"
            />
          ))}{' '}
          {console.log(selectedCategory)}
        </>
      )}
    </>
  );
};

export default ResourceCategories;
