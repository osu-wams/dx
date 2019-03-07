import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Card, CardHeader, CardContent } from '../../ui/Card';

const Link = styled.a``;

const apiUrl = 'http://dev-api-dx.pantheonsite.io/jsonapi/taxonomy_term/categories';

const getServiceCategories = async (url = apiUrl) =>
  await axios.get(url).then(res => res.data.data);

const getServicesByCategory = async url => await axios.get(url).then(res => res.data.data);

const ServicesCategories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [categoryResults, setCategoryResults] = useState<any[]>([]);

  // Populate user courseses
  useEffect(() => {
    getServiceCategories()
      .then(setCategories)
      .catch(console.log);
  }, []);

  // useEffect(() => {
  //   getServicesByCategory()
  //     .then(setCategoryResults)
  //     .catch(console.log);
  // }, []);

  if (!categories.length) return null;

  return (
    <Card>
      <CardHeader title="Categories" />
      <CardContent>
        {categories.length ? (
          <>
            {categories.map(({ attributes: { name }, links: { self: { href } } }) => (
              <Link key={name} onClick={e => getServicesByCategory(href)}>
                {name}
              </Link>
            ))}
          </>
        ) : (
          <div>Loading...</div>
        )}
      </CardContent>

      <div>Hi {console.log(categoryResults)}</div>
    </Card>
  );
};

export default ServicesCategories;
