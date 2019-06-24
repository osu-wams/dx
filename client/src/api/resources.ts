import axios from 'axios';

const getResources = query =>
  axios.get(`/api/resources${query ? `?query=${query}` : ''}`).then(res => res.data);

const getResourcesByCategory = categoryId =>
  axios
    .get(`/api/resources${categoryId !== 'all' ? `?category=${categoryId}` : ''}`)
    .then(res => res.data);

const getCategories = () => axios.get('/api/resources/categories').then(res => res.data);

// Category selected by default. Currently the popular category id
const defaultCategoryId = '1b9b7a4b-5a64-41af-a40a-8bb01abedd19';

export { getResources, getResourcesByCategory, getCategories, defaultCategoryId };
