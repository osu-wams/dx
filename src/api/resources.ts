import axios from 'axios';

export interface IResourceResult {
  id: string;
  title: string;
  icon?: string;
  uri: string;
}

const getResources = (query: string): Promise<[IResourceResult]> =>
  axios.get(`/api/resources${query ? `?query=${query}` : ''}`).then(res => res.data);

const getResourcesByCategory = (categoryId: string): Promise<[IResourceResult]> =>
  axios
    .get(`/api/resources${categoryId !== 'all' ? `?category=${categoryId}` : ''}`)
    .then(res => res.data);

const getCategories = () => axios.get('/api/resources/categories').then(res => res.data);

// Category selected by default. Currently the 'popular' category id
const defaultCategoryId = '1b9b7a4b-5a64-41af-a40a-8bb01abedd19';

export { getResources, getResourcesByCategory, getCategories, defaultCategoryId };
