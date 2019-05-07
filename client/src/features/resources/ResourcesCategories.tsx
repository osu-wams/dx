import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomRadioBtn from '../../ui/CustomRadioBtn';

// Get a list of all the categories
const getCategories = () => axios.get('/api/services/categories').then(res => res.data);

const ResourceCategories = ({ onCategorySelected, selectedCategory, setSelectedCategory }) => {
  const [categories, setCategories] = useState<any>([]);

  // Load category data on initial render
  useEffect(() => {
    getCategories()
      .then(data => {
        const defaultCategory = data[0].id;
        onCategorySelected(defaultCategory);
        setCategories(data);
      })
      .catch(console.log);
  }, [onCategorySelected]);

  return (
    <>
      {categories.length > 0 && (
        <>
          <CustomRadioBtn
            icon=""
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
              icon=""
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
