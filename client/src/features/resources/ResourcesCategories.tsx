import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import CustomRadioBtn from '../../ui/CustomRadioBtn';

// Get a list of all the categories
const getCategories = () => axios.get('/api/resources/categories').then(res => res.data);

const ResourceCategories = ({ onCategorySelected, selectedCategory, setSelectedCategory }) => {
  const isMounted = useRef(true);
  const [categories, setCategories] = useState<any>([]);

  // Load category data on initial render
  useEffect(() => {
    getCategories()
      .then(data => {
        const defaultCategory = selectedCategory === 'all' ? 'all' : selectedCategory;
        onCategorySelected(defaultCategory);
        setCategories(data);
      })
      .catch(console.log);

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <>
      {categories.length > 0 && (
        <>
          <CustomRadioBtn
            icon="http://dev-api-dx.pantheonsite.io/sites/default/files/2019-05/th.svg"
            text="All"
            id="all"
            className="testo"
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
    </>
  );
};

export default ResourceCategories;
