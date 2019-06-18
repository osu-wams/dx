import axios from 'axios';

const getResources = query =>
  axios.get(`/api/resources${query ? `?query=${query}` : ''}`).then(res => res.data);

const getResourcesByCategory = categoryId =>
  axios
    .get(`/api/resources${categoryId !== 'all' ? `?category=${categoryId}` : ''}`)
    .then(res => res.data);

const getCategories = () => axios.get('/api/resources/categories').then(res => res.data);

export { getResources, getResourcesByCategory, getCategories };
